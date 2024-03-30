import * as bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { User, UserProfile } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../../config";
import { jswHelpers } from "../../../helpers/jwtHelpers";

const createUser = async (payload: User, payloads: UserProfile) => {
  console.log(payloads);
  const isUserExits = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExits) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This user is alrady registered"
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };


  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

   await prisma.userProfile.create({
     data: { userId: result.id, bio: payloads.bio, age: payloads.age },
   });

  return result;
};


const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorect Password!");
  }

  const accessToken = jswHelpers.genarateToken(
    {
      email: userData.email,
    },

    config.jwt.jwt_secret as Secret,
    config.jwt.expire_in as string
  );

  const refreshToken = jswHelpers.genarateToken(
    {
      email: userData.email,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_token_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userServices = {
  createUser,
  loginUser,
};

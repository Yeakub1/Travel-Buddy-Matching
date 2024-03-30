import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import SendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.services";

const createUser = catchAsync( async (req: Request, res: Response, payloads: any) => {
  const result = await userServices.createUser(req.body, payloads);
  console.log(payloads);
    SendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Created Successfully!",
      data: result,
    });
  }
);

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.loginUser(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfuly!",
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const userController = {
  createUser,
  loginUser
};
import { z } from "zod";

const createUser = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
  }),
});
const userLoginValidation = z.object({
  body: z.object({
    email: z.string().email({ message: "Email must be a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export const userValidation = {
  createUser,
  userLoginValidation,
};

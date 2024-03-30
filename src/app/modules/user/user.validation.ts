import { z } from "zod";

const createUser = z.object({
  body: z.object({
    password: z.string({ required_error: "Password is required" }),
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
  }),
});

export const userValidation = {
  createUser,
};

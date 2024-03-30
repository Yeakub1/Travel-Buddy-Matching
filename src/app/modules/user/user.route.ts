import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUser),
  userController.createUser
);

router.post(
  "/login",
  validateRequest(userValidation.userLoginValidation),
  userController.loginUser
);

export const userRoutes = router;

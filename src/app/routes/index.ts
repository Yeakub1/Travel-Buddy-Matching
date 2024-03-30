import express from "express";
import { userRoutes } from "../modules/user/user.route";

const router = express.Router();

const modiulsRouts = [
  {
    path: "/",
    route: userRoutes,
  },
];

modiulsRouts.forEach((route) => router.use(route.path, route.route));

export default router;

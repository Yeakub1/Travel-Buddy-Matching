// import express, { Application, Request, Response } from "express";
// import cors from "cors";

// const app: Application = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//   res.send({
//     Message: "Travel buddy server...",
//   });
// });


// export default app;


import cors from "cors";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandlear from "./app/middlewares/globalErrorHandlear";

const app: Application = express();
app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Travel buddy server...",
  });
});

app.use("/api", router);

app.use(globalErrorHandlear);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
    error: {
      path: req.originalUrl,
      message: "Your Request Path Not Found",
    },
  });
});
export default app;

import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";
import { AppDataSource } from "@shared/infra/typeorm";
import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

import "@shared/container";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch(err => {
    console.log("Error when connecting to database. See details below.");
    console.log(err);
  });

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };

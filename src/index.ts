import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import "source-map-support/register";
import morgan from "morgan";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);

    app.use(
      (
        error: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(400).json({ message: error.message });
      }
    );
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081",
    };

    app.use(morgan("dev"));
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}

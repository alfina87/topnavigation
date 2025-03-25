import express, { Express } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./configs/configs.env";
import logger from "./utils/logger";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import multer from "multer";

class App {
  private readonly app: Express;
  private readonly port: number;

  public constructor(port: number) {
    this.app = express();
    this.port = port;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private connectToDatabase(): void {}

  private initializeMiddlewares(): void {
    this.app.use(helmet());

    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      })
    );

    this.app.use(cookieParser());

    const apiLimiter = rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 100,
    });
    this.app.use(apiLimiter);

    const upload = multer({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB limit
      },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.startsWith("image/") ||
          file.mimetype === "application/pdf"
        ) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type. Only images and PDFs are allowed."));
        }
      },
    });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    // Apply the multer middleware for handling file uploads
    this.app.use(upload.array("files"));
  }

  private initializeRoutes(): void {
    this.app.use("/api", router);
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port ${this.port}`);
    });
  }
}

const server = new App(Number(config.PORT));
server.listen();

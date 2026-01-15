import express, { Express } from "express";
import path from "path";
import {
  staticFilesFolderName,
} from "../../config";
import { initIndexRoute } from "./routes";

const initRoutes = (app: Express) => {
  const staticFilesPath = `/${staticFilesFolderName}`;

  app.use(
    staticFilesPath,
    express.static(path.join(__dirname, staticFilesPath))
  );

  initIndexRoute(app)
};

const startServer = () => {
  const port = 8080;
  const app = express();

  initRoutes(app);

  return app.listen(port, () => {
    console.log(`On port ${port}`);
  });
};

startServer();

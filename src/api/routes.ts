import { Express } from "express";
import healthCheckHandler from "../middleware/healthcheck";

const routes = (app: Express) => {
  app.get("/", healthCheckHandler);
};

export default routes;

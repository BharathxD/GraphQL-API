import { Request, Response } from "express";

const healthCheckHandler = (_: Request, res: Response) => {
  try {
    //? Simple check to ensure the app is running and healthy
    res.status(200).send({ status: "ok" });
  } catch (error) {
    console.error(`Health check failed: ${error}`);
    res.status(500).send({ status: "error" });
  }
};

export default healthCheckHandler;

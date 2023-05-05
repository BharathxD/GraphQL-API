import { Express, Request, Response, NextFunction } from "express";

const routes = (app: Express) => {
    app.get("/", (_: Request, res: Response, next: NextFunction) => {
        res.status(200).send({ message: "Server is up and running" });
        next();
    });
}

export default routes;
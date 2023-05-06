import { Request, Response } from "express";
import { User } from "../schema/user.schema";

interface Context {
    request: Request,
    response: Response,
    user: User
}

export default Context;
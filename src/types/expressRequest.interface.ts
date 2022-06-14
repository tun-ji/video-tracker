import { User } from "@app/user/entities/user.entity";
import { Request } from "express";

export interface ExpressRequest extends Request {
    user?: User
}
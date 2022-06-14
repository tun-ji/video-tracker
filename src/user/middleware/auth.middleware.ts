import { ExpressRequest } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@app/config";
import { UsersService } from "../users.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) {}

    async use(req: ExpressRequest, _res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }

        var token = req.headers.authorization.split(" ")[1]

        try {
            const decode = verify(token, JWT_SECRET)
            const nUser = await this.userService.findById(decode.id)
            req.user = nUser
            next()
        } catch(err) {
            req.user = null
            next()
        }
    }
}
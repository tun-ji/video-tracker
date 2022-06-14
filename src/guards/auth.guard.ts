import { ExpressRequest } from "@app/types/expressRequest.interface";
import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequest>()

        if (request.user) {
            return true
        }

        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }
}
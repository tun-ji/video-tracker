import { User } from "../entities/user.entity";
import { UserType } from "./User.types";

export interface userResponseInterface {
    user: UserType & {token: string}
}
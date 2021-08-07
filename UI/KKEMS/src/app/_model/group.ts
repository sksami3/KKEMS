import { User } from ".";
import { BaseModel } from "./baseModel";

export class Group extends BaseModel
{
    NAME: string;
    USERID: number;
    KithOrKins: Array<User>;
}
import { User } from ".";
import { BaseModel } from "./baseModel";

export class Group extends BaseModel
{
    name: string;
    userId: number;
    kithOrKins: Array<User> = [];
}
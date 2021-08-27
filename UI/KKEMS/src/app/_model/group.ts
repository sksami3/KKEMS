import { User } from ".";
import { BaseModel } from "./baseModel";

export class Group extends BaseModel
{
    id: number;
    name: string;
    userId: number;
    kithOrKins: Array<User> = [];
}
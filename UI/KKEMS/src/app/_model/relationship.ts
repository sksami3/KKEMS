import { Group } from "./group";
import { User } from "./user";

export class Relationship
{
    id: number;
    name: string;
    groupId: number;
    kithOrKins: Array<User> = [];
}
import { Role } from ".";

export class User
{
    username: string;
    name: string;
    EMAIL: string;
    PASSWORDHASH: string;
    role: Role;
    token: string;
    id: number;
    PhoneNumber: string;
    isUsedForKinOrKith: boolean;
}
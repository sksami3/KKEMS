import { Role } from ".";

export class User
{
    USERNAME: string;
    EMAIL: string;
    PASSWORDHASH: string;
    role: Role;
    token: string;
    ID: number;
    PhoneNumber: string;
    isUsedForKinOrKith: boolean;
}
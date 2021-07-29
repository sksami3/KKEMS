import { Role } from ".";

export class User
{
    USERNAME: string;
    EMAIL: string;
    PASSWORDHASH: string;
    role: Role;
    TOKEN?: string;
    ID: number;
    PhoneNumber: string;
}
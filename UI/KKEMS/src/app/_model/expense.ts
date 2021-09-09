export class Expense
{
    id: number;
    reason: string;
    userId: number;
    kithOrKinId?: number;
    groupId?: number;
    expenseDate: Date;
    cost: number;
    kkOrGroupName: string;
}
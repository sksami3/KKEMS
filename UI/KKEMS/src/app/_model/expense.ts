export class Expense
{
    id: number;
    reason: string;
    userId: number;
    kinorkithId?: number;
    groupId?: number;
    expenseDate: Date;
    cost: number;
}
using KKEMS.Core.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Services
{
    public interface IExpenseService
    {
        Task Add(Expense expense);
        Task<IEnumerable<Expense>> GetExpenses();
        Task Update(Expense expense);
        Task Remove(int expenseId);
        Task<Expense> GetExpenseById(int guid);
    }
}

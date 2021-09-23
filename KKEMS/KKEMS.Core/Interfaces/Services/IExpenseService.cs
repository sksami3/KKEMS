using KKEMS.Core.Entity;
using KKEMS.Core.ViewModel;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Services
{
    public interface IExpenseService
    {
        Task Add(Expense expense);
        Task<IEnumerable<Expense>> GetExpenses(int userId);
        Task Update(Expense expense);
        Task Remove(int expenseId);
        Task<Expense> GetExpenseById(int guid);
        Task<IEnumerable<StatisticsVM>> GetGroupExpenses(int userId);
        Task<IEnumerable<StatisticsVM>> GetKithOrKinExpenses(int userId);
        Task<IEnumerable<StatisticsVM>> GetMonthlyExpenseStatistics(int userId);
    }
}

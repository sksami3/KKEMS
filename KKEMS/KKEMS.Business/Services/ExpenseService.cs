using KKEMS.Core.Interfaces.Services;
using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace KKEMS.Business.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseService(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task Add(Expense expense)
        {
            await _expenseRepository.AddAsync(expense);
            await _expenseRepository.SaveChangesAsync();
        }

        public async Task<Expense> GetExpenseById(int Id)
        {
            var exp = await _expenseRepository.FindAsync(Id);
            //TODO remove this after adding ViewModel
            exp.KKOrGroupName = exp.KKOrGroupName = exp.KithOrKin == null ? exp.Group.Name +" (Group)" : exp.KithOrKin.name;

            return exp;
        }

        public async Task<IEnumerable<Expense>> GetExpenses(int userId)
        {
            var expList = await _expenseRepository.All().Where(x => x.UserId == userId).ToListAsync();
            //TODO change after adding View Model
            expList.ForEach(x => x.KKOrGroupName = x.KithOrKin == null ? x.Group.Name + " (Group)" : x.KithOrKin.name);

            return expList.OrderByDescending(x => x.ExpenseDate);
        }

        public async Task Remove(int expenseId)
        {
            await _expenseRepository.Remove(expenseId);
        }

        public async Task Update(Expense expense)
        {
            await _expenseRepository.UpdateExpense(expense);
            await _expenseRepository.SaveChangesAsync();
        }
    }
}

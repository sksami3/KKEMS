using KKEMS.Core.Interfaces.Services;
using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<Expense> GetExpenseById(int guid)
        {
            return await _expenseRepository.FindAsync(guid);
        }

        public async Task<IEnumerable<Expense>> GetExpenses()
        {
            return await _expenseRepository.All().ToListAsync();
        }

        public async Task Remove(int expenseId)
        {
            await _expenseRepository.Remove(expenseId);
        }

        public async Task Update(Expense expense)
        {
            //await _expenseRepository.Update(expense);
        }
    }
}

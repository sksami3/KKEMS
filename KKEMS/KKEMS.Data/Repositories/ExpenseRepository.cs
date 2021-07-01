using KKEMS.Business.Repositories.Base;
using KKEMS.Core.Entity;
using KKEMS.Core.Exception;
using KKEMS.Core.Interfaces.Repositories;
using KKEMS.Data.DbContext;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Data.Repositories
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
        private KKEMSDbContext _context;
        public ExpenseRepository(KKEMSDbContext context)
            : base(context)
        {
            _context = context;
        }

        public async Task Remove(int expenseId)
        {
            var expense = await Expense(expenseId);

            Delete(expense);
            await SaveChangesAsync();
        }

        //public async Task RemoveExpense(int expenseId)
        //{
        //    var expense = await Expense(expenseId);

        //    Delete(expense);
        //    await SaveChangesAsync();
        //}

        public async Task UpdateExpense(Expense model)
        {
            var expense = await Expense(model.Id);

            expense.User = model.User;
            expense.Reason = model.Reason;
            expense.KithOrKinId = model.KithOrKinId;
            expense.GroupId = model.GroupId;
            expense.Cost = model.Cost;
            expense.Reason = model.Reason;

            Update(expense);
            await SaveChangesAsync();
        }
        private async Task<Expense> Expense(int expenseId)
        {
            var expense = await FindAsync(expenseId);

            if (expense == null)
                throw new GenericException(Exceptions.ExpenseNotFound);
            return expense;
        }
    }
}

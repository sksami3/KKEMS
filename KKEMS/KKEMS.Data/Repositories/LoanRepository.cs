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
    public class LoanRepository : BaseRepository<Loan>, ILoanRepository
    {
        private KKEMSDbContext _context;
        public LoanRepository(KKEMSDbContext context)
            : base(context)
        {
            _context = context;
        }
        public async Task UpdateLoan(Loan model)
        {
            var loan = await Loan(model.Id);

            loan.Reason = model.Reason;
            loan.KithOrKin = model.KithOrKin;
            loan.IsPaidOrTaken = model.IsPaidOrTaken;
            loan.User = model.User;
            loan.Amount = model.Amount;

            Update(loan);
            await SaveChangesAsync();
        }

        public async Task Remove(int loanId)
        {
            var loan = await Loan(loanId);

            Delete(loan);
            await SaveChangesAsync();
        }
        private async Task<Loan> Loan(int loanId)
        {
            var loan = await FindAsync(loanId);
            if (loan == null)
                throw new GenericException(Exceptions.LoanNotFound);
            return loan;
        }
    }
}

using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories.Base;
using System;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Repositories
{
    public interface ILoanRepository : IBaseRepository<Loan>
    {
        Task UpdateLoan(Loan model);
        //Task RemoveProduct(int productId);
        Task Remove(int loanId);
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KKEMS.Core.Entity;

namespace KKEMS.Core.Interfaces.Services
{
    public interface ILoanService
    {
        Task<IEnumerable<Loan>> GetLoans();
        Task Add(Loan model);
        Task Update(Loan model);
        Task Remove(int id);
        Task<Loan> GetById(int id);
    }
}

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
    public class LoanService : ILoanService
    {
        private readonly ILoanRepository _loanRepository;

        public LoanService(ILoanRepository loanRepository)
        {
            _loanRepository = loanRepository;
        }

        public async Task Add(Loan loan)
        {
            await _loanRepository.AddAsync(loan);
            await _loanRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Loan>> GetLoans()
        {
            return await _loanRepository.All().ToListAsync();
        }

        public async Task<Loan> GetById(int id)
        {
            return await _loanRepository.FindAsync(id);
        }

        public async Task Remove(int loanId)
        {
            await _loanRepository.Remove(loanId);
        }

        public async Task Update(Loan loan)
        {
            await _loanRepository.UpdateLoan(loan);
        }
    }
}

using Inventory.Core.Entity;
using Inventory.Core.Interfaces.Repositories;
using Inventory.Core.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Business.Services
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public PaymentMethodService(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }
        public async Task Add(PaymentMethod paymentMethod)
        {
            await _paymentMethodRepository.AddAsync(paymentMethod);
            await _paymentMethodRepository.SaveChangesAsync();
        }

        public async Task<PaymentMethod> GetPaymentMethodById(int id)
        {
            return await _paymentMethodRepository.FindAsync(id);
        }

        public async Task<IEnumerable<PaymentMethod>> GetPaymentMethods()
        {
            return await _paymentMethodRepository.All().ToListAsync();
        }

        public async Task Remove(int paymentMethodId)
        {
            await _paymentMethodRepository.Remove(paymentMethodId);
        }

        public async Task Update(PaymentMethod paymentMethod)
        {
            await _paymentMethodRepository.UpdatePaymentMethod(paymentMethod);
        }
    }
}

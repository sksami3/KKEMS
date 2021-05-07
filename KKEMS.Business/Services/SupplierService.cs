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
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }
        public async Task Add(Supplier supplier)
        {
            await _supplierRepository.AddAsync(supplier);
            await _supplierRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _supplierRepository.All().ToListAsync();
        }

        public async Task<Supplier> GetSupplierById(int id)
        {
            return await _supplierRepository.FindAsync(id);
        }
        public async Task Remove(int supplierId)
        {
            await _supplierRepository.Remove(supplierId);
        }

        public async Task Update(Supplier supplier)
        {
            await _supplierRepository.UpdateSupplier(supplier);
        }
    }
}

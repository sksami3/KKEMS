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
    public class SaleItemService : ISaleItemService
    {
        private readonly ISaleItemRepository _saleItemRepository;

        public SaleItemService(ISaleItemRepository saleItemRepository)
        {
            _saleItemRepository = saleItemRepository;
        }

        public async Task Add(SalesItemsModel salesItems)
        {
            await _saleItemRepository.AddAsync(salesItems);
            await _saleItemRepository.SaveChangesAsync();
        }

        public async Task<IEnumerable<SalesItemsModel>> GetSalesItems()
        {
            return await _saleItemRepository.All().ToListAsync();
        }

        public async Task<SalesItemsModel> GetSalesItemById(int id)
        {
            return await _saleItemRepository.FindAsync(id);
        }

        public async Task Remove(int salesItemsId)
        {
            await _saleItemRepository.Remove(salesItemsId);
        }

        public async Task Update(SalesItemsModel salesItems)
        {
            await _saleItemRepository.UpdateSaleItem(salesItems);
        }
    }
}

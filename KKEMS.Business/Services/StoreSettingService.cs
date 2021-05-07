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
    public class StoreSettingService : IStoreSettingService
    {
        private readonly IStoreSettingRepository _storeSettingRepository;

        public StoreSettingService(IStoreSettingRepository storeSettingRepository)
        {
            _storeSettingRepository = storeSettingRepository;
        }

        public async Task Add(StoreSettingModel storeSetting)
        {
            await _storeSettingRepository.AddAsync(storeSetting);
            await _storeSettingRepository.SaveChangesAsync();
        }

        public async Task<StoreSettingModel> GetById(int id)
        {
            return await _storeSettingRepository.FindAsync(id);
        }

        public async Task<IEnumerable<StoreSettingModel>> GetCompanies()
        {
            return await _storeSettingRepository.All().ToListAsync();
        }

        public async Task Remove(int storeSettingId)
        {
            await _storeSettingRepository.Remove(storeSettingId);
        }

        public async Task Update(StoreSettingModel model)
        {
            await _storeSettingRepository.UpdateCompany(model);
        }
    }
}

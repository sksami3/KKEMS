using Inventory.Business.Repositories.Base;
using Inventory.Core.Entity;
using Inventory.Core.Exception;
using Inventory.Core.Interfaces.Repositories;
using Inventory.Data.InventoryContext;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Repositories
{
    public class StoreSettingRepository : BaseRepository<StoreSettingModel>, IStoreSettingRepository
    {
        private InventoryDbContext _context;
        public StoreSettingRepository(InventoryDbContext context)
            : base(context)
        {
            _context = context;
        }

        public async Task Remove(int storeSettingId)
        {
            var storeSetting = await StoreSettingModel(storeSettingId);

            Delete(storeSetting);
            await SaveChangesAsync();
        }

        public async Task UpdateCompany(StoreSettingModel model)
        {
            var storeSettingModel = await StoreSettingModel(model.Id);

            storeSettingModel.Address = model.Address;
            storeSettingModel.Currency = model.Currency;
            storeSettingModel.Email = model.Email;
            storeSettingModel.Logo = model.Logo;
            storeSettingModel.Phone = model.Phone;
            storeSettingModel.StoreName = model.StoreName;
            storeSettingModel.Web = model.Web;
            Update(storeSettingModel);
            await SaveChangesAsync();
        }
        private async Task<StoreSettingModel> StoreSettingModel(int storeId)
        {
            var storeSettingModel = await FindAsync(storeId);
            if (storeSettingModel == null)
                throw new GenericException(Exceptions.StoreSettingNotFound);
            return storeSettingModel;
        }
    }
}

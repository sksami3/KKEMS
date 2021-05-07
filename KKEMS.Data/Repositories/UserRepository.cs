using Inventory.Business.Repositories.Base;
using Inventory.Core.Entity;
using Inventory.Core.Exception;
using Inventory.Core.Interfaces.Repositories;
using Inventory.Data.InventoryContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private InventoryDbContext _context;
        private DbSet<User> entities;
        public UserRepository(InventoryDbContext context)
            : base()
        {
            _context = context;
        }

        public void Add(User entity)
        {
            _context.Add(entity);
        }

        public async Task AddAsync(User entity)
        {
            await _context.AddAsync(entity);
        }

        public IQueryable<User> All()
        {
            return entities;
        }

        public void Delete(User model)
        {
            if (model == null)
            {
                throw new ArgumentNullException("model");
            }

            entities.Remove(model);
        }

        public User Find(int id)
        {
            return All().FirstOrDefault(x => x.Id == id);
        }

        public async Task<User> FindAsync(int id)
        {
            return await entities.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await entities.ToListAsync();
        }

        public async Task Remove(int modelId)
        {
            var user = await User(modelId);

            Delete(user);
            await SaveChangesAsync();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(User entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _context.Update(entity);
        }
        private async Task<User> User(int userId)
        {
            var user = await FindAsync(userId);
            if (user == null)
                throw new GenericException(Exceptions.UserNotFound);
            return user;
        }
    }
}

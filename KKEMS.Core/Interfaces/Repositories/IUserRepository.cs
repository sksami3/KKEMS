using KKEMS.Core.Entity.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAll();
        IQueryable<User> All();
        User Find(int id);
        Task<User> FindAsync(int id);

        void Add(User entity);
        Task AddAsync(User entity);

        void Delete(User model);
        void Update(User entity);
        void SaveChanges();
        Task SaveChangesAsync();
        Task Remove(int modelId);
    }
}

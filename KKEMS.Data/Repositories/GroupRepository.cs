using KKEMS.Business.Repositories.Base;
using KKEMS.Core.Entity;
using KKEMS.Core.Exception;
using KKEMS.Core.Interfaces.Repositories;
using KKEMS.Data.DbContext;
using System;
using System.Threading.Tasks;


namespace Inventory.Data.Repositories
{
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        private KKEMSDbContext _context;
        public GroupRepository(KKEMSDbContext context)
            : base(context)
        {
            _context = context;
        }

        public async Task Insert(Group model)
        {
            await Insert(model);
            await SaveChangesAsync();
        }

        public async Task UpdateGroup(Group model)
        {
            var group = await Group(model.Id);

            group.Name = model.Name;
            group.KithOrKins = model.KithOrKins;
            group.User = model.User;
            
            Update(group);
            await SaveChangesAsync();
        }

        public async Task Remove(int groupId)
        {
            var group = await Group(groupId);

            Delete(group);
            await SaveChangesAsync();
        }

        private async Task<Group> Group(int groupId)
        {
            var group = await FindAsync(groupId);
            if (group == null)
                throw new GenericException(Exceptions.GroupNotFound);
            return group;
        }
    }
}

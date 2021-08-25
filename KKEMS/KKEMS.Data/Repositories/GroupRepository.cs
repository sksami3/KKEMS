using KKEMS.Business.Repositories.Base;
using KKEMS.Core.Entity;
using KKEMS.Core.Entity.Auth;
using KKEMS.Core.Exception;
using KKEMS.Core.Interfaces.Repositories;
using KKEMS.Data.DbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace KKEMS.Data.Repositories
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
            group.KithOrKins.Clear();
            group.KithOrKins = await GetKithOrKinList(model.KithOrKins.Select(x => x.Id).ToList());
            //group.User = model.User;
            
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

        private async Task<List<User>> GetKithOrKinList(List<int> kkIds)
        {
            List<User> kks = new List<User>();

            foreach(int kkId in kkIds)
            {
                var kk = await _context.Users.FindAsync(kkId);
                kks.Add(kk);
            }

            return kks;
        }
    }
}

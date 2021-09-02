using KKEMS.Business.Repositories.Base;
using KKEMS.Core.Entity;
using KKEMS.Core.Entity.Auth;
using KKEMS.Core.Exception;
using KKEMS.Core.Interfaces.Repositories;
using KKEMS.Data.DbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Data.Repositories
{
    public class RelationshipRepository : BaseRepository<Relationship>, IRelationshipRepository
    {
        private KKEMSDbContext _context;
        public RelationshipRepository(KKEMSDbContext context)
            : base(context)
        {
            _context = context;
        }
        public async Task UpdateRelationship(Relationship model)
        {
            var relationship = await Relationship(model.Id);

            relationship.Name = model.Name;
            relationship.KithOrKins.Clear();
            relationship.KithOrKins = await GetKithOrKinList(model.KithOrKins.Select(x => x.Id).ToList());
            //relationship.User = model.User;

            Update(relationship);
            await SaveChangesAsync();
        }
        public async Task Remove(int relationshipId)
        {
            var relationship = await Relationship(relationshipId);

            Delete(relationship);
            await SaveChangesAsync();
        }
        private async Task<Relationship> Relationship(int relationshipId)
        {
            var relationship = await FindAsync(relationshipId);
            if (relationship == null)
                throw new GenericException(Exceptions.RelationshipNotFound);
            return relationship;
        }

        private async Task<List<User>> GetKithOrKinList(List<int> kkIds)
        {
            List<User> kks = new List<User>();

            foreach (int kkId in kkIds)
            {
                var kk = await _context.Users.FindAsync(kkId);
                kks.Add(kk);
            }

            return kks;
        }
    }
}

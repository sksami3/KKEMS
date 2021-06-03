using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Repositories
{
    public interface IRelationshipRepository : IBaseRepository<Relationship>
    {
        Task Remove(int RelationshipId);
        Task UpdateRelationship(Relationship model);
    }
}

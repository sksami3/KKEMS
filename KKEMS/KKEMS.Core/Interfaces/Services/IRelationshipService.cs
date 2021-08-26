using KKEMS.Core.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Services
{
    public interface IRelationshipService
    {
        Task Add(Relationship relationship);
        Task<IEnumerable<Relationship>> GetRelationships(int userId);
        Task Update(Relationship relationship);
        Task Remove(int relationshipId);
        Task<Relationship> GetRelationshipById(int id);
    }
}

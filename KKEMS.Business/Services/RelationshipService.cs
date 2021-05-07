using KKEMS.Core.Interfaces.Services;
using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Business.Services
{
    public class RelationshipService : IRelationshipService
    {
        private readonly IRelationshipRepository _relationshipRepository;

        public RelationshipService(IRelationshipRepository relationshipRepository)
        {
            _relationshipRepository = relationshipRepository;
        }
        public async Task Add(Relationship relationship)
        {
            await _relationshipRepository.AddAsync(relationship);
            await _relationshipRepository.SaveChangesAsync();
        }

        public async Task<Relationship> GetRelationshipById(int id)
        {
            return await _relationshipRepository.FindAsync(id);
        }

        public async Task<IEnumerable<Relationship>> GetRelationships()
        {
            return await _relationshipRepository.All().ToListAsync();
        }

        public async Task Remove(int relationshipId)
        {
            await _relationshipRepository.Remove(relationshipId);
        }

        public async Task Update(Relationship relationship)
        {
            await _relationshipRepository.UpdateRelationship(relationship);
        }
    }
}

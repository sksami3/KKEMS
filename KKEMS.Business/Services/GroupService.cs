using KKEMS.Core.Interfaces.Services;
using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KKEMS.Business.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;

        public GroupService(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        public async Task Add(Group group)
        {
            await _groupRepository.AddAsync(group);
            await _groupRepository.SaveChangesAsync();
        }

        public async Task<Group> GetGroupById(int id)
        {
            return await _groupRepository.FindAsync(id);
        }

        public async Task<IEnumerable<Group>> GetGroups()
        {
            return await _groupRepository.All().ToListAsync();
        }

        public async Task Remove(int groupId)
        {
            await _groupRepository.Remove(groupId);
        }

        public async Task Update(Group group)
        {
            await _groupRepository.UpdateGroup(group);
        }
    }
}
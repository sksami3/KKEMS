using KKEMS.Core.Interfaces.Services;
using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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
            Group group = await _groupRepository.FindAsync(id);
            return group;
        }

        public async Task<IEnumerable<Group>> GetGroups(int userId)
        {
            var groups = await _groupRepository.All().Where(x => x.UserId == userId).ToListAsync();
            return groups;
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
using KKEMS.Core.Entity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Services
{
    public interface IGroupService
    {
        Task Add(Group group);
        Task<IEnumerable<Group>> GetGroups(int userId);
        Task Update(Group group);
        Task Remove(int groupId);
        Task<Group> GetGroupById(int id);
    }
}

using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Inventory.Core.Interfaces.Services
{
    public interface IGroupService
    {
        Task Add(Group group);
        Task<IEnumerable<Group>> GetGroups();
        Task Update(Group group);
        Task Remove(int groupId);
        Task<Group> GetGroupById(int id);
    }
}

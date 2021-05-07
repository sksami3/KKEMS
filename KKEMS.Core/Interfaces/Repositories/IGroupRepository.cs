using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Repositories.Base;
using System;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Repositories
{
    public interface IGroupRepository : IBaseRepository<Group>
    {
        Task UpdateGroup(Group model);
        Task Remove(int groupId);
    }
}

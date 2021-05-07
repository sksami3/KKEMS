using System;
using System.Threading.Tasks;

namespace Inventory.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task Active(int id);
        Task DeActive(int id);
        Task Remove(int modelId);
    }
}

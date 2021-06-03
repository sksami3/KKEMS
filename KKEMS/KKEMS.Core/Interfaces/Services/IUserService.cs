using System;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task Active(int id);
        Task DeActive(int id);
        Task Remove(int modelId);
    }
}

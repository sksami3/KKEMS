using Inventory.Core.Exception;
using Inventory.Core.Interfaces.Repositories;
using Inventory.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Active(int id)
        {
            var user = await _userRepository.FindAsync(id);

            user.IsActive = true;
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();
        }

        public async Task DeActive(int id)
        {
            var user = await _userRepository.FindAsync(id);

            user.IsActive = false;
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();
        }

        public async Task Remove(int modelId)
        {
            await _userRepository.Remove(modelId);
            await _userRepository.SaveChangesAsync();
        }
    }
}

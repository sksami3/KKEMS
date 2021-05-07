using Inventory.Core.Interfaces.Repositories;
using Inventory.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inventory.Business.Services
{
    public class PermissionService : IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;

        public PermissionService(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }
    }
}

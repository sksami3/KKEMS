using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace KKEMS.Core.Interfaces.Auth
{
    public interface ICurrentLoginUser
    {
        int AccountId { get; }
        void SetClaims(IEnumerable<Claim> claims);
    }
}

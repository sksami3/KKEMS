﻿using IdentityModel;
using KKEMS.Core.Entity.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

public sealed class ClaimsPrincipalFactory : UserClaimsPrincipalFactory<User, Role>
{
    public ClaimsPrincipalFactory(UserManager<User> userManager, RoleManager<Role> roleManager, IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, roleManager, optionsAccessor)
    {

    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
    {
        #region Basic (sets cookies)
        try
        {
            var identity = await base.GenerateClaimsAsync(user).ConfigureAwait(false);

            if (!identity.HasClaim(x => x.Type == JwtClaimTypes.Subject))
            {
                var sub = user.UserName;
                var email = user.Email;

                identity.AddClaim(new Claim(JwtClaimTypes.Subject, sub));
                identity.AddClaim(new Claim(JwtClaimTypes.Email, email));
            }

            return identity;
        }
        catch (Exception)
        {
            return null;
        }
        #endregion

    }
}
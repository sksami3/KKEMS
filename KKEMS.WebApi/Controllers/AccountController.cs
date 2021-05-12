﻿using KKEMS.Core.Entity.Auth;
using KKEMS.WebApi.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KKEMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        public UserManager<User> UserManager { get; }
        public SignInManager<User> SignInManager { get; }
        private readonly ILogger<AccountController> _logger;

        public AccountController(UserManager<User> userManager,
            SignInManager<User> signInManager,
            ILogger<AccountController> logger)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            _logger = logger;
        }
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = UserManager.Users;
            return Ok(await users.ToListAsync());
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register(User registerVM)
        {
            if (registerVM != null)
            {
                var result = await UserManager.CreateAsync(registerVM, registerVM.PasswordHash);
                #region Mail Confirmation
                //if (result.Succeeded)
                //{
                //    var token = await UserManager.GenerateEmailConfirmationTokenAsync(user);
                //    _logger.Log(LogLevel.Warning, token);
                //    bool isSent = EmailSender.SendEmail(user, token);

                //    //await SignInManager.SignInAsync(user, isPersistent: false);
                //    return isSent;
                //}
                //else
                //    //result.Errors;
                //    return false;
                #endregion
                return Ok(result);
            }
            return StatusCode(404);
        }
        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrEmpty(userId) && string.IsNullOrEmpty(token))
            {
                var result = await UserManager.ConfirmEmailAsync(await UserManager.FindByIdAsync(userId), token);
                if (result.Succeeded)
                    return StatusCode(200);
                else
                    StatusCode(500);
            }
            return StatusCode(404);
        }
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate(User userVM)
        {
            if (userVM != null)
            {
                #region with token generation
                var result = await SignInManager.PasswordSignInAsync(userVM.UserName, userVM.PasswordHash, true, false);
                if (result.Succeeded)
                {
                    var user = await UserManager.FindByNameAsync(userVM.UserName);
                    var roles = await UserManager.GetRolesAsync(user);
                    var claims = await UserManager.GetClaimsAsync(user);
                    string token = JwtTokenGeneration.GenerateToken(user, roles, claims).token;

                    return Ok(token);
                }
                #endregion
                else
                    return Content("User not found");
            }
            else
                return StatusCode(404);
        }
    }
}

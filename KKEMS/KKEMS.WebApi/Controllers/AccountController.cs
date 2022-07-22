using KKEMS.Core.Entity.Auth;
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
using System.Security.Claims;
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
                if (registerVM.isUsedForKinOrKith)
                    registerVM.CreatedByUserId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

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

                if (result.Succeeded)
                    return Ok(result);
                else
                    return BadRequest("Error!! Unable to register."); ;
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
                var result = SignInManager.PasswordSignInAsync(userVM.UserName, userVM.PasswordHash, true, false).Result;
                if (result.Succeeded)
                {
                    var user = await UserManager.FindByNameAsync(userVM.UserName);
                    var roles = await UserManager.GetRolesAsync(user);
                    var claims = await UserManager.GetClaimsAsync(user);
                    string token = JwtTokenGeneration.GenerateToken(user, roles, claims).token;
                    user.token = token;

                    return Ok(user);
                }
                #endregion
                else
                    return BadRequest("User not found");
            }
            else
                return StatusCode(404);
        }
        [HttpGet("GetAllKinOrKithByCreatedUserId/{id}")]
        public async Task<IActionResult> GetAllKinOrKithByCreatedUserId(int id)
        {
            var kinOrKiths = await UserManager.Users.Where(x => x.CreatedByUserId != 0 && x.CreatedByUserId == id && x.isUsedForKinOrKith == true).ToListAsync();
            return Ok(kinOrKiths);
        }
        [HttpPost("Delete/{userId}")]
        public async Task<IActionResult> Delete(int userId)
        {
            try
            {
                var user = await UserManager.FindByIdAsync(userId.ToString());
                await UserManager.DeleteAsync(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [HttpGet("GetKinOrKithByCreatedUserId/{id}")]
        public async Task<IActionResult> GetKinOrKithByCreatedUserId(int id)
        {
            var kinOrKith = await _GetKinOrKithByCreatedUserId(id);
            return Ok(kinOrKith);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> EditGroup(/*[FromForm]*/ User user)
        {
            /*if (group.ImageFile != null)
            {
                string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.GroupImages.ToString(), group.ImageFile);
                if (string.IsNullOrEmpty(filename))
                    throw new GenericException(Exceptions.FileNotSaved);
                else
                    group.Image = filename;
            }*/
            var _user = await _GetKinOrKithByCreatedUserId(user.Id);
            _user.name = user.name;
            _user.PhoneNumber = user.PhoneNumber;
            _user.Email = user.Email;

            await UserManager.UpdateAsync(_user);
            return Ok(_user);
        }

        #region
        private async Task<User> _GetKinOrKithByCreatedUserId(int id)
        {
            var userId = Common.GetLoggedUser(User);
            var kinOrKith = await UserManager.Users.Where(x => x.CreatedByUserId != 0 && x.CreatedByUserId == userId && x.isUsedForKinOrKith == true && x.Id == id).FirstOrDefaultAsync();

            return kinOrKith;
        }
        #endregion

    }
}

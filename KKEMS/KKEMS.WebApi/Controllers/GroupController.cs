using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace KKEMS.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;
        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllGroups()
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var groups = await _groupService.GetGroups(userId);
            return Ok(groups);
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetGroupById(int id)
        {
            return Ok(await _groupService.GetGroupById(id));
        }
        [HttpPost("Add")]
        public async Task<IActionResult> CreateGroup(/*[FromForm]*/ Group group)
        {
            /*string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.GroupImages.ToString(), group.ImageFile);
            if (string.IsNullOrEmpty(filename))
            {
                //throw new GenericException(Exceptions.FileNotSaved); 
            }
            else
                group.Image = filename;*/

            if (User != null)
            {
                int userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);
                group.UserId = userId;
            }
                
            await _groupService.Add(group);
            return Ok(group);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> EditGroup(/*[FromForm]*/ Group group)
        {
            /*if (group.ImageFile != null)
            {
                string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.GroupImages.ToString(), group.ImageFile);
                if (string.IsNullOrEmpty(filename))
                    throw new GenericException(Exceptions.FileNotSaved);
                else
                    group.Image = filename;
            }*/
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            await _groupService.Update(group);
            return Ok(group);
        }
        [HttpPost("Delete/{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            await _groupService.Remove(id);
            return Ok(new Group()); //need to resolve (If your response type is not a JSON it will just pass the response to the error )
        }
    }
}

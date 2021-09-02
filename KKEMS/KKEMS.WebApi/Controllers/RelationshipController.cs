using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KKEMS.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : ControllerBase
    {
        private readonly IRelationshipService _relationshipService;
        private readonly IGroupService _groupService;
        public RelationshipController(IRelationshipService relationshipService, IGroupService groupService)
        {
            _relationshipService = relationshipService;
            _groupService = groupService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllRelationships()
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var relationship = await _relationshipService.GetRelationships(userId);
            return Ok(relationship);
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetRelationshipById(int id)
        {
            var relationship = await _relationshipService.GetRelationshipById(id);
            return Ok(relationship);
        }
        [HttpPost("Add")]
        public async Task<IActionResult> CreateRelationship(/*[FromForm]*/ Relationship relationship)
        {
            /*string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.RelationshipImages.ToString(), relationship.ImageFile);
            if (string.IsNullOrEmpty(filename))
            {
                //throw new GenericException(Exceptions.FileNotSaved); 
            }
            else
                relationship.Image = filename;*/
            relationship.Group = await _groupService.GetGroupById(relationship.GroupId);
            await _relationshipService.Add(relationship);
            return Ok(relationship);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> EditRelationship(/*[FromForm]*/ Relationship relationship)
        {
            /*if (relationship.ImageFile != null)
            {
                string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.RelationshipImages.ToString(), relationship.ImageFile);
                if (string.IsNullOrEmpty(filename))
                    throw new GenericException(Exceptions.FileNotSaved);
                else
                    relationship.Image = filename;
            }*/

            await _relationshipService.Update(relationship);
            return Ok(relationship);
        }
        [HttpPost("Delete/{id}")]
        public async Task<IActionResult> DeleteRelationship(int id)
        {
            await _relationshipService.Remove(id);
            return Ok(new Relationship()); //need to resolve (If your response type is not a JSON it will just pass the response to the error )
        }
    }
}

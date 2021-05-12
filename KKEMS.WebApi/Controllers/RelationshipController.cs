using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KKEMS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : ControllerBase
    {
        private readonly IRelationshipService _relationshipService;
        public RelationshipController(IRelationshipService relationshipService)
        {
            _relationshipService = relationshipService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllRelationships()
        {
            var relationship = await _relationshipService.GetRelationships();
            return Ok(relationship);
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetRelationshipById(int id)
        {
            return Ok(await _relationshipService.GetRelationshipById(id));
        }
        [HttpPost("Add")]
        public async Task<IActionResult> CreateRelationship([FromForm] Relationship relationship)
        {
            /*string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.RelationshipImages.ToString(), relationship.ImageFile);
            if (string.IsNullOrEmpty(filename))
            {
                //throw new GenericException(Exceptions.FileNotSaved); 
            }
            else
                relationship.Image = filename;*/

            await _relationshipService.Add(relationship);
            return Ok(relationship);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> EditRelationship([FromForm] Relationship relationship)
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

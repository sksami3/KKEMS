using KKEMS.Core.Entity;
using KKEMS.Core.Interfaces.Services;
using KKEMS.WebApi.Helper;
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
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IUserService _userService;
        private readonly IGroupService _groupService;
        public ExpenseController(IExpenseService expenseService,
                                     IUserService userService,
                                    IGroupService groupService)
        {
            _expenseService = expenseService;
            _userService = userService;
            _groupService = groupService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllExpenses()
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var expense = await _expenseService.GetExpenses(userId);
            return Ok(expense);
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetExpenseById(int id)
        {
            return Ok(await _expenseService.GetExpenseById(id));
        }
        [HttpPost("Add")]
        public async Task<IActionResult> CreateExpense(/*[FromForm]*/ Expense expense)
        {
            /*string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.ExpenseImages.ToString(), expense.ImageFile);
            if (string.IsNullOrEmpty(filename))
            {
                //throw new GenericException(Exceptions.FileNotSaved); 
            }
            else
                expense.Image = filename;*/
            int userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);
            expense.UserId = userId;
            if (expense.KithOrKinId == 0 || expense.KithOrKinId == null)
            {
                expense.Group = await _groupService.GetGroupById(Convert.ToInt32(expense.GroupId));
                expense.KithOrKinId = null;
            }
            else
                expense.GroupId = null;

            #region Validation
            if (!Common.ExpenseValidation(expense))
            {
                return BadRequest("Please choose Kith Or Kin or Group");
            }
            #endregion

            await _expenseService.Add(expense);
            return Ok(expense);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> EditExpense(/*[FromForm]*/ Expense expense)
        {
            /*if (expense.ImageFile != null)
            {
                string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.ExpenseImages.ToString(), expense.ImageFile);
                if (string.IsNullOrEmpty(filename))
                    throw new GenericException(Exceptions.FileNotSaved);
                else
                    expense.Image = filename;
            }*/

            await _expenseService.Update(expense);
            return Ok(expense);
        }
        [HttpPost("Delete/{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            await _expenseService.Remove(id);
            return Ok(new Expense()); //need to resolve (If your response type is not a JSON it will just pass the response to the error )
        }
    }
}

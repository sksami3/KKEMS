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
    public class StatisticsController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IUserService _userService;
        private readonly IGroupService _groupService;
        public StatisticsController(IExpenseService expenseService,
                                     IUserService userService,
                                    IGroupService groupService)
        {
            _expenseService = expenseService;
            _userService = userService;
            _groupService = groupService;
        }

        [HttpGet("GetGroupStatistics")]
        public async Task<IActionResult> GetGroupStatistics()
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var stat = await _expenseService.GetGroupExpenses(userId);
            return Ok(stat);
        }

        [HttpGet("GetKithOrKinStatistics")]
        public async Task<IActionResult> GetKithOrKinStatistics()
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var stat = await _expenseService.GetKithOrKinExpenses(userId);
            return Ok(stat);
        }

        [HttpGet("GetMonthlyExpenseStatistics")]
        public async Task<IActionResult> GetMonthlyExpenseStatistics()
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var stat = await _expenseService.GetMonthlyExpenseStatistics(userId);
            return Ok(stat);
        }
    }
}

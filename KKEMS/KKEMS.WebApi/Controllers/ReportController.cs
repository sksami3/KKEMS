using KKEMS.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KKEMS.WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IUserService _userService;
        private readonly IGroupService _groupService;
        private readonly IReportService _reportService;
        public ReportController(IExpenseService expenseService,
                                     IUserService userService,
                                    IGroupService groupService,
                                    IReportService reportService)
        {
            _expenseService = expenseService;
            _userService = userService;
            _groupService = groupService;
            _reportService = reportService;
        }
        [HttpGet("GetExpenseReport")]
        public async Task<IActionResult> GetExpenseReport(DateTime fromDate, DateTime ToDate)
        {
            int userId = 0;
            if (User != null)
                userId = Convert.ToInt32(User.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            var rpt = await _reportService.GetExpenseReport(fromDate, ToDate, userId);
            return Ok(rpt);
        }
    }
}

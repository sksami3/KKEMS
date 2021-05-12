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
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _loanService;
        public LoanController(ILoanService loanService)
        {
            _loanService = loanService;
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllLoans()
        {
            var loan = await _loanService.GetLoans();
            return Ok(loan);
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetLoanById(int id)
        {
            return Ok(await _loanService.GetById(id));
        }
        [HttpPost("Add")]
        public async Task<IActionResult> CreateLoan([FromForm] Loan loan)
        {
            /*string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.LoanImages.ToString(), loan.ImageFile);
            if (string.IsNullOrEmpty(filename))
            {
                //throw new GenericException(Exceptions.FileNotSaved); 
            }
            else
                loan.Image = filename;*/

            await _loanService.Add(loan);
            return Ok(loan);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> EditLoan([FromForm] Loan loan)
        {
            /*if (loan.ImageFile != null)
            {
                string filename = Helper.Helper.UploadSingleImage(Helper.Enums.FolderNameEnums.LoanImages.ToString(), loan.ImageFile);
                if (string.IsNullOrEmpty(filename))
                    throw new GenericException(Exceptions.FileNotSaved);
                else
                    loan.Image = filename;
            }*/

            await _loanService.Update(loan);
            return Ok(loan);
        }
        [HttpPost("Delete/{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            await _loanService.Remove(id);
            return Ok(new Loan()); //need to resolve (If your response type is not a JSON it will just pass the response to the error )
        }
    }
}

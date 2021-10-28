using KKEMS.Core.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.Interfaces.Services
{
    public interface IReportService
    {
        Task<List<ReportVM>> GetExpenseReport(DateTime fromDate, DateTime toDate,int groupId, int kithOrKinId, int userId);
    }
}

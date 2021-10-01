using KKEMS.Core.Entity.Auth;
using KKEMS.Core.Interfaces.Repositories;
using KKEMS.Core.Interfaces.Services;
using KKEMS.Core.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace KKEMS.Business.Services
{
    public class ReportService : IReportService
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IRelationshipRepository _repationshipRepository;
        private readonly IGroupRepository _groupRepository;
        private UserManager<User> UserManager { get; }

        public ReportService(
            IExpenseRepository expenseRepository,
            IRelationshipRepository repationshipRepository,
            IGroupRepository groupRepository)
        {
            _expenseRepository = expenseRepository;
            _repationshipRepository = repationshipRepository;
            _groupRepository = groupRepository;
        }
        public async Task<List<ReportVM>> GetExpenseReport(DateTime fromDate, DateTime toDate, int userId)
        {
            IEnumerable<ReportVM> reportVMs = new List<ReportVM>();
            string query = $@"SELECT 
		                        U.UserName AS You,
		                        ISNULL(UR.UserName,MG.Name + ' (GROUP)') AS ExpenseFor,
		                        E.Cost,
		                        E.Reason AS ReasonOfExpense,
		                        ISNULL(G.Name,MG.Name) AS WhatKindOfRelation_GROUP,
		                        ISNULL(R.Name,'GROUP') AS RelationWithYou,
		                        E.ExpenseDate
	                        FROM 
		                        Expenses E INNER JOIN
		                        AspNetUsers U ON E.UserId = U.Id LEFT JOIN 
		                        AspNetUsers UR ON E.KithOrKinId = UR.Id LEFT JOIN
		                        RelationshipUser RU ON E.KithOrKinId = RU.KithOrKinsId LEFT JOIN
		                        Relationships R ON R.Id = RU.RelationshipsId LEFT JOIN
		                        Groups G ON G.Id = R.GroupId LEFT JOIN
		                        Groups MG ON MG.Id = E.GroupId
                            --WHERE 
								--E.UserId = {userId}
								--AND E.ExpenseDate BETWEEN {fromDate} AND {toDate}";
            
            using (IDbConnection dbConnection = new SqlConnection("Server=DESKTOP-SSR\\SQLEXPRESS;Database=KKEMS_DB;User Id=sa;password=sa1234;Trusted_Connection=False;MultipleActiveResultSets=true;"))
            {
                dbConnection.Open();
                try
                {
                    reportVMs = await SqlMapper.QueryAsync<ReportVM>(dbConnection, sql: query);
                }
                catch(Exception e)
                {
                    throw e;
                }
                finally
                {
                    dbConnection.Close();
                }
                
                
            }

            return reportVMs.ToList();

        }
    }
}

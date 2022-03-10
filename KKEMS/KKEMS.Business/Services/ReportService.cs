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
using Microsoft.Extensions.Configuration;

namespace KKEMS.Business.Services
{
    public class ReportService : IReportService
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IRelationshipRepository _repationshipRepository;
        private readonly IGroupRepository _groupRepository;
        private IConfiguration _configuration;
        private UserManager<User> UserManager { get; }

        public ReportService(
            IExpenseRepository expenseRepository,
            IRelationshipRepository repationshipRepository,
            IGroupRepository groupRepository,
            IConfiguration configuration)
        {
            _expenseRepository = expenseRepository;
            _repationshipRepository = repationshipRepository;
            _groupRepository = groupRepository;
            _configuration = configuration;
        }
        public async Task<List<ReportVM>> GetExpenseReport(DateTime fromDate, DateTime toDate, int groupId, int kithOrKinId, int userId)
        {
            IEnumerable<ReportVM> reportVMs = new List<ReportVM>();
            string query = $@"SELECT 
		                        U.UserName AS You,
		                        ISNULL(UR.name,ISNULL(G.Name + ' (GROUP)', 'N/A')) AS ExpenseFor,
		                        E.Cost,
		                        E.Reason AS ReasonOfExpense,
		                        ISNULL(G.Name,'') AS WhatKindOfRelation_GROUP,
		                        ISNULL(R.RelationName,'GROUP') AS RelationWithYou,
		                        E.ExpenseDate
	                        FROM 
		                        Expenses E INNER JOIN
		                        AspNetUsers U ON E.UserId = U.Id LEFT JOIN 
		                        AspNetUsers UR ON E.KithOrKinId = UR.Id LEFT JOIN
								(
									SELECT 
										G.UserId userId, R.Name RelationName, R.Id RelationshipId, RU.KithOrKinsId KKId, R.GroupId 
									FROM Relationships R 
									INNER JOIN RelationshipUser RU ON R.Id = RU.RelationshipsId
									INNER JOIN Groups G ON G.Id = R.GroupId
								) R ON R.userId = U.Id AND R.KKId = E.KithOrKinId LEFT JOIN
								(
									SELECT UserId, Id, G.Name FROM Groups G
								) G ON (G.UserId = U.Id AND G.Id = E.GroupId) OR (G.UserId = U.Id AND G.Id = R.GroupId)
                            WHERE 
								E.UserId = {userId}
								AND CAST(E.ExpenseDate AS DATE) BETWEEN '{fromDate.ToLongDateString()}' AND '{toDate.ToLongDateString()}'
                                AND ({groupId} = 0 OR G.Id = {groupId})
                                AND ({kithOrKinId} = 0 OR E.KithOrKinId = {kithOrKinId})";
            
            using (IDbConnection dbConnection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection")))
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

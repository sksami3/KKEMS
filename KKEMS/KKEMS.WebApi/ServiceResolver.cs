using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KKEMS.Business.Services;
using KKEMS.Core.Interfaces.Repositories;
using KKEMS.Core.Interfaces.Services;
using KKEMS.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace KKEMS.Web
{
    public static class ServiceResolver
    {
        public static void Resolve(this IServiceCollection services)
        {

            //services.AddTransient<IUnitOfWork, UnitOfWork>();

            #region service 
            services.AddTransient<IGroupService, GroupService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRelationshipService, RelationshipService>();
            services.AddTransient<IExpenseService, ExpenseService>();
            services.AddTransient<ILoanService, LoanService>();
            #endregion

            #region repositories
            services.AddTransient<IGroupRepository, GroupRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRelationshipRepository, RelationshipRepository>();
            services.AddTransient<ILoanRepository, LoanRepository>();
            services.AddTransient<IExpenseRepository, ExpenseRepository>();
            #endregion



            //services.AddAutoMapper(typeof(Startup));





        }
    }
}

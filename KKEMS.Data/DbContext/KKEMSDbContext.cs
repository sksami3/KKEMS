using KKEMS.Core.Entity;
using KKEMS.Core.Entity.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Data.DbContext
{
    public class KKEMSDbContext : IdentityDbContext<User,Role,int>
    {
        public KKEMSDbContext(DbContextOptions<KKEMSDbContext> options) : base(options)
        {

        }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Relationship> Relationships { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Loan> Loans { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseLazyLoadingProxies();
            }
        }
    }
}

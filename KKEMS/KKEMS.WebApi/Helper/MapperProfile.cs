using AutoMapper;
using KKEMS.Core.Entity;
using KKEMS.Core.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KKEMS.WebApi.Helper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Group, GroupVM>().ReverseMap();
            CreateMap<Relationship, RelationshipVM>().ReverseMap();
            CreateMap<Expense, ExpenseVM>().ReverseMap();
            CreateMap<Loan, LoanVM>().ReverseMap();

            //CreateMap<User, UserViewModel>().ReverseMap();
        }
    }
}

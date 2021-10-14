using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.ViewModel
{
    public class ReportVM
    {
        public string ExpenseFor { get; set; }
        public Decimal Cost { get; set; }
        public string ReasonOfExpense { get; set; }
        public string WhatKindOfRelation_GROUP { get; set; }
        public string RelationWithYou { get; set; }
        public DateTime ExpenseDate { get; set; }
    }
}

using KKEMS.Core.Entity;
using KKEMS.Core.Entity.Auth;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.ViewModel
{
    public class ExpenseVM
    {
        public double Cost { get; set; }
        public string Reason { get; set; }
        public DateTime ExpenseDate { get; set; }
        #region Foreign Fields
        [DisplayName("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [DisplayName("Kith Or Kin")]
        public Nullable<int> KithOrKinId { get; set; }
        public User KithOrKin { get; set; }

        [DisplayName("Group")]
        public Nullable<int> GroupId { get; set; }
        public Group Group { get; set; }
        #endregion
    }
}

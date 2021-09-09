using KKEMS.Core.Entity.Auth;
using KKEMS.Core.Entity.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.Entity
{
    public class Expense : BaseModel
    {
        public double Cost { get; set; }
        public string Reason { get; set; }
        public DateTime ExpenseDate { get; set; }
        #region Foreign Fields
        [DisplayName("User")]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [DisplayName("Kith Or Kin")]
        [ForeignKey("KithOrKin")]
        public Nullable<int> KithOrKinId { get; set; }
        public virtual User KithOrKin { get; set; }

        [DisplayName("Group")]
        [ForeignKey("Group")]
        public Nullable<int> GroupId { get; set; }
        public virtual Group Group { get; set; }
        #endregion
        //TODO change after adding view model
        [NotMapped]
        public string KKOrGroupName { get; set; }
    }
}

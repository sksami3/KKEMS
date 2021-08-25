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
    public class Group : BaseModel
    {
        public Group()
        {
            KithOrKins = new List<User>();
        }
        public string Name { get; set; }
        #region Foreign Fields
        [DisplayName("User")]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<User> KithOrKins { get; set; }
        #endregion
    }
}

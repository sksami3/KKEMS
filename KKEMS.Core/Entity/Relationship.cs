using KKEMS.Core.Entity.Auth;
using KKEMS.Core.Entity.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace KKEMS.Core.Entity
{
    public class Relationship : BaseModel
    {
        public string Name { get; set; }
        #region Foreign Fields
        [DisplayName("User")]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<User> KithOrKins { get; set; }

        [DisplayName("Group")]
        [ForeignKey("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }
        #endregion
    }
}

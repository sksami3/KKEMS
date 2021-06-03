using KKEMS.Core.Entity.Auth;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.ViewModel
{
    public class GroupVM
    {
        public string Name { get; set; }
        #region Foreign Fields
        [DisplayName("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<User> KithOrKins { get; set; }
        #endregion
    }
}

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
    public class RelationshipVM
    {
        public string Name { get; set; }
        #region Foreign Fields
        public ICollection<User> KithOrKins { get; set; }

        [DisplayName("Group")]
        public int GroupId { get; set; }
        public Group Group { get; set; }
        #endregion
    }
}

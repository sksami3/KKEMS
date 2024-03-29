﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.Entity.Auth
{
    public class User : IdentityUser<int>
    {
        public string token { get; set; }
        public string name { get; set; }
        [Required]
        public int CreatedByUserId { get; set; }
        [Required]
        public bool isUsedForKinOrKith { get; set; }
        [NotMapped]
        public virtual ICollection<Group> Groups { get; set; }
        [NotMapped]
        public virtual ICollection<Relationship> Relationships { get; set; }
    }
}

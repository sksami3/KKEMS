﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KKEMS.Core.Entity.Auth
{
    public class User : IdentityUser<int>
    {
        public string token { get; set; }
    }
}

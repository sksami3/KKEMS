using KKEMS.Core.Entity;
using KKEMS.Core.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace KKEMS.WebApi.Helper
{
    public class Common
    {
        public static string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        public static bool ExpenseValidation(Expense expense)
        {
            if(expense.KithOrKinId != null || expense.GroupId != null)
            {
                return true;
            }
            return false;
        }

        public static int GetLoggedUser(ClaimsPrincipal user)
        {
            int userId = 0;
            if (user != null)
                userId = Convert.ToInt32(user.FindAll(ClaimTypes.NameIdentifier)?.Last().Value);

            return userId;
        }
    }
}

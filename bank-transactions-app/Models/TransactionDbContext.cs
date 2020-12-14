using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace jQueryAjaxCRUDinASPNET.Models
{
    public class TransactionDbContext : DbContext
    {
        public TransactionDbContext(DbContextOptions<TransactionDbContext> options): base(options) 
        {

        }

        //Reference neccesary so that model can create physical table in SQL
        public DbSet<TransactionModel> Transactions { get; set; }
    }
}

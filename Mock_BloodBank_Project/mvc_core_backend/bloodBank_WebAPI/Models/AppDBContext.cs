using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace bloodBank_WebAPI.Models
{
    public class AppDBContext : DbContext
    {
        public DbSet<DonorCanidate> donorCanidate { get; set; }
        
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        { 
        
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;



namespace Notes.db
{
     public class AppDBContext : DbContext
    {
        public DbSet<Note> Note { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=Note;Integrated Security=True");
        }
    }

}

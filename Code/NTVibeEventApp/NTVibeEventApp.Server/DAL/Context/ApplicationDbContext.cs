using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using NTVibeEventApp.Server.Entities;

namespace NTVibeEventApp.Server.DAL.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}

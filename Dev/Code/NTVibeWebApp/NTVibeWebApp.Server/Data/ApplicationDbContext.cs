using Microsoft.EntityFrameworkCore;
using NTVibeWebApp.Server.Models;

namespace NTVibeWebApp.Server.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
    }
}

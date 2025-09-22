using Microsoft.EntityFrameworkCore;
using NTVibeEventApp.Server.DAL.Context;
using NTVibeEventApp.Server.DAL.Interfaces;
using NTVibeEventApp.Server.Entities;

namespace NTVibeEventApp.Server.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}

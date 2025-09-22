using NTVibeEventApp.Server.Entities;

namespace NTVibeEventApp.Server.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task AddAsync(User user);
    }
}

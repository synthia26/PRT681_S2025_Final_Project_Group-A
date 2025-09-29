using System.Security.Cryptography;
using System.Text;
using NTVibeEventApp.Server.BLL.Interfaces;
using NTVibeEventApp.Server.DAL.Interfaces;
using NTVibeEventApp.Server.Entities;
using NTVibeEventApp.Server.Presentation.DTOs;

namespace NTVibeEventApp.Server.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> RegisterAsync(UserRegisterDto dto)
        {
            var existing = await _repo.GetByEmailAsync(dto.Email);
            if (existing != null) return false; // user already exists

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = HashPassword(dto.Password),
                Role = dto.Role
            };

            await _repo.AddAsync(user);
            return true;
        }
        public async Task<User?> LoginAsync(UserLoginDto dto)
        {
            var user = await _repo.GetByEmailAsync(dto.Email);
            if (user == null) return null;

            var hash = HashPassword(dto.Password);
            return user.PasswordHash == hash ? user : null;
        }

        // Simple SHA256 hashing (better: use ASP.NET Identity)
        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}

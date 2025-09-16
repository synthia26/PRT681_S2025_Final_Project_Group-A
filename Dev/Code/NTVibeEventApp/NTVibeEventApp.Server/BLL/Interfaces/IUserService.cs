using NTVibeEventApp.Server.Entities;
using NTVibeEventApp.Server.Presentation.DTOs;

namespace NTVibeEventApp.Server.BLL.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterAsync(UserRegisterDto dto);
        Task<User?> LoginAsync(UserLoginDto dto);
    }
}

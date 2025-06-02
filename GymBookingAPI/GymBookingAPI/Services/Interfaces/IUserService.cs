using GymBookingAPI.DTOs;
using GymBookingAPI.Models;

namespace GymBookingAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
        Task<User> RegisterUserAsync(UserDto request);
        Task<string> GenerateJwtTokenAsync(User user);
    }
}

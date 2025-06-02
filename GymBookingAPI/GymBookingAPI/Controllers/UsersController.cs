using GymBookingAPI.Data;
using GymBookingAPI.Models;
using GymBookingAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace GymBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // POST: api/Users/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserDto request)
        {
            // Validar si el email ya está registrado
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("El correo ya está registrado");
            }

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                Role = request.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password) // usar campo correcto
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado con éxito" });
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<IEnumerable<User>>> DeleteUser(int id)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

                throw new Exception("Error al eliminar usuario: ",ex);
            }
            
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginRequest request)
        {
            Console.WriteLine($"Intento login: {request.Email}");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                Console.WriteLine("Usuario no encontrado");
                return Unauthorized("Credenciales inválidas");
            }

            var passwordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            Console.WriteLine($"Password válido: {passwordValid}");

            if (!passwordValid)
            {
                return Unauthorized("Credenciales inválidas");
            }
            // Generar token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                ),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Retornar token y datos básicos del usuario (sin contraseña)
            return Ok(new
            {
                Token = tokenString,
                User = new { user.Id, user.FullName, user.Email, user.Role }
            });
        }
        [Authorize] // Agrega esto
        [HttpGet("Perfil")]
        public async Task<ActionResult> GetPerfil()
        {
            var email = User.FindFirstValue(ClaimTypes.Email); // Del token
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null) return NotFound();

            return Ok(new { user.Id, user.FullName, user.Email, user.Role });
        }
    }

    // DTO para el login
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
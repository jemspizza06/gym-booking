using GymBookingAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymBookingAPI.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("resumen")]
        public async Task<IActionResult> ObtenerResumen()
        {
            var totalSocios = await _context.Users.CountAsync(u => u.Role == "Socio");
            var totalEntrenadores = await _context.Users.CountAsync(u => u.Role == "Entrenador");
            var totalClases = await _context.Clases.CountAsync();
            var totalReservas = await _context.Reservas.CountAsync();

            return Ok(new
            {
                totalSocios,
                totalEntrenadores,
                totalClases,
                totalReservas
            });
        }
    }
}

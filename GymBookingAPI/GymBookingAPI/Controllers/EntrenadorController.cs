using GymBookingAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GymBookingAPI.Controllers
{
    [Route("api/entrenador")]
    [ApiController]
    [Authorize(Roles = "Entrenador")]
    public class EntrenadorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EntrenadorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/entrenador/mis-clases
        [HttpGet("mis-clases")]
        public async Task<IActionResult> GetMisClases()
        {
            var entrenadorId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var clases = await _context.Clases
                .Where(c => c.EntrenadorId == entrenadorId)
                .ToListAsync();

            return Ok(clases);
        }

        // GET: api/entrenador/alumnos-por-clase/5
        [HttpGet("alumnos-por-clase/{claseId}")]
        public async Task<IActionResult> GetAlumnosPorClase(int claseId)
        {
            var entrenadorId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var clase = await _context.Clases
                .FirstOrDefaultAsync(c => c.Id == claseId && c.EntrenadorId == entrenadorId);

            if (clase == null)
                return NotFound("Clase no encontrada o no te pertenece");

            var reservas = await _context.Reservas
                .Include(r => r.Socio)
                .Where(r => r.ClaseId == claseId)
                .Select(r => new {
                    r.Socio.Id,
                    r.Socio.FullName,
                    r.Socio.Email
                })
                .ToListAsync();

            return Ok(reservas);
        }
    }
}

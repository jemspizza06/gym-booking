using GymBookingAPI.Data;
using GymBookingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GymBookingAPI.Controllers
{
    [Route("api/socio")]
    [ApiController]
    [Authorize(Roles = "Socio")]
    public class SocioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SocioController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/socio/clases-vigentes
        [HttpGet("clases-vigentes")]
        public async Task<IActionResult> GetClasesVigentes()
        {
            var hoy = DateTime.UtcNow;
            var clases = await _context.Clases
                .Include(c => c.Entrenador)
                .Where(c => c.Fecha >= hoy)
                .ToListAsync();

            return Ok(clases);
        }

        // POST: api/socio/reservar/5
        [HttpPost("reservar/{claseId}")]
        public async Task<IActionResult> ReservarClase(int claseId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var clase = await _context.Clases.FindAsync(claseId);

            if (clase == null) return NotFound("Clase no encontrada");

            // Verificar si ya reservó
            var yaReservado = await _context.Reservas
                .AnyAsync(r => r.ClaseId == claseId && r.SocioId == userId);

            if (yaReservado) return BadRequest("Ya tienes una reserva para esta clase");

            // Verificar capacidad
            var reservasActuales = await _context.Reservas
                .CountAsync(r => r.ClaseId == claseId);

            if (reservasActuales >= clase.CapacidadMaxima)
                return BadRequest("La clase está llena");

            // Crear la reserva
            var reserva = new Reserva
            {
                ClaseId = claseId,
                SocioId = userId
            };

            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Reserva exitosa", reserva });
        }

        // GET: api/socio/mis-reservas
        [HttpGet("mis-reservas")]
        public async Task<IActionResult> ObtenerMisReservas()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var reservas = await _context.Reservas
                .Include(r => r.Clase)
                .Where(r => r.SocioId == userId)
                .ToListAsync();

            return Ok(reservas);
        }

        // DELETE: api/socio/cancelar-reserva/5
        [HttpDelete("cancelar-reserva/{reservaId}")]
        public async Task<IActionResult> CancelarReserva(int reservaId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var reserva = await _context.Reservas
                .Include(r => r.Clase)
                .FirstOrDefaultAsync(r => r.Id == reservaId && r.SocioId == userId);

            if (reserva == null)
                return NotFound("Reserva no encontrada");

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Reserva cancelada correctamente" });
        }

    }
}

using GymBookingAPI.Data;
using GymBookingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymBookingAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Administrador")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/admin/clases
        [HttpPost("clases")]
        public async Task<IActionResult> CrearClase(Clase clase)
        {
            if (clase.Fecha < DateTime.UtcNow)
                return BadRequest("La fecha de la clase no puede estar en el pasado.");

            _context.Clases.Add(clase);
            await _context.SaveChangesAsync();
            return Ok(clase);
        }

        // GET: api/admin/clases
        [HttpGet("clases")]
        public async Task<IActionResult> ObtenerClases()
        {
            var clases = await _context.Clases.Include(c => c.Entrenador).ToListAsync();
            return Ok(clases);
        }

        // PUT: api/admin/clases/5
        [HttpPut("clases/{id}")]
        public async Task<IActionResult> EditarClase(int id, Clase claseEditada)
        {
            var clase = await _context.Clases.FindAsync(id);
            if (clase == null) return NotFound();

            if (claseEditada.Fecha < DateTime.UtcNow)
                return BadRequest("La fecha de la clase no puede estar en el pasado.");

            clase.Nombre = claseEditada.Nombre;
            clase.Descripcion = claseEditada.Descripcion;
            clase.Fecha = claseEditada.Fecha;
            clase.CapacidadMaxima = claseEditada.CapacidadMaxima;

            await _context.SaveChangesAsync();
            return Ok(clase);
        }

        [HttpDelete("clases/{id}")]
        public async Task<IActionResult> EliminarClases(int id)
        {
            var claseEliminable = await _context.Clases.SingleOrDefaultAsync(c => c.Id == id);
            _context.Clases.Remove(claseEliminable);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/admin/clases/5/asignar-entrenador/3
        [HttpPut("clases/{claseId}/asignar-entrenador/{entrenadorId}")]
        public async Task<IActionResult> AsignarEntrenador(int claseId, int entrenadorId)
        {
            var clase = await _context.Clases.FindAsync(claseId);
            var entrenador = await _context.Users.FirstOrDefaultAsync(u => u.Id == entrenadorId && u.Role == "Entrenador");

            if (clase == null || entrenador == null)
                return NotFound("Clase o entrenador no encontrado");

            clase.EntrenadorId = entrenadorId;
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Entrenador asignado correctamente", clase });
        }

        // DELETE: api/admin/cancelar-reserva/5
        [HttpDelete("cancelar-reserva/{reservaId}")]
        public async Task<IActionResult> CancelarReservaAdmin(int reservaId)
        {
            var reserva = await _context.Reservas.FindAsync(reservaId);
            if (reserva == null) return NotFound("Reserva no encontrada");

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Reserva cancelada por administrador" });
        }

        // GET: api/admin/socios
        [HttpGet("socios")]
        public async Task<IActionResult> ObtenerSocios()
        {
            var socios = await _context.Users
                .Where(u => u.Role == "Socio")
                .ToListAsync();
            return Ok(socios);
        }

        // GET: api/admin/entrenadores
        [HttpGet("entrenadores")]
        public async Task<IActionResult> ObtenerEntrenadores()
        {
            var entrenadores = await _context.Users
                .Where(u => u.Role == "Entrenador")
                .ToListAsync();
            return Ok(entrenadores);
        }

        // DELETE: api/admin/eliminar-usuario/5
        [HttpDelete("eliminar-usuario/{userId}")]
        public async Task<IActionResult> EliminarUsuario(int userId)
        {
            var usuario = await _context.Users.FindAsync(userId);
            if (usuario == null) return NotFound("Usuario no encontrado");

            _context.Users.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Usuario eliminado correctamente" });
        }


    }
}
    
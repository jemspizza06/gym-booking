//Models/Clase.cs
namespace GymBookingAPI.Models
{
    public class Clase
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public DateTime Fecha { get; set; }
        public int CapacidadMaxima { get; set; }

        // Relación con entrenador
        public int? EntrenadorId { get; set; }
        public User? Entrenador { get; set; }
    }
}

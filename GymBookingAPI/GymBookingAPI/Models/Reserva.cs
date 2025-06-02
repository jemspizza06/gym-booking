namespace GymBookingAPI.Models
{
    public class Reserva
    {
        public int Id { get; set; }

        public int ClaseId { get; set; }
        public Clase Clase { get; set; }

        public int SocioId { get; set; }
        public User Socio { get; set; }

        public DateTime FechaReserva { get; set; } = DateTime.UtcNow;
    }
}

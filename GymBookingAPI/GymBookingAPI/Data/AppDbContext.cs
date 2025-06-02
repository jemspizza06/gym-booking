using GymBookingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymBookingAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Clase> Clases { get; set; }
        public DbSet<Reserva> Reservas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Clase>()
                .HasOne(c => c.Entrenador)
                .WithMany()
                .HasForeignKey(c => c.EntrenadorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reserva>()
                .HasOne(r => r.Socio)
                .WithMany()
                .HasForeignKey(r => r.SocioId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reserva>()
                .HasOne(r => r.Clase)
                .WithMany()
                .HasForeignKey(r => r.ClaseId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

}

﻿// <auto-generated />
using System;
using GymBookingAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GymBookingAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250602010633_UltimaMigracionLimpia")]
    partial class UltimaMigracionLimpia
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GymBookingAPI.Models.Clase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CapacidadMaxima")
                        .HasColumnType("int");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("EntrenadorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("EntrenadorId");

                    b.ToTable("Clases");
                });

            modelBuilder.Entity("GymBookingAPI.Models.Reserva", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClaseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaReserva")
                        .HasColumnType("datetime2");

                    b.Property<int>("SocioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClaseId");

                    b.HasIndex("SocioId");

                    b.ToTable("Reservas");
                });

            modelBuilder.Entity("GymBookingAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GymBookingAPI.Models.Clase", b =>
                {
                    b.HasOne("GymBookingAPI.Models.User", "Entrenador")
                        .WithMany()
                        .HasForeignKey("EntrenadorId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Entrenador");
                });

            modelBuilder.Entity("GymBookingAPI.Models.Reserva", b =>
                {
                    b.HasOne("GymBookingAPI.Models.Clase", "Clase")
                        .WithMany()
                        .HasForeignKey("ClaseId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("GymBookingAPI.Models.User", "Socio")
                        .WithMany()
                        .HasForeignKey("SocioId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Clase");

                    b.Navigation("Socio");
                });
#pragma warning restore 612, 618
        }
    }
}

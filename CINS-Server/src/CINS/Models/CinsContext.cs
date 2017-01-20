using System;
using CINS.Models.DB;
using Microsoft.EntityFrameworkCore;

namespace CINS.Models
{
    public class CinsContext : DbContext
    {

//        public CinsContext(DbContextOptions<CinsContext> options) : base(options) {}
        public DbSet<AllTopics> AllTopics { get; set; }
        public DbSet<MainTopics> MainTopics { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connection = "User ID=postgres;Password=c9j98y5t;Host=localhost;Port=5432;Database=CINS;Pooling=true;";
            optionsBuilder.UseNpgsql(connection);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MainTopics>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("Id");
                entity.Property(e => e.Name).HasColumnName("Name");
            });
        }
    }
}
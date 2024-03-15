using brandub.Server.DataAccess.Configurations;
using brandub.Server.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace brandub.Server.DataAccess;

public sealed class GameDbContext : DbContext
{
    public GameDbContext(DbContextOptions<GameDbContext> options) : base(options)
    {
        // создаем базу, если ее нет
        Database.EnsureCreated();
    }
    
    public DbSet<GameEntity> Games { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new GameConfiguration());
    }
}
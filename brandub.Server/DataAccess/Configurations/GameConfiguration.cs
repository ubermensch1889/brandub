using brandub.Server.DataAccess.Entities;
using brandub.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace brandub.Server.DataAccess.Configurations;

public class GameConfiguration : IEntityTypeConfiguration<GameEntity>
{
    public void Configure(EntityTypeBuilder<GameEntity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Field).HasMaxLength(Game.FieldLength).IsRequired();

        builder.Property(x => x.Turn).IsRequired();
    }
}
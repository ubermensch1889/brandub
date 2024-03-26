using brandub.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace brandub.Server.DataAccess.Entities.Repositories;

public class GamesRepository
{
    private readonly GameDbContext _context;

    public GamesRepository(GameDbContext context)
    {
        _context = context;
    }

    public List<Game> Get()
    {
        var gameEntities = _context.Games.ToList();

        var games = gameEntities.Select(g => new Game(g.Id)).ToList();

        return games;
    }

    public void Create(Game game)
    {
        var gameEntity = new GameEntity
        {
            Id = game.Id,
            Field = game.Field,
            Turn = game.Turn
        };

        _context.Games.Add(gameEntity);
        _context.SaveChanges();
    }

    public void Update(Guid id, CellState[] field, bool turn)
    {
        _context.Games
            .Where(g => g.Id == id)
            .ExecuteUpdate(g => g
                .SetProperty(e => e.Field, e => field)
                .SetProperty(e => e.Turn, e => e.Turn));
    }

    public void Delete(Guid id)
    {
        _context.Games
            .Where(g => g.Id == id)
            .ExecuteDelete();
    }
}
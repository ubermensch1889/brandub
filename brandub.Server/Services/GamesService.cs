using brandub.Server.DataAccess.Entities.Repositories;
using brandub.Server.Models;

namespace brandub.Server.Services;

public class GamesService
{
    private readonly GamesRepository _repository;

    public GamesService(GamesRepository repository)
    {
        _repository = repository;
    }

    public List<Game> Get()
    {
        return _repository.Get();
    }

    public void Create(Game game)
    {
        _repository.Create(game);
    }

    public void Update(Guid id, CellState[] field, bool turn, bool started)
    {
        _repository.Update(id, field, turn, started);
    }
    
    public void UpdateStarted(Guid id, bool started)
    {
        var game = _repository.Get().First(g => g.Id == id);
        _repository.Update(id, game.Field, game.Turn, started);
    }
    
    public void UpdateTurn(Guid id, bool turn)
    {
        var game = _repository.Get().First(g => g.Id == id);
        _repository.Update(id, game.Field, turn, game.Started);
    }

    public void Delete(Guid id)
    {
        _repository.Delete(id);
    }

    public bool IsStarted(Guid id)
    {
        var game = _repository.Get().First(g => g.Id == id);
        return game.Started;
    }
}
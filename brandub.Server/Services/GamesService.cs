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

    public void Update(Guid id, string field, bool turn)
    {
        _repository.Update(id, field, turn);
    }

    public void Delete(Guid id)
    {
        _repository.Delete(id);
    }
}
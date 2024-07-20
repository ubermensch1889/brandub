using brandub.Server.DataAccess.Entities.Repositories;
using brandub.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace brandub.Server.Services;

/// <summary>
/// Описание логики работы с базой
/// </summary>
public class GamesService
{
    private readonly GamesRepository _repository;

    public GamesService(GamesRepository repository)
    {
        _repository = repository;
    }
    
    public IEnumerable<CellState> GetUpdatedBoard(Guid id, bool turn)
    {
        var game = _repository.Get().First(g => g.Id == id);

        if (game.Turn == turn)
        {
            return game.Field;
        }
        
        // если доска не изменилась (так как противник не сходил), то возващаем пустое перечислимое
        return Enumerable.Empty<CellState>();
    }
    
    public void MakeMove(MoveInfo info)
    {
        Game game;

        game = _repository.Get().First(g => g.Id == info.Id);
        
        if (game.Turn != info.Side)
        {
            throw new InvalidOperationException("Error: not your turn");
        }
        
        // переводим входные данные в нужный формат
        CellState[] field = new CellState[49];

        for (int i = 0; i < 49; ++i)
        {
            field[i] = info.Board[i] switch
            {
                null => CellState.Empty,
                "attacker" => CellState.Attacker,
                "defender" => CellState.Defender,
                _ => CellState.King
            };
        }
        
        _repository.Update(info.Id, field, !info.Side, game.Started);
    }

    public Guid CreateGame()
    {
        // будем возвращать id новосозданной игры
        var id = Guid.NewGuid();
        var game = new Game(id);
        _repository.Create(game);

        return id;
    }
    
    public void DeleteGame(Guid id)
    {
        if (_repository.Get().Exists(g => g.Id == id))
        {
            _repository.Delete(id);
        }
    } 
    
    public void UpdateStarted(Guid id, bool started)
    {
        if (!_repository.Get().Exists(g => g.Id == id))
        {
            return;
        }
        
        var game = _repository.Get().First(g => g.Id == id);
        _repository.Update(id, game.Field, game.Turn, started);
    }

    public bool IsStarted(Guid id)
    {
        var game = _repository.Get().First(g => g.Id == id);
        return game.Started;
    }
}
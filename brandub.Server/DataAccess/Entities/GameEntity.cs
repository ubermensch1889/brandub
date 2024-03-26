using brandub.Server.Models;

namespace brandub.Server.DataAccess.Entities;

public class GameEntity
{
    public GameEntity(Guid id, CellState[] field, bool turn)
    {
        Id = id;
        Field = field;
        Turn = turn;
    }

    public GameEntity()
    {
    }

    public Guid Id { get; set; }

    public CellState[] Field { get; set; }

    public bool Turn { get; set; }
    // false - attackers, true - defenders
}
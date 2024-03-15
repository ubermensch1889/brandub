namespace brandub.Server.DataAccess.Entities;

public class GameEntity
{
    public GameEntity(Guid id, string field, bool turn)
    {
        Id = id;
        Field = field;
        Turn = turn;
    }

    public GameEntity()
    {
    }

    public Guid Id { get; set; }

    public string Field { get; set; } = string.Empty;

    public bool Turn { get; set; } = false;
    // false - attackers, true - defenders
}
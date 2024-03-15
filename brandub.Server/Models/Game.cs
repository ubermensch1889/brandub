namespace brandub.Server.Models;

public class Game
{
    public const int FieldLength = 49;
    
    public Game(Guid id, string field, bool turn)
    {
        Id = id;
        Field = field;
        Turn = turn;
    }

    public Guid Id { get; }

    public string Field { get; } = string.Empty;

    public bool Turn { get; }
    // false - attackers, true - defenders
}
namespace brandub.Server.Models;

public class Game
{
    public const int FieldLength = 49;
    
    public Game(Guid id)
    {
        Id = id;
        Field = new []
        {
            CellState.Empty, CellState.Empty, CellState.Empty, CellState.Attacker, CellState.Empty, CellState.Empty, CellState.Empty,
            CellState.Empty, CellState.Empty, CellState.Empty, CellState.Attacker, CellState.Empty, CellState.Empty, CellState.Empty,
            CellState.Empty, CellState.Empty, CellState.Empty, CellState.Defender, CellState.Empty, CellState.Empty, CellState.Empty,
            CellState.Attacker, CellState.Attacker, CellState.Defender, CellState.King, CellState.Defender, CellState.Attacker, CellState.Attacker,
            CellState.Empty, CellState.Empty, CellState.Empty, CellState.Defender, CellState.Empty, CellState.Empty, CellState.Empty,
            CellState.Empty, CellState.Empty, CellState.Empty, CellState.Attacker, CellState.Empty, CellState.Empty, CellState.Empty,
            CellState.Empty, CellState.Empty, CellState.Empty, CellState.Attacker, CellState.Empty, CellState.Empty, CellState.Empty
        };
        Turn = false;
    }

    public Guid Id { get; }

    public CellState[] Field { get; }

    public bool Turn { get; }
    // false - attackers, true - defenders
}
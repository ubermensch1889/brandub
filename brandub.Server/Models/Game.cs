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
        Turn = true;
        Started = false;
    }
    
    public Game(Guid id, CellState[] field, bool turn, bool started)
    {
        Id = id;
        Field = field;
        Turn = turn;
        Started = started;
    }

    public Guid Id { get; }

    public CellState[] Field { get; }

    public bool Turn { get; }
    // true - attackers, false - defenders
    
    public bool Started { get; }
}
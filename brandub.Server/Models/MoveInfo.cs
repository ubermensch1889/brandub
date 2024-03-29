namespace brandub.Server.Models;

public class MoveInfo
{
    public Guid Id { get; init; }
    public bool Side { get; init; }
    public string[]? Board { get; init; }
}
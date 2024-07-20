using brandub.Server.Models;
using brandub.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace brandub.Server.Controllers;

[ApiController]
[Route("create-online-game")]
public class CreatingMultiplayerGameController : ControllerBase
{
    private readonly GamesService _service;
    public CreatingMultiplayerGameController(GamesService service)
    {
        _service = service;
    }
    
    [HttpPost]
    public Guid CreateGame()
    {
        return _service.CreateGame();
    }
}
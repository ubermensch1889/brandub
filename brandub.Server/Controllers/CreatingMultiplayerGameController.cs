using brandub.Server.Models;
using brandub.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace brandub.Server.Controllers;

[ApiController]
[Route("create-online-game")]
public class CreatingMultiplayerGameController : ControllerBase
{
    private GamesService _service;
    public CreatingMultiplayerGameController(GamesService service)
    {
        _service = service;
    }
    
    [HttpPost]
    public Guid Post()
    {
        // будем возвращать id новосозданной игры
        var id = Guid.NewGuid();
        var game = new Game(id);
        _service.Create(game);

        return id;
    }
}
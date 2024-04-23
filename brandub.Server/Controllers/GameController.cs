using brandub.Server.Models;
using brandub.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace brandub.Server.Controllers;

[ApiController]
[Route("multiplayer")]
public class GameController : ControllerBase
{
    private readonly GamesService _service;
    public GameController(GamesService service)
    {
        _service = service;
    }

    /// <summary>
    /// Обработка запроса о начале игры от присоединившегося игрока
    /// </summary>
    /// <param name="id">Идентификатор игры</param>
    /// <returns>Результат обработки запроса</returns>
    [HttpPost("start/{id:guid}")]
    public ActionResult Start(Guid id)
    {
        _service.UpdateStarted(id, true);

        return Ok();
    }
    
    /// <summary>
    /// Обработка запроса на получение статуса начала игры
    /// </summary>
    /// <param name="id">Идентификатор игры</param>
    /// <returns>true, если игра началась, иначе - false</returns>
    [HttpGet("get-start/{id:guid}")]
    public bool GetStarted(Guid id)
    {
        return _service.IsStarted(id);
    }
    
    /// <summary>
    /// Получение информации о новом ходе противника
    /// </summary>
    /// <param name="id">Идентификатор игры</param>
    /// <param name="turn">Информация о том, кто сейчас ходит</param>
    /// <returns>Игровое поле</returns>
    [HttpGet("get-updated-board/{id:guid}/{turn:bool}")]
    public IEnumerable<CellState> GetUpdatedBoard(Guid id, bool turn)
    {
        return _service.GetUpdatedBoard(id, turn);
    }
    
    /// <summary>
    /// Обработка хода игрока
    /// </summary>
    /// <param name="info">Информация о ходе: поле, сторона и идентификатор</param>
    /// <returns>Результат запроса</returns>
    [HttpPost("make-move")]
    public ActionResult MakeMove(MoveInfo? info)
    {
        if (info == null)
        {
            return Content("Error: null move info");
        }

        try
        {
            _service.MakeMove(info);
        }
        catch (InvalidOperationException ex)
        {
            return Content(ex.Message);
        }
        
        return Ok();
    }

    /// <summary>
    /// Удаление игры, если она есть в базе, иначе ничего
    /// </summary>
    /// <param name="id">Идентификатор игры</param>
    /// <returns>Результат запроса</returns>
    [HttpDelete("{id:guid}")]
    public ActionResult DeleteGame(Guid id)
    {
        _service.DeleteGame(id);

        return Ok();
    } 
}
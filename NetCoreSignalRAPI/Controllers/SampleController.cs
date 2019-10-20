using Microsoft.AspNetCore.Mvc;

namespace NetCoreSignalRAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SampleController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("There is nothing here, check /positionHub");
        }
    }
}

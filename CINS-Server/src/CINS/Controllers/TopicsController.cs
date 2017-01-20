using System.Linq;
using CINS.Models;
using CINS.Models.DB;
using Microsoft.AspNetCore.Mvc;

namespace CINS.Controllers
{
    [Route("[controller]")]
    public class TopicsController : Controller
    {
        private CinsContext db = new CinsContext();
        [Route("[action]")]
        [HttpGet]
        public AllTopics AllTopics()
        {
            AllTopics allTopics = new AllTopics();
            return allTopics;
        }

        [Route("[action]")]
        [HttpGet]
        public MainTopics MainTopics()
        {
            MainTopics mainTopics = new MainTopics();
            return mainTopics;
        }

        [Route("[action]")]
        [HttpGet]
        public IActionResult Test()
        {
            var topic = db.MainTopics.FirstOrDefault();
            return Json(topic);
        }
    }
}
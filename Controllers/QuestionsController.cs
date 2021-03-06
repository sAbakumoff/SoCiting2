using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SoCiting.Data;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private DataLayer _dataLayer;
        public QuestionsController(IHostingEnvironment env){
            var dbPath = System.IO.Path.Combine(env.ContentRootPath, "Data/sociting.db");
            _dataLayer = new DataLayer(dbPath);
        }
        
        // GET api/questions/ruby
        [HttpGet("{lang}/{offset=0}/{limit=10}")]
        public List<Question> Get(string lang, int offset, int limit)
        {
            return _dataLayer.GetQuestions(lang, offset, limit);
        }
    }
}

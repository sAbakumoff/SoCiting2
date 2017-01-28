using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SoCiting.Data;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class ReferencesController : Controller
    {
        private DataLayer _dataLayer;
        public ReferencesController(IHostingEnvironment env)
        {
            var dbPath = System.IO.Path.Combine(env.ContentRootPath, "Data/sociting.db");
            _dataLayer = new DataLayer(dbPath);
        }
        
        // GET api/references/ruby/id
        [HttpGet("{lang}/{questionId}")]
        public List<Reference> Get(string lang, System.Int64 questionId)
        {
            return _dataLayer.GetReferences(lang, questionId);
        }
    }
}

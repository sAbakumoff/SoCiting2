using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SoCiting.Data;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class LanguagesController : Controller
    {
        private DataLayer _dataLayer;
        public LanguagesController(IHostingEnvironment env){
            var dbPath = System.IO.Path.Combine(env.ContentRootPath, "Data/sociting.db");
            _dataLayer = new DataLayer(dbPath);
        }
        
        // GET api/values
        [HttpGet]
        public IEnumerable<Language> Get()
        {
            return _dataLayer.GetLanguages();
        }
    }
}

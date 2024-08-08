using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.VuVanKhiem.Core.Interfaces;
using MISA.VuVanKhiem.Infrastructure.Repository;

namespace MISA.VuVanKhiem.API.Controllers
{
    [Route("api/v1/Departments")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        IDepartureRepository _departmentsRepository;
        public DepartmentsController(IDepartureRepository repository)
        {
            _departmentsRepository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var res = _departmentsRepository.Get();
            return StatusCode(200, res);
        }
    }
}

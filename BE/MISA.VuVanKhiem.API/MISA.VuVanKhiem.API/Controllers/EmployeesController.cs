using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.VuVanKhiem.Core.Interfaces;
using MISA.VuVanKhiem.Infrastructure.Repository;

namespace MISA.VuVanKhiem.API.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;
        public EmployeesController(IEmployeeRepository repository)
        {
            _employeeRepository = repository;
        }
        [HttpGet]
        public IActionResult Get()
        {
                //var employees = employeeRepository.Get();
                return StatusCode(200, "hello");
        }
    }
}

using MISA.VuVanKhiem.Core.Entities;
using MISA.VuVanKhiem.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.VuVanKhiem.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public object InsertService(Employee entity)
        {

            var res  = _employeeRepository.Insert(entity);
            throw new NotImplementedException();
        }
    }
}

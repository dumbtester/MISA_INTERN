using MISA.VuVanKhiem.Core.Entities;
using MISA.VuVanKhiem.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.VuVanKhiem.Infrastructure.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public int Delete(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int DeleteAll()
        {
            throw new NotImplementedException();
        }

        public List<Employee> Get()
        {
            return new List<Employee> { new Employee() { EmployeeCode = "NV01" } };
        }

        public Employee Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public int Insert(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int Update(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}

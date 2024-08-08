using MISA.VuVanKhiem.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.VuVanKhiem.Core.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        string GetNewEmployeeCode();
        bool CheckCodeDuplicate(String EmloyeeCode);
    }
}


using MISA.VuVanKhiem.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.VuVanKhiem.Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        List<T> Get();
        T Get(Guid id);
        int Insert(T employee);
        int Update(T employee);
        int Delete(T employee);
        int DeleteAll();
    }
}


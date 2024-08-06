using MISA.VuVanKhiem.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.VuVanKhiem.Core.Interfaces
{
    public interface IBaseService<T> where T : class 
    {
        object InsertService(T entity);

    }
}

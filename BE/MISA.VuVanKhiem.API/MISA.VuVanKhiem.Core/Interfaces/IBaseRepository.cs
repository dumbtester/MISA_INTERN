﻿using MISA.VuVanKhiem.Core.Entities;
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
        T? Get(String id);
        int Insert(T entity);
        int Update(T entity);
        int Delete(string id);
        int DeleteAny(Guid[] ids);
    }
}


using MISA.VuVanKhiem.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.VuVanKhiem.Infrastructure.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public int Delete(string id)
        {
            throw new NotImplementedException();
        }

        public int DeleteAny(Guid[] ids)
        {
            throw new NotImplementedException();
        }

        public List<T> Get()
        {
            throw new NotImplementedException();
        }

        public T? Get(string id)
        {
            throw new NotImplementedException();
        }

        public int Insert(T entity)
        {
            throw new NotImplementedException();
        }

        public int Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}

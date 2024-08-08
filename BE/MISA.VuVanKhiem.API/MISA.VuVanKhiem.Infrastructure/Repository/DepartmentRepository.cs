using MISA.VuVanKhiem.Core.Entities;
using MISA.VuVanKhiem.Core;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MISA.VuVanKhiem.Core.Interfaces;

namespace MISA.VuVanKhiem.Infrastructure.Repository
{
    public class DepartmentRepository : IDepartureRepository, IDisposable
    {
        IDbConnection _connection;
        public DepartmentRepository()
        {
            _connection = new MySqlConnection(Common.databaseName);
        }

        public int Delete(string id)
        {
            return 0;
        }

        public int DeleteAny(Guid[] ids)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _connection.Dispose();
        }

        public List<Department> Get()
        {
            var sql = $"SELECT * FROM Department";
            var res = _connection.Query<Department>(sql);
            return res.ToList();
        }

        public Department? Get(string id)
        {
            throw new NotImplementedException();
        }

        public int Insert(Department entity)
        {
            throw new NotImplementedException();
        }

        public int Update(Department entity)
        {
            throw new NotImplementedException();
        }
    }
}

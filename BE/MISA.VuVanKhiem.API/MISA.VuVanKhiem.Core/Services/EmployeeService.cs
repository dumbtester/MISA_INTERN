using MISA.VuVanKhiem.Core.DTOs;
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
        public EmployeeService(IEmployeeRepository employeeRespository)
        {
            _employeeRepository = employeeRespository;
        }


        public MessageResponse InsertService(Employee entity)
        {
            var isDuplicate = _employeeRepository.CheckCodeDuplicate(entity.EmployeeCode);
            if (isDuplicate)
            {
                var mess = new MessageResponse
                {
                    Success = false,
                    StatusCode = 400
                };
                mess.Errors.Add("Mã nhân viên đã tồn tại");
                return mess;

            }
            entity.EmployeeId = Guid.NewGuid();
            var res = _employeeRepository.Insert(entity);
            return new MessageResponse
            {
                Success = true,
                StatusCode = 200
            };
        }

        public MessageResponse UpdateService(Employee entity)
        {
            var res = _employeeRepository.Update(entity);
            return new MessageResponse
            {
                Success = true,
                StatusCode = 200
            };
        }
    }
}

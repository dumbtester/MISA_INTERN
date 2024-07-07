// Sample data for employees
const employees = [
    {
        code: 'EMP001',
        name: 'Phạm Văn A',
        gender: 'Nam',
        dob: '02/02/2002',
        email: '123@gmail.com',
        address: 'Hà Đông, Hà Nội',
    },
    {
        code: 'EMP002',
        name: 'Nguyễn Thị B',
        gender: 'Nữ',
        dob: '05/05/1995',
        email: 'nguyenb@gmail.com',
        address: 'Cầu Giấy, Hà Nội',
    },
    {
        code: 'EMP003',
        name: 'Trần Văn C',
        gender: 'Nam',
        dob: '12/12/1990',
        email: 'tranc@gmail.com',
        address: 'Bắc Từ Liêm, Hà Nội',
    },
    {
        code: 'EMP004',
        name: 'Lê Thị D',
        gender: 'Nữ',
        dob: '08/08/1988',
        email: 'led@gmail.com',
        address: 'Nam Từ Liêm, Hà Nội',
    },
    {
        code: 'EMP005',
        name: 'Hoàng Văn E',
        gender: 'Nam',
        dob: '03/03/1985',
        email: 'hoange@gmail.com',
        address: 'Thanh Xuân, Hà Nội',
    },
    {
        code: 'EMP006',
        name: 'Đỗ Thị F',
        gender: 'Nữ',
        dob: '09/09/1992',
        email: 'dotf@gmail.com',
        address: 'Đống Đa, Hà Nội',
    },
    {
        code: 'EMP007',
        name: 'Phan Văn G',
        gender: 'Nam',
        dob: '11/11/1989',
        email: 'phang@gmail.com',
        address: 'Hai Bà Trưng, Hà Nội',
    },

];
openToggle();

function openToggle() {
    slideBar.classList.add('expanded');
}


// Modal Handling
function openModal() {
    document.getElementById('employeeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

function handleSubmit(event) {
    event.preventDefault();

    const employees = {
        code: document.getElementById('employeeCode').value,
        name: document.getElementById('employeeName').value,
        position: document.getElementById('employeePosition').value,
        department: document.getElementById('employeeDepartment').value,
        dob: document.getElementById('employeeDob').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        id: document.getElementById('employeeId').value,
        idDate: document.getElementById('employeeIdDate').value,
        issued: document.getElementById('employeeIssued').value,
        address: document.getElementById('employeeAddress').value,
        phone: document.getElementById('employeePhone').value,
        tel: document.getElementById('employeeTel').value,
        email: document.getElementById('employeeEmail').value,
        bankAccountNumber: document.getElementById('employeeBankAccountNumber').value,
        bankAccountName: document.getElementById('employeeBankAccountName').value,
        branch: document.getElementById('employeeBranch').value,
    };

    console.log(employees);

    // Thêm logic lưu dữ liệu nhân viên vào đây
    // ...

    // Sau khi lưu dữ liệu, đóng modal và xóa dữ liệu
    closeModal();
    document.getElementById('employeeForm').reset();
}


// Function to render the employee table
function renderTable() {
    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.code}</td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.email}</td>
            <td class="address">
                ${employee.address}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to open modal
function openModal(employeeIndex = null) {
    document.getElementById('employeeModal').style.display = 'flex';
    if (employeeIndex !== null) {
        const employee = employees[employeeIndex];
        document.getElementById('employeeId').value = employeeIndex;
        document.getElementById('employeeName').value = employee.name;
        // Set other form fields accordingly
    }
}


// Initialize the table
renderTable();

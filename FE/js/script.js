let currentPage = 1;
let rowsPerPage = 10;
let employees = [];
let currentDeleteId;
let currentEditId;
let totalPages;

// Hàm để tính toán số trang
function calculateTotalPages() {
    totalPages = Math.ceil(employees.length / rowsPerPage);
    // Giới hạn hiển thị tối đa 3 trang
    if (totalPages > 3) {
        totalPages = 3;
    }
}


// Hàm để cập nhật nút phân trang
function updatePaginationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Hàm để xử lý khi chọn giá trị từ select option
function handleSelectOption() {
    const selectOption = document.getElementById('recordsPerPage');
    const selectedValue = parseInt(selectOption.value);

    if (selectedValue === 1) {
        currentPage = 1;
    } else if (selectedValue === 2) {
        currentPage = 2;
    } else if (selectedValue === 3) {
        currentPage = 3;
    }

    renderTable();
}

// Xử lý Modal
function openModal() {
    document.getElementById("employeeModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("employeeModal").style.display = "none";
}

// Hàm để hiển thị bảng nhân viên
function renderTable() {
    const tableBody = document.querySelector("#employeeTableBody");
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = employees.slice(start, end);

    let i = start + 1;
    for (const item of paginatedItems) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${i++}</td>
                        <td>${item.employeeCode}</td>
                        <td>${item.fullName}</td>
                        <td>${item.gender == 1 ? "Nam" : "Nữ" ?? ""}</td>
                        <td>${item.dateOfBirth?.substring(0, 10) ?? ""}</td>
                        <td>${item.email ?? ""}</td>
                        <td style="position: relative;">
                            ${item.address ?? ""}
                            <div>
                                <button data-id="${item.employeeId}" class="button-edit"><img src="../assets/icon/close-48.png" alt=""></button>
                                <button data-id="${item.employeeId}" class="button-delete"><img src="../assets/icon/delete-48.png" alt=""></button>
                            </div>
                        </td>`;
        tableBody.appendChild(tr);
    }

    updatePaginationButtons();
    addDeleteButtonEvents();
    addEditButtonEvents();
}



// Hàm để chuyển đến trang trước
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

// Hàm để chuyển đến trang sau
function nextPage() {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
        currentPage++;
        renderTable();
    }
}



// Hàm để lấy dữ liệu nhân viên từ API
function fetchEmployees() {
    try {
        fetch(`https://localhost:7192/api/v1/Employees`)
            .then((res) => res.json())
            .then((data) => {
                employees = data;
                document.getElementById("totalRecords").innerText = employees.length;
                totalPages = employees.length % 10 == 0 ? employees.length / 10 : employees.length / 10 + 1;
                renderTable();
            });
    } catch (error) {
        console.error(error);
    }
}

function addEditButtonEvents() {
    let buttons = document.querySelectorAll(".utton-edit");
    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            currentEditId = button.getAttribute('data-id');
        });
    }
}

// Hàm để thêm sự kiện cho các nút xóa
function addDeleteButtonEvents() {
    let buttons = document.querySelectorAll(".button-delete");
    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            let employeeRow = event.target.closest('tr');
            let employeeCode = employeeRow.querySelector('td:nth-child(2)').textContent;

            let popup = document.querySelector("#popup");
            popup.querySelector(".popup-header").firstElementChild.innerHTML = "Bạn muốn xóa?";
            popup.querySelector(".popup-body").innerHTML = `<p>Bạn có chắc chắn muốn xóa nhân viên có mã ${employeeCode}?</p>`;
            popup.style.display = "block";
            currentDeleteId = button.getAttribute('data-id');
            console.log(`Current ID set to: ${currentDeleteId}`);

            document.querySelector('.close-popup-btn').onclick = function () {
                deleteEmployee(currentDeleteId);
                popup.style.display = 'none';
            };
        });
    }
}

function loadOpenEmployee() {
    try{
        resetForm();
        console.log("oaiwjfoiwjgoijrg")
        debugger;
        if (currentEditId === "0") {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };
    
            fetch("https://localhost:7192/api/v1/Employees/CreteEmp/NewCode", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    debugger;
                    openModal();
                    document.getElementById("employeeCode").value = result;
    
                })
                .catch((error) => console.error(error));
        } else{

        }
    } catch(error){
        console.error(error);
    }
}

function getPositios(){
    try{
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("https://localhost:7192/api/v1/Positions", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let Positions = document.getElementById("employeePosition");
                Positions.innerHTML = "";
                let options = ``;
                for (const position of result) {
                    options += `<option value="${position.positionId}">${position.positionName}</option>`;
                }
                Positions.innerHTML = options;
            })
            .catch((error) => console.error(error));
    }catch(error){
        console.error(error);
    }
}

function getDepartments(){
    try{
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch("https://localhost:7192/api/v1/Departments", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let departments = document.getElementById("employeeDepartment");
                departments.innerHTML = "";
                let options = ``;
                for (const department of result) {
                    options += `<option value="${department.departmentId}">${department.departmentName}</option>`;
                }
                departments.innerHTML = options;
            })
            .catch((error) => console.error(error));
    }catch(error){
        console.error(error);
    }
}

// Hàm để xóa một nhân viên
function deleteEmployee(employeeCode) {
    console.log('Deleting employee with code:', employeeCode);

    // Kiểm tra employeeCode trước khi gọi API
    if (!employeeCode) {
        console.error('Employee code is invalid:', employeeCode);
        alert('Mã nhân viên không hợp lệ');
        return;
    }

    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch(`https://localhost:7192/api/v1/Employees/${currentDeleteId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            debugger;
            if (result.success) {
                alert("Xóa thành công!")
                fetchEmployees();
            }
        })
        .catch((error) => console.error(error));
}


// Thông báo cho popup xóa
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.querySelector('.close-popup-btn').onclick = null;
});

// Hàm để làm mới bảng nhân viên
function refreshTable() {
    currentPage = 1;
    employees = [];
    renderTable();
    fetchEmployees();
}

// Sự kiện cho nút làm mới
document.getElementById("refreshBtn").addEventListener("click", refreshTable);

// Hàm tìm kiếm nhân viên
function searchEmployees() {
    const searchInput = document.querySelector('.search-input').value.toLowerCase();
    const rows = document.querySelectorAll("#employeeTableBody tr");

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

    updateTotalRecords();
}

// hàm gọi đến insert hoặc update
function resetForm() {
    document.getElementById("employeeCode").value = "";
    document.getElementById("employeeName").value = "";
    document.getElementById("employeeDob").value = "";

    // Kiểm tra và bỏ chọn radio button
    var genderChecked = document.querySelector('input[name="gender"]:checked');
    if (genderChecked) {
        genderChecked.checked = false;
    }

    document.getElementById("employeeId").value = "";
    document.getElementById("employeeIdDate").value = "";
    document.getElementById("employeeIssued").value = "";
    document.getElementById("employeeAddress").value = "";
    document.getElementById("employeePhone").value = "";
    document.getElementById("employeeTel").value = "";
    document.getElementById("employeeEmail").value = "";
    document.getElementById("employeeBankAccountNumber").value = "";
    document.getElementById("employeeBankAccountName").value = "";
    document.getElementById("employeeBranch").value = "";
}

// Hàm xuất bảng ra CSV
function exportTableToCSV(filename) {
    let csv = [];
    let headers = ["STT", "EmployeeCode", "FullName", "Gender", "DateOfBirth", "Email", "Address"];
    csv.push(headers.join(","));

    for (let i = 0; i < employees.length; i++) {
        let employee = employees[i];
        let row = [
            i + 1,
            employee.EmployeeCode,
            employee.FullName,
            employee.Gender == 1 ? "Nam" : "Nữ",
            employee.DateOfBirth?.substring(0, 10),
            employee.Email,
            employee.Address
        ];
        csv.push(row.join(","));
    }

    let csvContent = "\uFEFF" + csv.join("\n");

    let csvFile;
    let downloadLink;

    csvFile = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

// Thêm sự kiện cho nút xuất CSV
document.getElementById("exportBtn").addEventListener("click", function () {
    exportTableToCSV('employees.csv');
});

// Hàm để cập nhật số bản ghi hiển thị
function updateTotalRecords() {
    const visibleRows = document.querySelectorAll("#employeeTableBody tr:not([style*='display: none'])").length;
    document.getElementById("totalRecords").innerText = visibleRows;
}

// Thêm sự kiện cho ô tìm kiếm
document.querySelector('.search-input').addEventListener('input', searchEmployees);

document.querySelector('#btn_add').addEventListener('click', function () {
    currentEditId = "0";
    loadOpenEmployee();
});

// Khởi tạo bảng
fetchEmployees();
getPositios();
getDepartments();

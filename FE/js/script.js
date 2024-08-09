// Biến toàn cục
let currentPage = 1;
let rowsPerPage = 10;
let employees = [];
let currentDeleteId;
let currentEditId;
let totalPages;

/**
 * Cập nhật trạng thái của các nút phân trang
 */
function updatePaginationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

/**
 * Xử lý sự kiện khi người dùng chọn số bản ghi hiển thị trên một trang
 */
function handleSelectOption() {
    const selectOption = document.getElementById('recordsPerPage');
    const selectedValue = parseInt(selectOption.value);

    currentPage = selectedValue;

    renderTable();
}

/**
 * Hiển thị modal
 */
function openModal() {
    document.getElementById("employeeModal").style.display = "flex";
}

/**
 * Đóng modal
 */
function closeModal() {
    document.getElementById("employeeModal").style.display = "none";
}

/**
 * Hiển thị bảng nhân viên
 */
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
                                <button data-id="${item.employeeId}" class="button-edit"><img src="../assets/icon/option.png" alt=""></button>
                                <button data-id="${item.employeeId}" class="button-delete"><img src="../assets/icon/delete-48.png" alt=""></button>
                            </div>
                        </td>`;
        tableBody.appendChild(tr);
    }

    updatePaginationButtons();
    addDeleteButtonEvents();
    addEditButtonEvents();
}

/**
 * Chuyển đến trang trước
 */
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
        document.getElementById("recordsPerPage").value = currentPage;
    }
}

/**
 * Chuyển đến trang tiếp theo
 */
function nextPage() {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
        currentPage++;
        renderTable();
        document.getElementById("recordsPerPage").value = currentPage;
    }
}

/**
 * Lấy dữ liệu nhân viên từ API
 */
function fetchEmployees() {
    try {
        fetch(`https://localhost:7192/api/v1/Employees`)
            .then((res) => res.json())
            .then((data) => {
                employees = data;
                document.getElementById("totalRecords").innerText = employees.length;
                totalPages = employees.length % rowsPerPage == 0 ? employees.length / rowsPerPage : Math.floor(employees.length / rowsPerPage) + 1;
                renderOptions();
                renderTable();
            });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Hiển thị các tùy chọn số trang
 */
function renderOptions() {
    let select = document.getElementById("recordsPerPage");
    let options = ``;
    for (let i = 1; i <= totalPages; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    select.innerHTML = options;
}

/**
 * Thêm sự kiện cho các nút chỉnh sửa
 */
function addEditButtonEvents() {
    let buttons = document.querySelectorAll(".button-edit");
    for (const button of buttons) {
        button.addEventListener('click', function (event) {
            currentEditId = button.getAttribute('data-id');
            loadOpenEmployee();
        });
    }
}

/**
 * Thêm sự kiện cho các nút xóa
 */
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

/**
 * Tải thông tin nhân viên để chỉnh sửa hoặc tạo mới
 */
function loadOpenEmployee() {
    try {
        resetForm();
        if (currentEditId === "0") {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch("https://localhost:7192/api/v1/Employees/CreteEmp/NewCode", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    openModal();
                    document.getElementById("employeeCode").value = result;
                })
                .catch((error) => console.error(error));
        } else {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`https://localhost:7192/api/v1/Employees/${currentEditId}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    drawData(result);
                    openModal();
                })
                .catch((error) => console.error(error));
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Hiển thị dữ liệu nhân viên lên form
 * @param {Object} employee - Đối tượng chứa thông tin nhân viên
 */
function drawData(employee) {
    document.getElementById('employeeCode').value = employee.employeeCode;
    document.getElementById('employeeName').value = employee.fullName;

    document.getElementById('employeeDob').value = employee.dateOfBirth?.split('T')[0] ?? null;
    document.getElementById('genderMale').checked = employee.gender === 0;
    document.getElementById('genderFemale').checked = employee.gender === 1;
    document.getElementById('genderOther').checked = employee.gender === 2;

    document.getElementById('identityNumber').value = employee.identityNumber ?? "";
    document.getElementById('employeeIdDate').value = employee.identityDate?.split('T')[0] ?? null;
    document.getElementById('employeeIssued').value = employee.identityPlace ?? "";
    document.getElementById('employeeAddress').value = employee.address ?? "";
    document.getElementById('employeePhone').value = employee.phoneNumber ?? "";
    document.getElementById('employeeTel').value = employee.landlineNumber ?? "";
    document.getElementById('employeeEmail').value = employee.email ?? "";
    document.getElementById('employeeBankAccountNumber').value = employee.bankAccount ?? "";

    document.getElementById('employeeBankAccountName').value = employee.bankName;
    document.getElementById('employeeBranch').value = employee.branch;
}

/**
 * Lấy danh sách vị trí công việc từ API
 */
function getPositios() {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

/**
 * Lấy danh sách phòng ban từ API
 */
function getDepartments() {
    try {
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
    } catch (error) {
        console.error(error);
    }
}

/**
 * Xóa một nhân viên
 * @param {string} employeeCode - Mã nhân viên cần xóa
 */
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
            if (result.success) {
                alert("Xóa thành công!")
                fetchEmployees();
            }
        })
        .catch((error) => console.error(error));
}

// Thêm sự kiện đóng popup xóa
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
    document.querySelector('.close-popup-btn').onclick = null;
});

/**
 * Làm mới bảng nhân viên
 */
function refreshTable() {
    currentPage = 1;
    employees = [];
    renderTable();
    fetchEmployees();
}

// Thêm sự kiện cho nút làm mới
document.getElementById("refreshBtn").addEventListener("click", refreshTable);

/**
 * Tìm kiếm nhân viên
 */
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

/**
 * Đặt lại form về trạng thái ban đầu
 */
function resetForm() {
    document.getElementById("employeeCode").value = "";
    document.getElementById("employeeName").value = "";
    document.getElementById("employeeDob").value = "";

    // Kiểm tra và bỏ chọn radio button
    var genderChecked = document.querySelector('input[name="gender"]:checked');
    if (genderChecked) {
        genderChecked.checked = false;
    }

    document.getElementById("identityNumber").value = "";
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

/**
 * Xuất bảng ra file CSV
 * @param {string} filename - Tên file CSV
 */
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

/**
 * Cập nhật số bản ghi hiển thị
 */
function updateTotalRecords() {
    const visibleRows = document.querySelectorAll("#employeeTableBody tr:not([style*='display: none'])").length;
    document.getElementById("totalRecords").innerText = visibleRows;
}

/**
 * Lấy dữ liệu từ form
 * @returns {Object} Dữ liệu từ form
 */
function getDateFromForm() {
    let form = document.getElementById("employeeForm");
    const formData = {};

    for (let element of form.elements) {
        if (element.name) {
            if (element.type === 'radio') {
                if (element.checked) {
                    formData[element.name] = element.value;
                }
            } else {
                formData[element.name] = element.value || null;
            }
        }
    }
    if (currentEditId !== "0") {
        formData["employeeId"] = currentEditId;
    }
    return formData;
}

// Thêm sự kiện cho nút xuất CSV
document.getElementById("exportBtn").addEventListener("click", function () {
    exportTableToCSV('employees.csv');
});

// Thêm sự kiện cho ô tìm kiếm
document.querySelector('.search-input').addEventListener('input', searchEmployees);

// Thêm sự kiện cho nút thêm nhân viên mới
document.querySelector('#btn_add').addEventListener('click', function () {
    currentEditId = "0";
    loadOpenEmployee();
});

// Ngăn chặn hành vi mặc định của form submit
document.getElementById("employeeForm").addEventListener('submit', function (event) {
    event.preventDefault();
})

// Xử lý sự kiện khi nhấn nút thêm/cập nhật nhân viên
document.getElementById("button-add-emp").addEventListener('click', function () {
    try {
        let form = document.getElementById("employeeForm");
        if (form.checkValidity()) {
            const formData = getDateFromForm();

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(formData);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            console.log(formData);

            if (currentEditId === "0") {
                // Thêm mới nhân viên
                fetch("https://localhost:7192/api/v1/Employees", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.success) {
                            alert("Thêm mới thành công!")
                            fetchEmployees();
                            closeModal();
                        } else {
                            alert("Lỗi thêm mới!" + result.errors[0]);
                        }
                    })
                    .catch((error) => console.error(error));
            } else {
                // Cập nhật thông tin nhân viên
                fetch("https://localhost:7192/api/v1/Employees/Update", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.success) {
                            alert("Cập nhật thành công!")
                            fetchEmployees();
                            closeModal();
                        } else {
                            alert("Lỗi cập nhật!" + result.errors[0]);
                        }
                    })
                    .catch((error) => console.error(error));
            }
        }
    } catch (error) {
        console.error(error);
    }
});

// Khởi tạo ứng dụng
fetchEmployees();
getPositios();
getDepartments();
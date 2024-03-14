 $(document).ready(function(){
    employeeList();
});

function employeeList() {
    $.ajax({
        type: 'get',
        url: "employee-list.php",
        success: function (data) {
            var response;
            try {
                response = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                // Handle parsing error, such as displaying an error message
                return; // Exit the function if parsing fails
            }
            
            var tr = '';
            for (var i = 0; i < response.length; i++) {
                var id = response[i].id;
                var name = response[i].name;
                var email = response[i].email;
                var phone = response[i].phone;
                var address = response[i].address;
                tr += '<tr>';
                tr += '<td>' + id + '</td>';
                tr += '<td>' + name + '</td>';
                tr += '<td>' + email + '</td>';
                tr += '<td>' + phone + '</td>';
                tr += '<td>' + address + '</td>';
                tr += '<td><div class="d-flex">';
                tr += '<a href="#viewEmployeeModal" class="m-1 view" data-toggle="modal" onclick="viewEmployeeModel(' + id + ')"><i class="fa" data-toggle="tooltip" title="View">&#xf06e;</i></a>';
                tr += '<a href="#editEmployeeModal" class="m-1 edit" data-toggle="modal" onclick="viewEmployee(' + id + ')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>';
                tr += '<a href="#deleteEmployeeModal" class="m-1 delete" data-toggle="modal" onclick="setDeleteEmployeeId(' + id + ')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';
                tr += '</div></td>';
                tr += '</tr>';
            }
            $('.loading').hide();
            $('#employee_data').html(tr);
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', error);
            // Handle AJAX error, such as displaying an error message
        }
    });
}


function addEmployee() {
    var name = $('#add_employee_name').val();
    var email = $('#add_employee_email').val();
    var phone = $('#add_employee_phone').val();
    var address = $('#add_employee_address').val();

    $.ajax({
        type: 'post',
        data: {name: name, email: email, phone: phone, address: address},
        url: "employee-add.php",
        success: function (data) {
            var response = JSON.parse(data);
            console.log("Employee added successfully:", response);
            $('#addEmployeeModal').modal('hide');
            employeeList();
            alert(response.message);
        },
        error: function(xhr, status, error) {
            console.error("Error occurred while adding employee:", xhr.responseText);
            alert('Error occurred while adding employee. Please try again.');
        }
    });
}


function editEmployee() {
    var name = $('#edit_employee_name').val();
    var email = $('#edit_employee_email').val();
    var phone = $('#edit_employee_phone').val();
    var address = $('#edit_employee_address').val();
    var employee_id = $('#edit_employee_employee_id').val();

    $.ajax({
        type: 'post',
        data: {name: name, email: email, phone: phone, address: address, employee_id: employee_id},
        url: "employee-edit.php",
        success: function (data) {
            var response = JSON.parse(data);
            $('#editEmployeeModal').modal('hide');
            employeeList();
            alert(response.message);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert('Error occurred while editing employee. Please try again.');
        }
    });
}

function viewEmployee(id) {
    $.ajax({
        type: 'get',
        data: {id: id},
        url: "employee-view.php",
        success: function (data) {
            var response = JSON.parse(data);
            $('#editEmployeeModal #edit_employee_name').val(response.name);
            $('#editEmployeeModal #edit_employee_email').val(response.email);
            $('#editEmployeeModal #edit_employee_phone').val(response.phone);
            $('#editEmployeeModal #edit_employee_address').val(response.address);
            $('#editEmployeeModal #edit_employee_employee_id').val(response.id);
        }
    });
}


function viewEmployeeModel(id) {
    $.ajax({
        type: 'get',
        data: {id: id},
        url: "employee-view.php",
        success: function (data) {
            var response = JSON.parse(data);
            console.log(response);
            $('#viewEmployeeModal #view_employee_name').val(response.name);
            $('#viewEmployeeModal #view_employee_email').val(response.email);
            $('#viewEmployeeModal #view_employee_phone').val(response.phone);
            $('#viewEmployeeModal #view_employee_address').val(response.address);
        }
    });
}

function setDeleteEmployeeId(id) {
    $('#delete_id').val(id);
}

function deleteEmployee() {
    var employeeId = $('#delete_id').val();
    $('#deleteEmployeeModal').modal('hide');
    $.ajax({
        type: 'get',
        data: {id: employeeId},
        url: "employee-delete.php",
        success: function (data) {
            var response = JSON.parse(data);
            employeeList();
            alert(response.message);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert('Error occurred while deleting employee. Please try again.');
        }
    });
}
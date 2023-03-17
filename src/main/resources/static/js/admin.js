const url = 'http://localhost:8080/api/v1/admin';
const renderTable = document.getElementById("allUsersTable");
const addForm = document.getElementById("add-form");

const renderPosts = (users) => {
    let temp = '';
    users.forEach((user) => {
        temp += `<tr>
                                <td>${user.id}</td>
                                <td id=${'firstName' + user.id}>${user.firstName}</td>
                                <td id=${'lastName' + user.id}>${user.lastName}</td>
                                <td id=${'age' + user.id}>${user.age}</td>
                                <td id=${'username' + user.id}>${user.username}</td>
                                <td id=${'role' + user.id}>${user.roles.map(role => role.name).join(' ')}</td>
                                <td>
                                <button class="btn btn-info" type="button"
                                data-bs-toggle="modal" data-bs-target="#modalEdit"
                                onclick="editModal(${user.id})">Edit</button></td>
                                <td>
                                <button class="btn btn-danger" type="button"
                                data-bs-toggle="modal" data-bs-target="#modalDelete"
                                onclick="deleteModal(${user.id})">Delete</button></td>
                                </tr>
                                `
    })
    renderTable.innerHTML = temp;
}

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderPosts(data)
        })
}

getAllUsers()

// Добавление пользователя

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstNameValue = document.getElementById("newUserFirstName").value;
    let lastNameValue = document.getElementById("newUserLastName").value;
    let ageValue = document.getElementById("newUserAge").value;
    let emailValue = document.getElementById("newUserEmail").value;
    let passwordValue = document.getElementById("newUserPassword").value;
    let roles = getRoles(Array.from(document.getElementById("newUserRoles").selectedOptions).map(role => role.value));
    let newUser = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        age: ageValue,
        username: emailValue,
        password: passwordValue,
        roles: roles
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(newUser)
    }).then(data => {
        const dataArr = [];
        dataArr.push(data);
        getAllUsers(data);
    }).then(() => {
        document.getElementById("users-table-tab").click();
    })
})


function getRoles(rols) {
    let roles = [];
    if (rols.indexOf("ADMIN") >= 0) {
        roles.push({
            "id": 1,
            "name": "ROLE_ADMIN",
            "users": null,
            "authority": "ROLE_ADMIN"
        });
    }
    if (rols.indexOf("USER") >= 0) {
        roles.push({
            "id": 2,
            "name": "ROLE_USER",
            "users": null,
            "authority": "ROLE_USER"
        });
    }
    return roles;
}


// Delete
function deleteModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('idDeleteUser').value = user.id;
            document.getElementById('deleteUserFirstName').value = user.firstName;
            document.getElementById('deleteUserLastName').value = user.lastName;
            document.getElementById('deleteUserAge').value = user.age;
            document.getElementById('deleteUserEmail').value = user.username;
        })
    });
}

async function deleteUser() {
    console.log(document.getElementById('idDeleteUser').value)
    await fetch(url + '/' + document.getElementById('idDeleteUser').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(document.getElementById('idDeleteUser').value)
    })

    getAllUsers()
    document.getElementById("deleteFormCloseButton").click();
}

// Edit
function editModal(id) {
    fetch(url + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {

            document.getElementById('idEditUser').value = user.id;
            document.getElementById('editUserFirstName').value = user.firstName;
            document.getElementById('editUserLastName').value = user.lastName;
            document.getElementById('editUserAge').value = user.age;
            document.getElementById('editUserEmail').value = user.username;
            document.getElementById('editUserPassword').value = user.password;

        })
    });
}

async function editUser() {
    let idValue = document.getElementById("idEditUser").value;
    let firstNameValue = document.getElementById("newUserFirstName").value;
    let lastNameValue = document.getElementById("newUserLastName").value;
    let ageValue = document.getElementById("newUserAge").value;
    let emailValue = document.getElementById("editUserEmail").value;
    let passwordValue = document.getElementById("editUserPassword").value;
    let roles = getRoles(Array.from(document.getElementById("editUserRoles").selectedOptions).map(role => role.value));

    let user = {
        id: idValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        age: ageValue,
        username: emailValue,
        password: passwordValue,
        roles: roles

    }

    await fetch(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });
    getAllUsers()
    document.getElementById("editFormCloseButton").click();
}

//User
const tableForUser = document.getElementById("tableForUser");
const urlAuth = 'http://localhost:8080/api/v1/admin/authentication';
const panel = document.getElementById("admin-panel1");

function userAuthInfo() {
    fetch(urlAuth)
        .then((res) => res.json())
        .then((user) => {
            let temp = '';
            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
             <td>${user.username}</td>
            <td>${user.roles.map(role => role.name).join(' ')}</td> 
            </tr>`;
            tableForUser.innerHTML = temp;
        });
}

userAuthInfo()

function userPanel() {
    fetch(urlAuth)
        .then((res) => res.json())
        .then((user) => {
            panel.innerHTML = `<h5>${user.username} with roles: ${u.roles.map(role => role.name).join(' ')}</h5>`
        });
}

userPanel()
const data = document.getElementById("data-user");
const url = "http://localhost:8080/api/v1/user";
const panel = document.getElementById("user-panel1");


function loggedInUserInfo() {
    fetch(url)
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
            data.innerHTML = temp;
            panel.innerHTML = `<h5>${user.username} with roles: ${user.roles.map(role => role.name).join(' ')}</h5>`
        });
}

loggedInUserInfo()
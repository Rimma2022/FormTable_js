let users = [
    {
        'id': '1',
        'login': 'user1',
        'password': 12345,
        'fio': 'Иванов Иван Иванович',
        'role': 'читатель'
    },
    { 'id': '2', 'login': 'user2', 'password': 98765, 'fio': 'Петров Иван Иванович', 'role': 'писатель' },
    { 'id': '3', 'login': 'user3', 'password': 76529, 'fio': 'Семенов Иван Иванович', 'role': 'админ' }
];

let roles = ['читатель', 'писатель', 'админ'];

init();
addListenerForDeleteButtons();
getMaxId();

function getMaxId() {
    let maxId = 0;
    for (let index = 0; index < users.length; index++) {
        if (maxId < users[index].id) {
            maxId = users[index].id;
        }
    }
    console.log("maxId " + maxId);
    return maxId;
}

function init() {

    let userRoleList = document.querySelector('#user__role');
    for (let index = 0; index < roles.length; index++) {
        let option = document.createElement('option');
        option.text = roles[index];
        option.value = roles[index];
        userRoleList.add(option);
    }

    for (let index = 0; index < users.length; index++) {
        let user_obj = users[index];
        addRow(user_obj);
    }

};

function addRow(obj) {
    let row = `<tr class="tr-${obj.id}">
    <td>${obj.login}</td>
    <td>${obj.password}</td>
    <td>${obj.fio}</td>
    <td>${obj.role}</td>
    <td>
        <button class="button__delete" id="button__${obj.id}" data-userid="${obj.id}">Delete</button>
        <button class="button__update" id="button__update__${obj.id}" data-userid="${obj.id}" onclick="update('${obj.id}')">Update</button>
    </td>
    </tr>`;
    let tbody = document.querySelector('.table__users');
    tbody.innerHTML = tbody.innerHTML + row;
    //$('.table__users').append(row);

};

function update(userid) {
    let user = getUserById(userid);
    let button = document.getElementById(`button__update__${user.id}`);
    if (button.innerText == "Update") {
        //написать и вызвать функцию, которая по userid возвращает обеъкт из массива users
        document.getElementById("user__id").value = user.login;
        document.getElementById("user__pass").value = user.password;
        document.getElementById("fio").value = user.fio;
        document.getElementById("user__role").value = user.role;
        buttonButton();
        button.innerText = "Save";
    } else if (button.innerText == "Save") {
        user.login = document.getElementById("user__id").value;
        user.password = document.getElementById("user__pass").value;
        user.fio = document.getElementById("fio").value;
        user.role = document.getElementById("user__role").value;        
        buttonButton();
        // button.innerText = "Update";        
        let bod =  document.querySelector("tbody");
        bod.innerHTML = " ";
        clear();
        init();
    }
};

function buttonButton(){
    let allbutton = document.getElementsByClassName("button__update");
    for (let index = 0; index < allbutton.length; index++) {
        allbutton[index].innerText = "Update";        
    }
}
function createUser() {
    let login = document.getElementById('user__id');   
    //  login.remove();
    let userPass = document.getElementsByName('user__pass')[0];
    let fio = document.querySelector('#fio');
    let role = document.querySelector("#user__role");
    let newUser = new Object();
    let maxI = getMaxId();
    newUser.id = parseInt(maxI) + 1;
    newUser.login = login.value;
    newUser.password = userPass.value;
    newUser.fio = fio.value;
    newUser.role = role.value;
    users.push(newUser);    
    return newUser;
}

function getUserById(userid) {
    for (let index = 0; index < users.length; index++) {
        let user = users[index];
        if (user.id == userid) {
            return user;
        }
    }
};

function addListenerForDeleteButtons() {
    let arrButtonsDelete = document.querySelectorAll('.button__delete');
    for (let index = 0; index < arrButtonsDelete.length; index++) {
        arrButtonsDelete[index].onclick = function (e) {
            let userId = e.target.dataset.userid; // 1 2 3
            let rowForDelete = document.querySelector(`.tr-${userId}`);
            rowForDelete.remove();
        }
    }
};

function addNewUser() {
    let newUser = createUser();
    addRow(newUser);
    // let newButtonDelete = document.querySelector(`#button__${newUser.id}`);
    // newButtonDelete.onclick = function(e) {
    //     let rowForDelete = document.querySelector(`.tr-${newUser.id}`);
    //     rowForDelete.remove();
    // }; 
    clear();
    addListenerForDeleteButtons();
};

function clear() {
    document.getElementById("user__form").reset();
    // document.querySelector("#user__id").value="";
    // document.querySelector("#user__pass").value="";
    // document.querySelector("#fio").value="";
};
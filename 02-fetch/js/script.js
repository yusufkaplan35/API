import {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
} from "./api.js";
const loader = document.getElementById("loader");
const listUsers = document.getElementById("listUsers");
const txtFirstName = document.getElementById("txtFirstName");
const txtLastName = document.getElementById("txtLastName");
const txtEmail = document.getElementById("txtEmail");
const frmUser = document.getElementById("frmUser");
const btnSubmit = document.getElementById("btnSubmit");
const fillUserList = async () => {
    try {
        const users = await getUsers();
        users.reverse();
        let strUsers = "";
        users.forEach((item) => {
            strUsers += `
            <div class="col">
                <div class="card car-card h-100 user-card" data-id="${item.id}" style="cursor:pointer">
                    <img class="card-img-top" src="${item.avatar}" alt="Title" />
                    <span class="position-absolute end-0 p-2 shadow btn-delete">❎</span>
                    <div class="card-body">
                        <h4 class="card-title">${item.firstName} ${item.lastName}</h4>
                    </div>
                </div>
            </div>`;
        });
        listUsers.innerHTML = strUsers;
        loader.classList.add("d-none");
    } catch (err) {
        console.log(err);
    }
};
const fillUser = async (id) => {
    try {
        const user = await getUserById(id);
        const { firstName, lastName, email } = user;
        txtFirstName.value = firstName;
        txtLastName.value = lastName;
        txtEmail.value = email;
    } catch (err) {
        console.log(err);
    }
};
const addUser = async () => {
    const firstName = txtFirstName.value;
    const lastName = txtLastName.value;
    const email = txtEmail.value;
    if (!firstName || !lastName || !email) {
        alert("Please fill all the fileds");
        return;
    }
    const user = {
        firstName,
        lastName,
        email,
    };
    await createUser(user);
    await fillUserList();
    resetForm()
};
const saveUser = async (id) => {
    const firstName = txtFirstName.value;
    const lastName = txtLastName.value;
    const email = txtEmail.value;
    if (!firstName || !lastName || !email) {
        alert("Please fill all the fileds");
        return;
    }
    const user = {
        id,
        firstName,
        lastName,
        email,
    };
    await updateUser(user);
    await fillUserList();
    resetForm()
    
};
const removeUser = async (id) => {
    const result = confirm("Are you sure to delet?");
    if (!result) return;
    await deleteUser(id);
    await fillUserList();
};
const resetForm = () => { 
    frmUser.dataset.method = "add";
    frmUser.dataset.id = "";
    btnSubmit.textContent = "Create";
    frmUser.reset();
 }
frmUser.addEventListener("submit", (e) => {
    e.preventDefault(); // event in default davranisini iptal eder
    const method = e.target.dataset.method;
    const id = e.target.dataset.id;
    if (method === "add") {
        addUser();
    } else {
        saveUser(id);
    }
});
listUsers.addEventListener("click", (e) => {
    const userCard = e.target.closest(".user-card");
    if (!userCard) return;
    const userId = userCard.dataset.id;
    if (e.target.classList.contains("btn-delete")) {
        removeUser(userId);
    } else {
        fillUser(userId);
        frmUser.dataset.method = "update";
        frmUser.dataset.id = userId;
        btnSubmit.textContent = "Update";
        window.scrollTo(0, 0);
    }
});
/// Initialize
fillUserList();
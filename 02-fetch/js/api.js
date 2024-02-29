const API_BASE_URL = "https://65de2e56dccfcd562f5675f7.mockapi.io/api/v1";
// CRUD
const getUsers = async () => {
    const res = await fetch(`${API_BASE_URL}/users`);
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    return data;
};
const getUserById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    return data;
};
const createUser = async (user) => {
    const res = await fetch(`${API_BASE_URL}/users`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    return data;
};
const updateUser = async (user) => {
    const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "put",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    return data;
};
const deleteUser = async (id) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "delete",
    });
    if (!res.ok) throw new Error("Something went wrong");
    const data = await res.json();
    return data;
};
export { getUsers, getUserById, createUser, updateUser, deleteUser };
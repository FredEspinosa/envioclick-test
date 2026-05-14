// Crear cache service para no hacer llamadas innesesarias usando el LS

export const saveUsersCache = (users) => {
    localStorage.setItem("users", JSON.stringify(users));   // Convertimos el objeto a string
}

export const getUsersCache = () => {
    const users = localStorage.getItem("users");

    return users ? JSON.parse(users ) : null; // Convertimos el string a objeto si es que existe
}
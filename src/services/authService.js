export const login = () => {
    // Función para guardar sesión del usuario
    localStorage.setItem("isAuth", "true");
}

export const logout = () => {
    // Función para eliminar/cerrar sesion de usuario
    localStorage.removeItem("isAuth");
    localStorage.clear()
}

export const isAuthenticated = () => {
    // Función para verificar si existe sesión iniciada
    return localStorage.getItem("isAuth") === "true";
}
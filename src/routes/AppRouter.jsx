import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Users from '../pages/Users'
import UserDetail from '../pages/UserDetail'
import ProtectedRoute from './ProtectedRoute'

const AppRouter = () => {
    /*  Importando el react router dom, vamos a determinar las rutas que necesitamos para navegar dentro de la aplicación
        Para este caso será un sistema de ruteo base y ademas haremos una ruta dinamica extrayendo el id de la peticion 
        para poder evitar el recargar páginas */
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/users" 
                    element={
                        <ProtectedRoute >
                            <Users />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/users/:id" 
                    element={
                        <ProtectedRoute >
                            <UserDetail />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
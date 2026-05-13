import React from 'react'
import { isAuthenticated } from '../services/authService'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    // En una variable guardamos el resultado de la funcion de isAuthenticated, si el resultado es diferente no permitimos navegar
    const authenticated = isAuthenticated()

    if (!authenticated) {
        return <Navigate to="/" />;
    }
    
  return children
}

export default ProtectedRoute
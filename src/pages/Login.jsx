import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({  // Asignamos valores iniciales en un objeto
        username:"",
        password:"",
    })

    const [errorMessage, setErrorMessage] = useState(false)

    const handleChange = (e) => {
        // Función para capturar en tiempo real el valor del input dependiendo del name
        setForm({
            ...form, // Hacemos una copia del valor inicial del estado
            [e.target.name]: e.target.value, // Se añade el nuevo valor al estado identificandolo por el name del input
        });     
    }

    const handleSubmit = (e) => {
        // Función para enviar la información
        e.preventDefault();
        if (form.username === "admin" && form.password === "1234") {
            login()
            navigate("/users")
        } else if (form.username !== "admin") {
            setErrorMessage(<p className='text-error'>Nombre de usuario incorrecto</p>)
        } else if (form.password !== "1234") {
            setErrorMessage(<p className='text-error'>Contraseña incorrecta</p>)
        }
        else {
            setErrorMessage(<p className='text-error'>Error de credenciales</p>)
        }
    }


  return (
    <>
        <div className='grid form-background'>
            <h1 className='title-form text-title'>Acceder a tu cuenta</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className='wrap-grid'>
                    <input
                        className='input-form' 
                        type="text" 
                        name="username"
                        placeholder="Nombre de usuario"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <input 
                        className='input-form'
                        type="password" 
                        name="password"
                        placeholder='contraseña'
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-btn-container'>
                    <button className='form-button' type="submit">Entrar</button>
                </div>
                {errorMessage}
            </form>
        </div>
    </>
  )
}

export default Login
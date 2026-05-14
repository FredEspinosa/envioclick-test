import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService';

// IMAGES
import LoginImage from '../assets/images/login-image.png'
import { FaChalkboardUser } from 'react-icons/fa6';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div className='form-background'>
        <div className='container'>
            <div className='grid form-background'>
                <Header 
                    isOptLef={false}
                    isText={false}
                    isOptRig={false}
                />
                <div className='login-cont-form'>
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className='title-form text-title'>Acceder a tu cuenta</h1>
                        <div className='wrap-grid'>
                            <div>
                                <FaChalkboardUser size={100} />
                            </div>
                            <div className='login-inputs-container '>
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
                        </div>
                        <div className='form-btn-container'>
                            <button className='form-button' type="submit">Acceder</button>
                        </div>
                        {errorMessage}
                    </form>

                </div>
                <Footer 
                    isOptLef={false}
                    isText={false}
                    isOptRig={false}
                />
            </div>
        </div>
    </div>
  )
}

export default Login
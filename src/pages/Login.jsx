import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService';

// IMAGES
import { FaChalkboardUser } from 'react-icons/fa6';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({  // Asignamos valores iniciales en un objeto
        email:"",
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
        e.preventDefault();
        const savedUser = JSON.parse(localStorage.getItem( "registeredUser" ));
        // Existe usuario registrado
        if (savedUser) {
            if ( form.email === savedUser.email && form.password === savedUser.password ) {
                login();
                navigate("/users");
                return;
            }
        }
        // Login con admin basico
        if ( form.email === "admin" && form.password === "1234" ) {
            login();
            navigate("/users");
            return;
        }

        if ( form.email !== savedUser?.email && form.email !== "admin" ) {
            setErrorMessage(
                <p className='text-error'>
                    Usuario incorrecto
                </p>
            );
            return;
        }

        if ( form.password !== savedUser?.password && form.password !== "1234" ) {
            setErrorMessage(
                <p className='text-error'>
                    Contraseña incorrecta
                </p>
            );
            return;
        }

        setErrorMessage(
            <p className='text-error'>
                Error de credenciales
            </p>
        );

    }

    const handleNavigate = () => {
        console.log("No existe tal página");
        navigate("/register")
    }


  return (
    <div className='background-gradient'>
        <div className='container'>
            <div className='grid'>
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
                                <FaChalkboardUser size={100} color='#164a99' />
                            </div>
                            <div className='login-inputs-container '>
                                <input
                                    className='input-form' 
                                    type="text" 
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={form.email}
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
                        <div className='login-btn-container'>
                            <button className='form-button' type="submit">Acceder</button>
                            <a className='login-forget-pass' onClick={handleNavigate} disabled >Regístrate</a>
                            <a className='login-forget-pass' onClick={handleNavigate} disabled >Olvidé mi contraseña</a>
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
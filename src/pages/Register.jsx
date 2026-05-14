import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { FaAddressBook, FaUser } from "react-icons/fa";

function Register() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Guardamos el usuario en LS
        localStorage.setItem( "registeredUser", JSON.stringify(form) );
        console.log( "Usuario guardado:", form );

        setShowModal(true);

        setTimeout(() => {

            navigate("/");

            setShowModal(false);

        }, 2000);

    };

    return (
        <div className='background-gradient'>
            <div className='container'>
                <div className='grid'>
                    <Header
                        isOptLef={false}
                        isText={false}
                        isOptRig={false}
                    />
                    <div className="login-cont-form">
                        <form
                            className="register-form"
                            onSubmit={handleSubmit}
                        >
                            <h1 className='title-form text-title'>Crea una cuenta</h1>
                            <div className='wrap-grid'>
                                <div>
                                    <FaAddressBook size={100} color='#164a99' />
                                </div>
                                <div className='login-inputs-container '>
                                    <input
                                        className='input-form'
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        className='input-form'
                                        type="email"
                                        name="email"
                                        placeholder="Correo"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        className='input-form'
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='login-btn-container'>
                                    <button className='form-button' type="submit">Registrarse</button>
                                </div>
                            </div>
                        </form>

                    </div>
                    <Footer
                        isOptLef={false}
                        isText={false}
                        isOptRig={false}
                    />
                </div>
            </div>
            {showModal &&
                    <Modal
                        title={<FaUser size={25} />}
                        message="Usuario creado correctamente"
                        hideButtons={true}
                    />
                }
        </div>

    );
}

export default Register;
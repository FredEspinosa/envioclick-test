import React from 'react'
import { useState } from 'react'
import { getUsers } from '../api/usersApi';
import { useEffect } from 'react';
import { getUsersCache, saveUsersCache } from '../services/cacheService';
import UserCard from '../components/UserCard';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { exportUserCSV } from '../services/csvService';
import UserTable from '../components/UserTable';

// ICONS
import { FaUser } from "react-icons/fa";
import { MdFileDownload, MdGridView } from 'react-icons/md';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { TbBrandSpeedtest } from 'react-icons/tb';
import { CiViewTable } from 'react-icons/ci';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { CgLogOut } from 'react-icons/cg';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { saveMessage } from '../services/messageService';


const Users = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [age, setAge] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalLogout, setShowModalLogout] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loadingCSV, setLoadingCSV] = useState(false);

    const [changeView, setChangeView] = useState(() => {
        const savedView = localStorage.getItem("changeView");
        return savedView ? JSON.parse(savedView) : true;
    });
    const [showFilters, setShowFilters] = useState(() => {
        const savedFilters = localStorage.getItem("showFilters");
        return savedFilters ? JSON.parse(savedFilters) : false;
    });

    const headerText = <h1 className='text-title'>Lista de usuarios <FaUser size={25} /></h1>
    const footerText = <p className='text-title text-special-white footer-text-disclaimer'>Envioclick Test <TbBrandSpeedtest size={15}/></p>
    const headerOptionRightContent = <CgLogOut size={30} onClick={() => setShowModalLogout(true)}/>

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        localStorage.setItem( "changeView", JSON.stringify(changeView) );
    }, [changeView]);

    useEffect(() => {
        localStorage.setItem("showFilters", JSON.stringify(showFilters) );
    }, [showFilters]);

    const loadUsers = async () => {
        try {
            setLoading(true)

            // Revisar Cache
            const cachedUsers = getUsersCache();

            if (cachedUsers) {
                setUsers(cachedUsers)
                setFilteredUsers(cachedUsers)
                setLoading(false)
                // console.log("data users cache", cachedUsers);
                return;
            }

            const data = await getUsers(); // Consultamos el api para guardar los datos en data
            setUsers(data);
            setFilteredUsers(data)

            //Guardar la data en cache
            saveUsersCache(data)
            // console.log("data users", data);

        } catch (error) {
            // console.log(error);
            setError("Error loading users")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //Lógica del filtrado
        let filtered = [...users];

        if (gender) {
            filtered = filtered.filter((user) => user.gender === gender);
        }

        if (nationality) {
            filtered = filtered.filter(
                (user) =>
                    user.location.country.toLowerCase().includes(nationality.toLowerCase())
            )
        }

        if (age) {
            filtered = filtered.filter((user) => user.dob.age >= Number(age));
        }

        setFilteredUsers(filtered)

    }, [gender, nationality, age, users])

    //Funión para abrir el modal
    const handleOpenModal = (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    }

    //Funciopnes callback para el modal
    const handleDeleteUser = () => {
        //Eliminar usuario
        const updateUsers = users.filter(
            (user) => user.login.uuid !== selectedUserId        // Estamos devolviendo todos los usuarios excepto el seleccionado
        );
        //Actualizamos la vieja información a la actual en donde se ocupa
        setUsers(updateUsers);
        setFilteredUsers(updateUsers);
        saveUsersCache(updateUsers);
        setShowModal(false)
    }

    const handleToggle = (name) => {
        console.log(name);
        if (name === "changeView") {
            setChangeView((prev) => !prev); // Usa el valor anterior y lo cambia
        } else {
            setShowFilters((prev) => !prev);
        }
    }

    const handleLogout = (e) => {
        // Función para salir de la aplicación
        e.preventDefault();
        logout()
        navigate("/")
    }

    const handleModalMessage = (id) => {
        setSelectedUserId(id) // Recibimos el uuid del usuario seleccionado
        setShowModalMessage(true)
    }
    
    const handleSendMessage = () => {
        console.log(filteredUsers);
        const id = selectedUserId   // Tomamos el uuid del usuario seleccionado
        if (!message.trim()) return; //Eliminamos espacios en blanco

        const updateMessages = saveMessage(id, message);
        setMessages(updateMessages);

        setMessage("");
        setShowModalMessage(false)
    }

    const handleExportCSV = async () => {
        // Función async para descarga de CSV e informar al usuario 
        try {
            setLoadingCSV(true);
            await new Promise((resolve) => setTimeout(resolve, 10000))
            exportUserCSV(filteredUsers); //Invocamos nuestra funcion de exportar con los usuarios filtrados
        } catch (error) {
            console.log(error);            
        } finally {
            setLoadingCSV(false)
        }
    }

    return (
        <div className='background-gradient'>
            <div className='container'>
                {loading ?
                    <Loader />
                    :
                    <div className='grid'>
                        <Header
                            isOptLef={true}
                            optionLeft={headerText}
                            isText={false}
                            isOptRig={true}
                            optionRight={headerOptionRightContent}
                        />
                        <div className='users-layout'>
                            <div className='title-filters-container'>
                                <h4 
                                    className='display-flex align-items-center'
                                    onClick={() => handleToggle('filters')}
                                >
                                    Filtros
                                    {
                                        showFilters
                                            ? <TiArrowSortedDown size={20} style={{ marginLeft: '5px' }} />
                                            : <TiArrowSortedUp size={20} style={{ marginLeft: '5px' }} />
                                    }
                                </h4>
                            </div>
                            {showFilters && 
                            <div className='user-filters'>
                                <Filters
                                    gender={gender}
                                    setGender={setGender}
                                    nationality={nationality}
                                    setNationality={setNationality}
                                    age={age}
                                    setAge={setAge}
                                />
                                <div className='form-btn-container no-margin'>
                                    <button
                                        className='form-button buton-icon'
                                        onClick={handleExportCSV}
                                    >
                                        <MdFileDownload style={{ marginRight: "5px" }} />
                                        Descargar CSV
                                    </button>
                                    <button
                                        className='form-button buton-icon'
                                        type="button"
                                        onClick={() => handleToggle('changeView')}
                                    >
                                        {
                                            changeView
                                                ? <MdGridView size={20} />
                                                : <CiViewTable size={20} />
                                        }
                                    </button>
                                </div>
                            </div>
                            }
                            <div className='content-scroll'>
                            {changeView ?
                                <UserTable
                                    users={filteredUsers}
                                    onDelete={handleOpenModal}
                                    handleModalMessage={handleModalMessage}
                                />
                                :
                                <div className='user-card-container'>
                                    {
                                        filteredUsers.map((user) => (
                                            <UserCard
                                                key={user.login.uuid}
                                                user={user}
                                                onDelete={handleOpenModal}
                                                handleModalMessage={handleModalMessage}
                                            />
                                        ))
                                    }
                                </div>
                            } 
                            </div>
                        </div>
                        <Footer
                            isOptLef={false}
                            isText={false}
                            isOptRig={true}
                            optionRight={footerText}
                        />
                    </div>
                }
                {showModal &&
                    <Modal
                        title="Borrar Usuario"
                        message="¿Estás seguro de borrar este usuario?"
                        onConfirm={handleDeleteUser}
                        onCancel={() => { setShowModal(false) }}
                    />
                }

                {showModalLogout &&
                    <Modal
                        title="Salir"
                        message="¿Estás seguro de salir del control de usuarios?"
                        onConfirm={handleLogout}
                        onCancel={() => { setShowModalLogout(false) }}
                    />
                }

                {showModalMessage &&
                    <Modal
                        title="Escribe algo"
                        message={<textarea
                            className='message-texbox'
                            name='message'
                            placeholder='Escribe un mensaje 🫰🏼'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            />
                        }
                        onConfirm={handleSendMessage}
                        onCancel={() => { setShowModalMessage(false) }}
                    />
                }
                {loadingCSV && 
                    <Modal
                        title="Generando CSV"
                        message={
                            <>
                                <p>Estamos procesando el archivo, por favor espera...</p>
                                <div className='align-center'>
                                    <div className='loader'></div>
                                </div>
                            </>
                        }
                        hideButtons={true}
                    />
                }
            </div>
        </div>
    )
}

export default Users
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

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [age, setAge] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const headerText = <h1 className='text-title'>Users</h1>
    const footerText = <p className='text-title'>Envioclick Test</p>

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true)

            // Revisar Cache
            const cachedUsers = getUsersCache();

            if (cachedUsers) {
                setUsers(cachedUsers)
                setFilteredUsers(cachedUsers)
                setLoading(false)
                console.log("data users cache", cachedUsers);
                return;
            }

            const data = await getUsers(); // Consultamos el api para guardar los datos en data
            setUsers(data);
            setFilteredUsers(data)

            //Guardar la data en cache
            saveUsersCache(data)

            console.log("data users", data);


        } catch (error) {
            console.log(error);
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
                    user.location.country.toLowerCase().includes(nationality.toLocaleLowerCase)
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


    return (
        <div className='container'>
            <div className='grid form-background'>
                <Footer
                    isOptLef={true}
                    optionLeft={headerText}
                    isText={false}
                    isOptRig={false}
                />
                <div className='scroll-y '>
                    <div className='form-btn-container'>
                        <button className='form-button' onClick={() => {exportUserCSV(filteredUsers)}}>Entrar</button>
                    </div>
                    <Filters
                        gender={gender}
                        setGender={setGender}
                        nationality={nationality}
                        setNationality={setNationality}
                        age={age}
                        setAge={setAge}
                    />
                    <div className='user-card-container'>
                        {
                            filteredUsers.map((user) => (
                                <UserCard
                                    key={user.login.uuid}
                                    user={user}
                                    onDelete={handleOpenModal}
                                />
                            ))
                        }
                    </div>
                </div>
                <Footer
                    isOptLef={false}
                    isText={true}
                    text={footerText}
                    isOptRig={false}
                />
            </div>
            {
                showModal && (
                    <Modal 
                        title="Borrar Usuario"
                        message="¿Estás seguro de borrar este usuario?"
                        onConfirm={handleDeleteUser}
                        onCancel={()=> {setShowModal(false)}}
                    />
                )
            }
        </div>
    )
}

export default Users
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserTable = ({
    users,   //Data
    onDelete    //Callback
}) => {

    const navigate = useNavigate();

    const handleViewDetail = (id) => {
        navigate(`/users/${id}`); // Generamos la ruta dinamica incluyendo el id de usuario de la persona que queremeo ver
    };
    
    return (
        <div className='users-table-container'>
            <table className='users-table'>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Género</th>
                        <th>Edad</th>
                        <th>Pais</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr 
                                key={user.login.uuid}
                            >
                                <td>
                                    <img
                                        src={user.picture.thumbnail}
                                        alt={user.name.first}
                                    />
                                </td>

                                <td>
                                    {user.name.first} {" "} {user.name.last}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.gender}
                                </td>
                                <td>
                                    {user.dob.age}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>

                                <td>
                                    <div className='table-actions'>
                                        <button
                                            onClick={() => handleViewDetail(user.login.uuid)}
                                        >
                                            Ver Detalles
                                        </button>

                                        <button
                                            onClick={() => onDelete(user.login.uuid)}
                                        >
                                            Borrar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable

import React from 'react'
import { useNavigate } from "react-router-dom";

const UserCard = ({
    user,   //Data
    onDelete    //Callback
}) => {

    const navigate = useNavigate();

    const handleViewDetail = () => {
        navigate(`/users/${user.login.uuid}`); // Generamos la ruta dinamica incluyendo el id de usuario de la persona que queremeo ver
    };

    return (
        <div className='user-card'>
            <img
                src={user.picture.large}
                alt={user.name.first}
            />

            <h3>{user.name.first} {user.name.last}</h3>
            <p>{user.email}</p>
            <p>{user.gender}</p>

            <div className='user-card-btn-container'>
                <button onClick={handleViewDetail}>
                    Ver detalles
                </button>
                <button onClick={() => {
                    onDelete(user.login.uuid)
                }}>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default UserCard
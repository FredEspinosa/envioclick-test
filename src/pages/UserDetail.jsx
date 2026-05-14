import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUsersCache } from '../services/cacheService';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMessages, saveMessage } from '../services/messageService';

const UserDetail = () => {

  const { id } = useParams();   //Parametros dinámicos de la url
  const navigate = useNavigate();
  const users = getUsersCache();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  //Funcion para hacer que el primer elemento coincida cuyo uiid sea igual al de la URL
  const user = users.find((user) => user.login.uuid === id);  

  useEffect(() => {
    //Obtenemos el historial guardado si existe
    const savedMessages = getMessages(id);
    setMessages(savedMessages);
  }, [id]);

  if (!user) {
    return <h1>User not found</h1>
  }

  const handleSendMessage = () => {
    if(!message.trim()) return; //Eliminamos espacios en blanco

    const updateMessages = saveMessage(id, message);
    setMessages(updateMessages);

    setMessage("");
  }

  return (
    <div className='container'>
      <div className='grid'>
        <div></div>
        <div>
          <div className="detail-container">
            <button
              className="back-button"
              onClick={() => navigate("/users")}
            >
              Regresar
            </button>

            <div className="detail-card">
              <img
                src={user.picture.large}
                alt={user.name.first}
              />
              <h1>
                {user.name.first} {user.name.last}
              </h1>
              <p>
                <strong>Email:</strong>
                {user.email}
              </p>
              <p>
                <strong>Phone:</strong>
                {user.phone}
              </p>
              <p>
                <strong>Gender:</strong>
                {user.gender}
              </p>
              <p>
                <strong>Age:</strong>
                {user.dob.age}
              </p>
              <p>
                <strong>Country:</strong>
                {user.location.country}
              </p>
            </div>

          </div>

          <div className='message-section'>
            <h2>Mensajes</h2>
            <div>
              <textarea
                placeholder='Escribe un mensaje'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className='form-btn-container'>
                <button className='form-button' onClick={handleSendMessage}>Enviar</button>
              </div>
            </div>
          </div>

          <div>
            { messages.length === 0 ? 
              (
                <p>No hay mensajes todavía 😣 </p>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className='message-card'
                  >
                    <p>{msg.text}</p>
                    <small>msg.createdAt</small>
                  </div>
                ))
              )
            }
          </div>
        </div>
        <div></div>

      </div>
        
    </div>
  )
}

export default UserDetail
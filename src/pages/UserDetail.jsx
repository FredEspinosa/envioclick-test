import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUsersCache } from '../services/cacheService';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMessages, saveMessage } from '../services/messageService';
import { TiArrowBackOutline } from 'react-icons/ti';
import Header from '../components/Header';
import { FaRegUser } from 'react-icons/fa';
import Footer from '../components/Footer';
import { TbBrandSpeedtest } from 'react-icons/tb';

const UserDetail = () => {

  const { id } = useParams();   //Parametros dinámicos de la url
  const navigate = useNavigate();
  const users = getUsersCache();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [boxMessages, setBoxMessages] = useState(false)

  const headerText = <h1 className='text-title'>Detalles de usuario <FaRegUser size={20} /></h1>
  const footerText = <p className='text-title text-special-white footer-text-disclaimer'>Envioclick Test <TbBrandSpeedtest size={15} /></p>

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
    if (!message.trim()) return; //Eliminamos espacios en blanco

    const updateMessages = saveMessage(id, message);
    setMessages(updateMessages);

    setMessage("");
  }

  return (
    <div className='background-gradient'>
      <div className='container'>
        <div className='grid'>
          <Header
            isOptLef={true}
            optionLeft={headerText}
            isText={false}
            isOptRig={false}
          />
          <div className='users-layout'>
            <div className="detail-container">
              <button
                className="back-button"
                onClick={() => navigate("/users")}
              >
                <TiArrowBackOutline size={15} style={{ marginRight: "5px" }} />
                Regresar
              </button>
            </div>

            <div className='content-scroll  screen-2-columns'>
              <div>
                <div className="detail-card">
                  <img
                    src={user.picture.large}
                    alt={user.name.first}
                  />
                  <h1>
                    {user.name.first} {user.name.last}
                  </h1>
                  <p>
                    <strong>Email: </strong>
                    {user.email}
                  </p>
                  <p>
                    <strong>Teléfono: </strong>
                    {user.phone}
                  </p>
                  <p>
                    <strong>Genero: </strong>
                    {user.gender}
                  </p>
                  <p>
                    <strong>Edad: </strong>
                    {user.dob.age}
                  </p>
                  <p>
                    <strong>Pais: </strong>
                    {user.location.country}
                  </p>
                </div>

                <div className='message-section'>
                  {boxMessages ?  (
                    <>
                      <h2>Mensajes</h2>
                      <div>
                        <textarea
                          className='message-texbox'
                          name='message'
                          placeholder='Escribe un mensaje 🫰🏼'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className='form-btn-container'>
                          <button className='form-button' onClick={handleSendMessage}>Enviar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <button className='form-button' onClick={() => setBoxMessages(true)}>Dejar un mensaje 💬 </button>
                  )
                  }
                </div>
              </div>

              <div className='message-grid'>
                {messages.length === 0 ?
                  (
                    <></>
                  ) : (

                    <>
                      <h4 className='message-history-title'>Historial de mensajes</h4>
                      {messages.map((msg) => {
                        return (
                          <div
                            key={msg.id}
                            className='message-card'
                          >
                            <p>{msg.text}</p>
                            <small>{msg.createAt}</small>
                          </div>
                        )
                      })}

                    </>
                  )
                }
              </div>

              </div>
          </div>

          <Footer
            isOptLef={false}
            isText={false}
            isOptRig={true}
            optionRight={footerText}
          />

        </div>

      </div>
    </div>
  )
}

export default UserDetail
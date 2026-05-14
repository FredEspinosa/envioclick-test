import React from 'react'

const Modal = ({
    title,
    message,
    onConfirm,
    onCancel,
}) => {

  return (
    <>
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>{title}</h2>
                <p>{message}</p>

                <div className='modal-buttons'>
                    <div className='form-btn-container'>
                        <button className='form-button' onClick={onConfirm}>Confirmar</button>
                    </div>
                    <div className='form-btn-container'>
                        <button className='form-button' onClick={onCancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal
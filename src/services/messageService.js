export const getMessages = (userId) => {
    // Funcion para onbtener mensajes del LS dependiendo del userId
    const messages = localStorage.getItem(`messages_${userId}`);

    return messages ? JSON.parse(messages) : [];
}

export const saveMessage = (userId, message) => {
    // Función para guardar mensajes en el LS
    const currentMessages = getMessages(userId);

    // Tomamos el historial de mensajes, lo copiamos y le agregamos el nuevo mensaje
    const updatedMessages = [
        ...currentMessages,
        {
            id: Date.now(),
            text: message,
            createAt: new Date().toLocaleString(), //Se usa para dar un formato legible a la fecha
        },
    ];

    // Guarda el mensaje nuevo historial de mensajes en el LS
    localStorage.setItem(`messages_${userId}`,
        JSON.stringify(updatedMessages)
    );

    return updatedMessages
}
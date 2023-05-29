import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
      socket.connect();
      socket.on('connect', () => {
          console.log('Conectado al servidor WebSocket');
      });
    // Evento de respuesta recibida
    socket.on('respuesta', (data) => {
      setResponse(data);
    });

    // Cleanup al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('mensaje', message);
  };

  return (
      <div>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje"
        />
        <button onClick={sendMessage}>Enviar</button>
        <p>Respuesta recibida: {response}</p>
      </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setLoggedIn }) => { // Recibe setLoggedIn como prop

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        contraseña: password
      });

      console.log(response.data); 

      // Verificar si la respuesta es exitosa y actualizar el estado loggedIn
      if (response.status === 200) {
        setLoggedIn(true);
      }
      
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
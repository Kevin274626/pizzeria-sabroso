import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  // Lógica para cerrar sesión y redirigir al login
  const handleLogout = () => {
    // Lógica para cerrar sesión, como borrar tokens de autenticación, etc.
    setLoggedIn(false); // Esto marca al usuario como desconectado
    navigate('/login'); // Redirige al componente de inicio de sesión
  };

  // Renderización del componente
  return (
    <div>
      <h2>Cerrar Sesión</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Logout;

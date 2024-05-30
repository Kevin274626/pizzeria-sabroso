import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Clientes from './Components/Clientes';
import Productos from './Components/Productos';
import Administradores from './Components/Administradores';
import Logout from './Components/Logout';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <h1>Bienvenido a la Aplicación de Gestión</h1>
        <nav>
          <ul>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/clientes">Gestión de Clientes</Link>
                </li>
                <li>
                  <Link to="/productos">Gestión de Productos</Link>
                </li>
                <li>
                  <Link to="/administradores">Gestión de Administradores</Link>
                </li>
                <li>
                  <Link to="/logout">Cerrar sesion</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={<LoginForm setLoggedIn={setLoggedIn} />}
          />
          {loggedIn ? (
            <>
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/administradores" element={<Administradores />} />
              <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} /> } />
            </>
          ) : (
            <Route path="/*" element={<LoginForm setLoggedIn={setLoggedIn} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
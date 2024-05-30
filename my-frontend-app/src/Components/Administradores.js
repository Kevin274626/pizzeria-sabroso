import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Administradores = () => {
    const [administradores, setAdministradores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [editAdministrador, setEditAdministrador] = useState(null);

    useEffect(() => {
        fetchAdministradores();
    }, []);

    const fetchAdministradores = async () => {
        try {
            const response = await axios.get('http://localhost:8080/administradores');
            setAdministradores(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de administradores:', error);
        }
    };

    const handleSave = async () => {
        const nuevoAdministrador = { nombre, email, contraseña };
        try {
            const response = await axios.post('http://localhost:8080/administradores', nuevoAdministrador);
            setAdministradores([...administradores, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error al agregar administrador:', error);
        }
    };

    const handleEdit = (administrador) => {
        setEditAdministrador(administrador);
        setNombre(administrador.nombre);
        setEmail(administrador.email);
        setContraseña(administrador.contraseña);
    };

    const handleUpdate = async () => {
        const updatedAdministrador = { nombre, email, contraseña };
        try {
            const response = await axios.put(`http://localhost:8080/administradores/${editAdministrador.id}`, updatedAdministrador);
            const updatedAdministradores = administradores.map(admin =>
                admin.id === editAdministrador.id ? response.data : admin
            );
            setAdministradores(updatedAdministradores);
            resetForm();
        } catch (error) {
            console.error('Error al actualizar administrador:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/administradores/${id}`);
            setAdministradores(administradores.filter(admin => admin.id !== id));
        } catch (error) {
            console.error('Error al eliminar administrador:', error);
        }
    };

    const resetForm = () => {
        setNombre('');
        setEmail('');
        setContraseña('');
        setEditAdministrador(null);
    };

    return (
        <div>
            <h1>Lista de Administradores</h1>
            <ul>
                {administradores.map(admin => (
                    <li key={admin.id}>
                        <strong>ID:</strong> {admin.id} - <strong>Nombre:</strong> {admin.nombre} - 
                        <strong>Email:</strong> {admin.email}
                        <button onClick={() => handleEdit(admin)}>Editar</button>
                        <button onClick={() => handleDelete(admin.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{editAdministrador ? 'Editar Administrador' : 'Agregar Administrador'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); editAdministrador ? handleUpdate() : handleSave(); }}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editAdministrador ? 'Actualizar' : 'Guardar'}</button>
                {editAdministrador && <button type="button" onClick={resetForm}>Cancelar</button>}
            </form>
        </div>
    );
};

export default Administradores;
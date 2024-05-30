import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [editCliente, setEditCliente] = useState(null);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de clientes:', error);
        }
    };

    const handleSave = async () => {
        const nuevoCliente = { nombre, email, direccion };
        try {
            const response = await axios.post('http://localhost:8080/clientes', nuevoCliente);
            setClientes([...clientes, response.data]);
            setNombre('');
            setEmail('');
            setDireccion('');
        } catch (error) {
            console.error('Error al agregar cliente:', error);
        }
    };

    const handleEdit = (cliente) => {
        setEditCliente(cliente);
        setNombre(cliente.nombre);
        setEmail(cliente.email);
        setDireccion(cliente.direccion);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/clientes/${editCliente.id}`, {
                nombre,
                email,
                direccion
            });
            const updatedClientes = clientes.map(cliente =>
                cliente.id === editCliente.id ? response.data : cliente
            );
            setClientes(updatedClientes);
            setEditCliente(null);
            setNombre('');
            setEmail('');
            setDireccion('');
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/clientes/${id}`);
            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.nombre} - {cliente.email} - {cliente.direccion}
                        <button onClick={() => handleEdit(cliente)}>Editar</button>
                        <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{editCliente ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); editCliente ? handleUpdate() : handleSave(); }}>
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
                    <label>Dirección:</label>
                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editCliente ? 'Actualizar' : 'Guardar'}</button>
                {editCliente && <button onClick={() => setEditCliente(null)}>Cancelar</button>}
            </form>
        </div>
    );
};

export default Clientes;
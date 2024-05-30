import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [editProducto, setEditProducto] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de productos:', error);
        }
    };

    const handleSave = async () => {
        const nuevoProducto = { nombre, precio };
        try {
            const response = await axios.post('http://localhost:8080/productos', nuevoProducto);
            setProductos([...productos, response.data]);
            setNombre('');
            setPrecio('');
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    };

    const handleEdit = (producto) => {
        setEditProducto(producto);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/productos/${editProducto.id}`, {
                nombre,
                precio
            });
            const updatedProductos = productos.map(producto =>
                producto.id === editProducto.id ? response.data : producto
            );
            setProductos(updatedProductos);
            setEditProducto(null);
            setNombre('');
            setPrecio('');
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/productos/${id}`);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        {producto.nombre} - ${producto.precio}
                        <button onClick={() => handleEdit(producto)}>Editar</button>
                        <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{editProducto ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); editProducto ? handleUpdate() : handleSave(); }}>
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
                    <label>Precio:</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{editProducto ? 'Actualizar' : 'Guardar'}</button>
                {editProducto && <button onClick={() => setEditProducto(null)}>Cancelar</button>}
            </form>
        </div>
    );
};

export default Productos;
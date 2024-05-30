import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [fecha, setFecha] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [pedidoProductos, setPedidoProductos] = useState([{ productoId: '', cantidad: 1, precioUnitario: 0 }]);
    const [editPedido, setEditPedido] = useState(null);

    useEffect(() => {
        fetchPedidos();
        fetchClientes();
        fetchProductos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/pedidos');
            setPedidos(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de pedidos:', error);
        }
    };

    const fetchClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de clientes:', error);
        }
    };

    const fetchProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de productos:', error);
        }
    };

    const handleSave = async () => {
        const nuevoPedido = {
            fecha: new Date(fecha),
            cliente: { id: clienteId },
            listaProductos: pedidoProductos.map(pp => ({ id: pp.productoId, cantidad: pp.cantidad, precio: pp.precioUnitario }))
        };

        try {
            const response = await axios.post('http://localhost:8080/pedidos', nuevoPedido);
            setPedidos([...pedidos, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error al agregar pedido:', error);
        }
    };

    const handleEdit = (pedido) => {
        setEditPedido(pedido);
        setFecha(new Date(pedido.fecha).toISOString().slice(0, 10));
        setClienteId(pedido.cliente.id);
        setPedidoProductos(pedido.listaProductos.map(p => ({
            productoId: p.id,
            cantidad: p.cantidad,
            precioUnitario: p.precio
        })));
    };

    const handleUpdate = async () => {
        const updatedPedido = {
            fecha: new Date(fecha),
            cliente: { id: clienteId },
            listaProductos: pedidoProductos.map(pp => ({ id: pp.productoId, cantidad: pp.cantidad, precio: pp.precioUnitario }))
        };

        try {
            const response = await axios.put(`http://localhost:8080/pedidos/${editPedido.id}`, updatedPedido);
            const updatedPedidos = pedidos.map(pedido =>
                pedido.id === editPedido.id ? response.data : pedido
            );
            setPedidos(updatedPedidos);
            resetForm();
        } catch (error) {
            console.error('Error al actualizar pedido:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/pedidos/${id}`);
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
        } catch (error) {
            console.error('Error al eliminar pedido:', error);
        }
    };

    const handleProductoChange = (index, productoId) => {
        const producto = productos.find(p => p.id === parseInt(productoId));
        const updatedPedidoProductos = [...pedidoProductos];
        updatedPedidoProductos[index].productoId = productoId;
        updatedPedidoProductos[index].precioUnitario = producto ? producto.precio : 0;
        setPedidoProductos(updatedPedidoProductos);
    };

    const handleCantidadChange = (index, cantidad) => {
        const updatedPedidoProductos = [...pedidoProductos];
        updatedPedidoProductos[index].cantidad = cantidad;
        setPedidoProductos(updatedPedidoProductos);
    };

    const agregarProducto = () => {
        setPedidoProductos([...pedidoProductos, { productoId: '', cantidad: 1, precioUnitario: 0 }]);
    };

    const eliminarProducto = (index) => {
        const updatedPedidoProductos = pedidoProductos.filter((_, i) => i !== index);
        setPedidoProductos(updatedPedidoProductos);
    };

    const calcularTotal = () => {
        return pedidoProductos.reduce((total, pp) => total + pp.cantidad * pp.precioUnitario, 0);
    };

    const resetForm = () => {
        setFecha('');
        setClienteId('');
        setPedidoProductos([{ productoId: '', cantidad: 1, precioUnitario: 0 }]);
        setEditPedido(null);
    };

    return (
        <div>
            <h1>Lista de Pedidos</h1>
            <ul>
                {pedidos.map(pedido => (
                    <li key={pedido.id}>
                        <strong>ID:</strong> {pedido.id} - <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()} - 
                        <strong>Cliente:</strong> {pedido.cliente.nombre} - 
                        <strong>Productos:</strong> {pedido.listaProductos.map(p => `${p.nombre} (Cantidad: ${p.cantidad}, Precio Unitario: ${p.precio})`).join(', ')} - 
                        <strong>Total:</strong> ${pedido.total}
                        <button onClick={() => handleEdit(pedido)}>Editar</button>
                        <button onClick={() => handleDelete(pedido.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            <h2>{editPedido ? 'Editar Pedido' : 'Agregar Pedido'}</h2>
            {(clientes.length === 0 || productos.length === 0) ? (
                <p>No hay clientes o productos disponibles para hacer un pedido.</p>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); editPedido ? handleUpdate() : handleSave(); }}>
                    <div>
                        <label>Fecha:</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Cliente:</label>
                        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                            <option value="">Seleccione un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Productos:</label>
                        {pedidoProductos.map((pp, index) => (
                            <div key={index}>
                                <select value={pp.productoId} onChange={(e) => handleProductoChange(index, e.target.value)} required>
                                    <option value="">Seleccione un producto</option>
                                    {productos.map(producto => (
                                        <option key={producto.id} value={producto.id}>{producto.nombre}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={pp.cantidad}
                                    onChange={(e) => handleCantidadChange(index, parseInt(e.target.value))}
                                    required
                                    min="1"
                                />
                                <span>Precio Unitario: ${pp.precioUnitario}</span>
                                <button type="button" onClick={() => eliminarProducto(index)}>Eliminar</button>
                            </div>
                        ))}
                        <button type="button" onClick={agregarProducto}>Agregar Producto</button>
                    </div>
                    <div>
                        <label>Total:</label>
                        <span>${calcularTotal()}</span>
                    </div>
                    <button type="submit">{editPedido ? 'Actualizar' : 'Guardar'}</button>
                    {editPedido && <button type="button" onClick={resetForm}>Cancelar</button>}
                </form>
            )}
        </div>
    );
};

export default Pedidos;
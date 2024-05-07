import React, { useEffect, useState } from 'react';
import '../../main.css';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';

const ItemListContainer = () => {
    const categoria = useParams().categoria;
    const [productos, setProductos] = useState([]);
    const [Nombre, setNombre] = useState("Productos");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products`);
                const docs = response.data;

                setTimeout(() => {
                    setProductos(docs);
                }, 1500);
            } catch (error) {
                console.error("Error al obtener productos", error);
            }
        };

        fetchProducts();
    }, []);

    let productToRender = [];

    return (
        productos.length === 0 ? <Loading/> :
        <div>
            <ItemList productos={productToRender} Nombre={Nombre} />
        </div>
    );
};

export default ItemListContainer;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";

const ItemList = ({ titl }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products`);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener productos", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <div className="productos">
                { productos.map((prod) => <Item producto={prod} key={prod._id} />) }
            </div>
        </div>
    )
};

export default ItemList;

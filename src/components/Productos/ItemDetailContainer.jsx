import React from 'react'
import ItemDetail from "./ItemDetail"
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';


const ItemDetailContainer = () => {
    const { id } = useParams();  
    const [producto, setProducto] = useState([]);  

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const response = await axios.get(`http://localhost:5000/api/products/${id}`);

                setProducto(response.data);
            } catch (error) {
                console.error("Error al obtener el producto", error);
            }
        };

        fetchProduct();
    }, [id]);  

    return (
        <div className='detail-Container'>
            {producto && <ItemDetail producto={producto} />}
        </div>
    );
};

export default ItemDetailContainer;


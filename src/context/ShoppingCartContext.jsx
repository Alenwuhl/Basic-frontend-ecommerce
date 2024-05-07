import React from 'react'
import { useState, createContext, useEffect } from "react";
import axios from "axios";


export const CartContext = createContext()
const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

const ShoppingCartProvider = ({ children }) => {

    const [cart, setCarrito] = useState(carritoInicial);

    const agregarAlCarrito = (producto, cantidad) => {
        const productoAgregado = { ...producto, cantidad };

        const nuevoCarrito = [...cart];
        const estaEnElCarrito = nuevoCarrito.find((producto) => producto._id === productoAgregado._id);

        if (estaEnElCarrito) {
            estaEnElCarrito.cantidad += cantidad;
        } else {
            nuevoCarrito.push(productoAgregado);
        }
        setCarrito(nuevoCarrito);
    }

    const cantidadEnCarrito = () => {
        return cart.reduce((acc, producto) => acc + producto.cantidad, 0);
    }

    const precioTotal = () => {
        return cart.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    }

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(cart));
    }, [cart])

    const handleDeleteProduct = (pro) => {
        setCarrito(cart.filter((p) => {
            if (p.id !== pro.id) {
                return p
            } else {
                p.cantidad--;
                if (p.cantidad > 0) {
                    return p
                }
            }
        }))
    }

    const realizarCompra = async () => {
        try {
            const items = cart.map(item => ({
                productId: item._id,
                quantity: item.cantidad,
            }));

            const response = await axios.post("/api/carts/purchase", { items }, {
                withCredentials: true,
            });

            vaciarCarrito();

            return response.data;
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            throw error;
        }
    };

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{
            cart,
            agregarAlCarrito,
            cantidadEnCarrito,
            precioTotal,
            vaciarCarrito,
            handleDeleteProduct,
            realizarCompra
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default ShoppingCartProvider

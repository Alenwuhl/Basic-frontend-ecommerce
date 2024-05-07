import React, { useEffect } from 'react'
import ItemCount from "./ItemCount"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { CartContext } from "../../context/ShoppingCartContext"
import ShoppingCartProvider from '../../context/ShoppingCartContext'


const ItemDetail = ({ producto }) => {


  const { cart, agregarAlCarrito } = useContext(CartContext);

  const handleAmount = (cant) => {
    agregarAlCarrito(producto, cant)
  }
  return (
    <div className="card-Detail">
      <div className="card-front-Detail">
        <p className="title-Detail">{producto.title}</p>
        <p className="subtitle-Detail">${producto.price}</p>
      </div>
      <div className="card-back-Detail">
        <ItemCount
          handleAdd={handleAmount}/>
      </div>
    </div>
  )
}

export default ItemDetail

import React from 'react'
import {useContext} from "react"
import { BsCart4 } from 'react-icons/bs';
import { CartContext } from '../../context/ShoppingCartContext';

const CartWidget = () => {
  const { cantidadEnCarrito } = useContext(CartContext)
  return (
    <div className='CartWidget'>
      <div className='BsCart4'>
        <BsCart4/>
      </div>
      <p>  Carrito ({cantidadEnCarrito()})</p>
    </div>
  )
}

export default CartWidget

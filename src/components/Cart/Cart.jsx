
import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/ShoppingCartContext'
import { Link, useNavigate } from "react-router-dom";



const Cart = () => {
  const { cart, precioTotal, vaciarCarrito, handleDeleteProduct, realizarCompra } = useContext(CartContext);
  const navigate = useNavigate();

  const handleVaciar = () => {
    vaciarCarrito();
  }

  const handleComprar = async () => {
    try {
        const response = await realizarCompra();

        navigate("/confirmation");
    } catch (error) {
        console.error("Error al realizar la compra:", error);
    }
};
  return (
    cart.length > 0 ?

      <div className="container mt-5 mb-5 displayBlock">
        <div className="d-flex justify-content-center row">
          <div className='width100'>
            <div className="p-2">
              <h4>CARRITO</h4>
            </div>
            {cart.map((prod, index) =>
              <div key={index} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="mr-1">
                <div className="circle"></div>
            </div>
                <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{prod.title}</span>
                </div>              <div>
                  <h5 className="text-grey">${prod.price}</h5>
                  <h6>Cantidad: {prod.cantidad}</h6>
                </div>
                <div onClick={() => handleDeleteProduct(prod)} className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger"></i></div>
              </div>

            )}
            <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
              <input type="text" className="form-control border-0 gift-card" placeholder={`Precio total: ${precioTotal()}`}></input>
              <button onClick={handleVaciar} className="btn btn-outline-warning btn-sm ml-2" type="button">VACIAR EL CARRITO</button>
            </div>
            <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
            <button onClick={handleComprar} className="btn btn-warning btn-block btn-lg ml-2 pay-button">COMPRAR</button>
            </div>
          </div>
        </div>

      </div>
      : <div className='d-flex justify-content-center'>
        <h1>TU CARRITO ESTÁ VACÍO</h1>
      </div>

  )
}
export default Cart

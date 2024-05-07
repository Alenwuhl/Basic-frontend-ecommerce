import React from 'react'
import { useState } from 'react'
import { Button, Stack, Box } from '@chakra-ui/react'



const ItemCount = ({ handleAdd }) => {
    const [contador, setContador] = useState(1)


    return (
        <>
            <div className='div-Count' direction={["column", "row"]} spacing="24px">
                <div className='div-row'>
                    <div w='40px' h='40px'>
                        <Button size='xs' onClick={() => {
                            if (contador <= 9) {
                                setContador(contador + 1);
                            } else {
                                setContador(contador);
                            }
                        }}>
                            +
                        </Button>
                    </div>
                    <div w='40px' h='40px'>
                        <p className='pr-3 pl-3 pt-0 pb-0'>{contador}</p>
                    </div>
                    <div w='40px' h='40px'>
                    <Button size='xs' onClick={() => {
                            if (contador >= 2) {
                                setContador(contador - 1);
                            } else {
                                setContador(contador);
                            }
                        }}>
                            -
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="agregar-al-carrito" onClick={() => handleAdd(contador)}><button className="button-addCart">
                        <span>Agregar al Carrito</span>
                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <defs>  </defs> <g id="cart"> <circle r="1.91" cy="20.59" cx="10.07" className="cls-1"></circle> <circle r="1.91" cy="20.59" cx="18.66" className="cls-1"></circle> <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10" className="cls-1"></path> <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91" className="cls-1"></polyline> </g> </g></svg>
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCount

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div className="confirmation">
            <div className="confirmation-container">
                <h2>¡Compra Exitosa!</h2>
                <p>Tu compra se ha realizado correctamente.</p>
                <p>Se te ha enviado un correo de confirmación.</p>
                
                <Link to="/" className="btn btn-primary">Regresar al Inicio</Link>
            </div>
        </div>
    );
};

export default Confirmation;

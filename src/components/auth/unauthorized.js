import React from 'react';
import './unauth.css';

const Unauthorized = () => {
    return (
        <div className="w3-display-middle">
            <h1 className="w3-jumbo w3-animate-top w3-center">
                <code>Accès Refusé</code>
            </h1>
            <hr className="w3-border-white w3-animate-left" style={{ margin: 'auto', width: '50%' }} />
            <h3 className="w3-center w3-animate-right">Vous n'avez pas la permission de consulter ce site.</h3>
            <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
            <h6 className="w3-center w3-animate-zoom">
                <strong>Code d'erreur</strong>: 403 interdit
            </h6>
        </div>
    );
};

export default Unauthorized;
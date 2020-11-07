import React from 'react';

import {UsuarioContext} from '../context/UsuarioProvider';

const Navbar = () => { 

    const { usuario, iniciarSesion, cerrarSesion } = React.useContext(UsuarioContext);

    console.log(usuario)

    return (
        <div className="navbar navbar-dark bg-dark">
            <div className="container">
                <div>
                    {
                        usuario.email ? (
                            <button className="btn btn-dark" onClick={cerrarSesion}>Cerrar Sesión</button>
                        ) : (
                            <button className="btn btn-dark" onClick={iniciarSesion}>Login</button>
                        )
                    }
                </div>
                <div>
                    <span className='text-light'>
                        {
                            usuario.email ? usuario.email : 'Invitado'
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}
 
export default Navbar

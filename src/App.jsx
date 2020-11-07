import React from 'react';
import Navbar from './components/Navbar';
// Componentes
import VistaAdmin from './components/VistaAdmin';
import AgregarLibro from './components/AgregarLibro';  

import { UsuarioContext } from './context/UsuarioProvider'
import Libros from './components/Libros';

const App = () => {
  const { usuario } = React.useContext(UsuarioContext);
  return (
    <div >
      <Navbar />
      <div className="container mt-3">
        {
          usuario.rol === 'admin' && <VistaAdmin usuario={usuario} />
        }

        {
          (usuario.rol === 'autor' || usuario.rol === 'admin') && <AgregarLibro />
        }

        <Libros />
      </div>
    </div>
  )
}

export default App


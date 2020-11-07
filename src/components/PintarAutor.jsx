import React from 'react'
import { LibrosContext } from '../context/LibrosProvider';
import { UsuarioContext } from '../context/UsuarioProvider';
import { db } from '../firebase';

const PintarAutor = (props) => {
    console.log(props);

    // como es una llamada a otra base de datos vamos hacer una constante

    const [autor, setAutor] = React.useState('');  

    const { fetchLibros } = React.useContext(LibrosContext);
    const { usuario } = React.useContext(UsuarioContext);

    React.useEffect(()=>{
        fetchAutor();
    },[]);

    const eliminarLibro = async() =>{

        try {
           await db.collection('libros').doc(props.id).delete()
                  fetchLibros();
        } catch (error) {
            console.log(error);
        }
    }


    const fetchAutor = async()=>{
        try {
            // en este apartado no utilizamos el db.collection ya que ya tenemos la refencia
           const res =  await props.referencia.get();
           console.log(res.data());
           setAutor(res.data().email);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <span className="float-right"></span>
             {autor} 
            {
                (autor === usuario.email || usuario.rol === 'admin') && (
                    <button className='btn btn-danger float-right' onClick={eliminarLibro}>Eliminar</button>
                )
            }
        </>
    )
}

export default PintarAutor

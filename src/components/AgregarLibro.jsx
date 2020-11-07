import React from 'react';
import { db } from '../firebase'
import { UsuarioContext } from '../context/UsuarioProvider'
import { LibrosContext } from '../context/LibrosProvider'

const AgregarLibro = () => {

    const { usuario } = React.useContext(UsuarioContext);
    const { fetchLibros } = React.useContext(LibrosContext);

    const [titulo, setTitulo] = React.useState('');
    const [paginas, setPaginas] = React.useState('');

    const agregarLibro = (e)  => {
        e.preventDefault()
        if (!titulo.trim() || !paginas.trim()) {
            console.log('campo vacio');
            return
        }

        db.collection('libros').add({
            autor: db.collection('usuarios').doc(usuario.email),
            paginas: paginas,
            titulo: titulo,
            uid: usuario.uid
        })
            .then(res => {
                console.log(res)
                fetchLibros()
            })
            .catch(error => console.log(error));

        setTitulo('');
        setPaginas('');
    }

    return (
        <div className='my-5'>
            <h1>Agregar libros</h1>
            <form onSubmit={agregarLibro}>
                <input
                    type="text"
                    placeholder='Ingrese título'
                    className='form-control mb-2'
                    onChange={e => setTitulo(e.target.value)}
                    value={titulo}
                />
                <input
                    type="text"
                    placeholder='Ingrese páginas'
                    className='form-control mb-2'
                    onChange={e => setPaginas(e.target.value)}
                    value={paginas}
                />
                <button
                    className='btn btn-dark'
                    type='submit'
                >
                    Agregar
                </button>
            </form>
        </div>
    )
}

export default AgregarLibro

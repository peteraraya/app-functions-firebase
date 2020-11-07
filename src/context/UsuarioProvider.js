import React from 'react';
import {auth,db, firebase } from '../firebase';

export const UsuarioContext = React.createContext();

const UsuarioProvider = (props) => {


    const dataUsuarioInicial ={
        email:null, uid:null, activo:null
    };
    const [usuario, setUsuario ] = React.useState(dataUsuarioInicial);
    
    React.useEffect(() => {
       detectarUsuario();
    }, []);

    const detectarUsuario = () => {
        auth.onAuthStateChanged( user =>{
            if (user) {
                console.log(user);

                // devuelve una promesa que devuelve el token
                user.getIdTokenResult()
                    .then(idTokenResult =>{
                        console.log(idTokenResult);
                        if(!!idTokenResult.claims.admin){
                            console.log('es administrador');
                            setUsuario({
                                email: user.email,
                                uid:user.uid,
                                activo:true,
                                rol:'admin'
                            });
                        } else if (!!idTokenResult.claims.autor){
                            console.log('es autor');
                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: true,
                                rol: 'autor'
                            });
                        }else{
                            console.log('es invitado');
                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: true,
                                rol: 'invitado'
                            });
                        }
                    });
            }else{
                console.log(user);
                setUsuario({
                    email: null,
                    uid: null,
                    activo: false,
                    rol: null
                });
            }
        });
    }



    const iniciarSesion = async() =>{

        try {
            // Preguntamos por un proveedor
            const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider);

            // en caso que el usuario de logee y no exista su documento
            const existe = await db.collection('usuarios').doc(res.user.email).get();

            // lo guardamos
            if (!existe.exists ) {
                await db.collection('usuarios').doc(res.user.email).set({
                    uid:res.user.uid,
                    email:res.user.email,
                    rol:'invitado'
                });
            }

        } catch (error) {
            console.log(error);
        }
    };

    const cerrarSesion = () => {
        auth.signOut()
    }

    return (
        <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider

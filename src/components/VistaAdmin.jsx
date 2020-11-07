import React from "react";
import { db, functions } from "../firebase";

const VistaAdmin = () => {
  const [email, setEmail] = React.useState("");
  const [usuarios, setUsuarios] = React.useState([]);

  React.useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      // leemos toda la colección
      const res = await db.collection("usuarios").get();
      // recorremos toda nuestra colección y la guardamos en setUsuario
      const arrayUsuarios = res.docs.map((doc) => doc.data());
      setUsuarios(arrayUsuarios);
    } catch (error) {
      console.log(error);
    }
  };

  const administrador = (email) => {
    if (!email.trim()) {
      return console.log("email es vacio");
    }

    const agregarRol = functions.httpsCallable("agregarAdministrador");

    agregarRol({ email: email }).then((res) => {
      if (res.data.error) {
        console.log("no tiene permisos");
        return;
      }
      db.collection("usuarios")
        .doc(email)
        .update({ rol: "admin" })
        .then((user) => {
          console.log("usuario modificado rol administrador");
          fetchUsuarios();
        });
    });
  };
  const eliminarAdministrador = (email) => {
    if (!email.trim()) {
      console.log("email vacio");
      return;
    }
    const agregarRol = functions.httpsCallable("eliminarAdministrador");

    agregarRol({ email: email })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          return console.log("no está autorizado");
        }
        db.collection("usuarios")
          .doc(email)
          .update({ rol: "invitado" })
          .then((res) => {
            console.log("usuario invitado actualizado");
            fetchUsuarios();
          });
      })
      .catch((error) => console.log(error));

    setEmail("");
  };

  const agregarAutor = (email) => {
    if (!email.trim()) {
      console.log("email vacio");
      return;
    }
    const agregarRol = functions.httpsCallable("agregarAutor");

    agregarRol({ email: email })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          return console.log("no está autorizado");
        }
        db.collection("usuarios")
          .doc(email)
          .update({ rol: "autor" })
          .then((res) => {
            console.log("usuario autor actualizado");
            fetchUsuarios();
          });
      })
      .catch((error) => console.log(error));

    setEmail("");
  };
  const eliminarAutor = (email) => {
    if (!email.trim()) {
      console.log("email vacio");
      return;
    }
    const agregarRol = functions.httpsCallable("eliminarAutor");

    agregarRol({ email: email })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          return console.log("no está autorizado");
        }
        db.collection("usuarios")
          .doc(email)
          .update({ rol: "invitado" })
          .then((res) => {
            console.log("usuario modificado rol lector");
            fetchUsuarios();
          });
      })
      .catch((error) => console.log(error));

    setEmail("");
  };

  return (
    <div>
      <h3>Administración de Usuarios</h3>
      {usuarios.map((usuario) => (
        <div key={usuario.uid} className="mb-3">
          {usuario.email} - rol : {usuario.rol}
          {usuario.rol === "admin" ? (
            <button
              className="btn btn-danger btn-sm mx-2"
              onClick={() => eliminarAdministrador(usuario.email)}
            >
              Eliminar Admin
            </button>
          ) : (
            <>
              <button
                className="btn btn-dark btn-sm mx-2"
                onClick={() => administrador(usuario.email)}
              >
                Admin
              </button>
              <button
                className="btn btn-success btn-sm mr-2"
                onClick={() => agregarAutor(usuario.email)}
              >
                Autor
              </button>
              <button
                className="btn btn-info btn-sm mr-2"
                onClick={() => eliminarAutor(usuario.email)}
              >
                Lector
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default VistaAdmin;

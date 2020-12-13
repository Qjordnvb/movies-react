import React from "react";
import { Link } from "react-router-dom";
import "./css/NotFound.css";

// Retornamos este componente en caso de que la url no sea la correcta
function NotFound() {
  return (
    <React.Fragment>
      <h1 className="NotFound-title">
        Página no encontrada
      </h1>
      <Link className="NotFound-link" to="/">
        Regresar al Buscador
      </Link>
    </React.Fragment>
  );
}

export default NotFound;

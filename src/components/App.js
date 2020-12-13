import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Importamos Componentes para el Router
import Search from "../pages/Search";
import NotFound from "../components/NotFound";

// Creamos el Router para la Aplicación, aunque funciona en una sola página, se creo una ruta en caso de un error 404
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

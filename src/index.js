import React from "react";
import ReactDOM from "react-dom";
// Import Global CSS
import "./normalize.min.css";
import "./app.css";

import App from "./components/App";
const container = document.getElementById("app");

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(<App />, container);

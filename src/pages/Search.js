import React from "react";
import Typed from "react-typed";
// Importamos los componentes de la Aplicación
import SearchList from "../components/SearchList";
import Form from "../components/Form";
import "./css/Search.css";

class Search extends React.Component {
  // Inicializamos los estados del Componente de Búsqueda
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(
      this
    );
    this.state = {
      data: {
        Search: [],
        totalResults: "",
        Response: "",
        Error: "",
      },
      nextPage: 1,
      apiKey: "b500fc66",
      loading: false,
      error: null,
    };
  }

  // Detectar el cambio en el input
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  // Enviamos la petición y la procesamos con un fetch()
  handleSubmit = (e) => {
    e.preventDefault();
    // Reseteamos el input para una nueva búsqueda
    this.setState({
      data: {
        Search: [],
        totalResults: "",
        Response: "",
        Error: "",
      },
    });
    this.fetchSearch();
  };

  /*
   *Función fetch: traer los datos de la Api asincrónicamente
   *El try catch permite el manejo de estados de la petición de forma correcta
   */
  fetchSearch = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${this.state.apiKey}&s=${this.state.query}&page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          Search: [].concat(
            this.state.data.Search,
            data.Search
          ),
          totalResults: data.totalResults,
          Response: data.Response,
          Error: data.Error,
        },
        nextPage: this.state.nextPage + 1,
      });
    } catch (error) {
      this.setState({ error: error });
    }
  };

  render() {
    // En caso de error en la petición cargamos el error
    if (this.state.error) {
      return `Error: ${this.state.error.message}`;
    }
    return (
      <React.Fragment>
        <main className="MovieHome">
          <div className="banner">
            <div className="text-position">
              <h2 className="Header-logo">
                Movies & Series
              </h2>
              <h1
                className="MovieHome-title"
                style={{ paddingTop: "4%" }}
              >
                <Typed
                  strings={[
                    "Disfruta de tus peliculas y series favoritas",
                  ]}
                  typeSpeed={80}
                  backDelay={1100}
                  backSpeed={30}
                  loop
                />
              </h1>
            </div>
          </div>
          <section className="MovieHome-description" />

          {/* Componente Form */}
          <Form
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />

          {/* Cargamos el loader cuando traigamos los datos */}
          {this.state.loading && (
            <div className="Loader">
              Cargando...
            </div>
          )}

          <section className="MovieHome-results">
            {/* Imprimimos en pantalla el número de resultados */}
            {this.state.data.totalResults && (
              <span className="MovieHome-results-number">
                <strong>
                  {this.state.data.totalResults}
                </strong>{" "}
                Resultados Econtrados
              </span>
            )}

            {/* Imprimimos la lista de películas y series */}
            <SearchList data={this.state.data} />

            {/* Si hay resultados cargamos más series o películas */}
            {this.state.data.totalResults > 0 && (
              <div className="LoadMore">
                <button
                  onClick={() =>
                    this.fetchSearch()
                  }
                  className="btn btn-secondary"
                >
                  Cargar Más...
                </button>
              </div>
            )}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Search;

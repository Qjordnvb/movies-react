import React from "react";
import "./css/SearchList.css";
import Modal from "../components/Modal";

//Componente para cada Item con el Portal para el Modal
class SearchListItem extends React.Component {
  state = {
    modalIsOpen: false
  };

  handleCloseModal = e => {
    this.setState({ modalIsOpen: false });
  };

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };
  render() {
    return (
      <React.Fragment>
        <img
          src={this.props.movie.Poster}
          alt={this.props.Title}
          className="responsive"
        />
        <div className="SearchList-item-info">
          <h3>Título: {this.props.movie.Title} </h3>
          <h4>Año: {this.props.movie.Year}</h4>
          <a href="/" onClick={this.handleOpenModal} className="ShowDetails">
            Ver Detalles
          </a>
          <Modal
            isOpen={this.state.modalIsOpen}
            onClose={this.handleCloseModal}
          >
            <div className="ModalContent">
              <h3 className="ModalContent-title">
                Titulo: {this.props.movie.Title}
              </h3>
              <div className="ModalContent-body">
                <img
                  src={this.props.movie.Poster}
                  alt={this.props.movie.Title}
                  className="responsive ModalContent-img"
                />
                <h4 className="ModalContent-subtitle">
                  Año: {this.props.movie.Year} <br />
                  Tipo: {this.props.movie.Type} <br />
                  Id de Compra: {this.props.movie.imdbID}
                </h4>
              </div>
              <p />
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

// Componente de la Lista de Items, si la búsqueda nos da como resultado falsa, cargamos un mensaje de error para evitar que se rompa la aplicación
class SearchList extends React.Component {
  render() {
    if (this.props.data.Response === "False") {
      return <h2>No se encontro ningun resultado intenta de nuevo</h2>;
    }
    return (
      <section className="SearchList">
        <article className="SearchListGrid">
          {this.props.data.Search.map(movie => {
            return (
              <div key={movie.imdbID} className="SearchList-item">
                <SearchListItem movie={movie} />
              </div>
            );
          })}
        </article>
      </section>
    );
  }
}

export default SearchList;

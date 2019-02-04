import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { NUEVO_PRODUCTO } from "../../mutations";

export default class NuevoProducto extends Component {
  state = {
    nombre: "",
    precio: 0,
    stock: 0
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  validarForm = () => {
    const { nombre, precio, stock } = this.state;
    const noValido = !nombre || !precio || !stock;

    return noValido;
  };

  crearProducto = (e, nuevoProducto) => {
    e.preventDefault();
    //Insertando en la bd
    nuevoProducto().then(data => {
      console.log(data);
    });
  };

  render() {
    const { nombre, precio, stock } = this.state;
    const input = {
      nombre,
      precio: Number(precio),
      stock: Number(stock)
    };
    return (
      <Fragment>
        <h2 className="text-center mb-5">Nuevo Producto</h2>
        <div className="row justify-content-center">
          <Mutation mutation={NUEVO_PRODUCTO} variables={{ input }}>
            {(nuevoProducto, { loading, data, error }) => (
              <form
                className="col-md-8"
                onSubmit={e => this.crearProducto(e, nuevoProducto)}
              >
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del Producto"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Precio:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input
                      type="number"
                      name="precio"
                      className="form-control"
                      placeholder="Precio del Producto"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="stock del Producto"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success float-right"
                  disabled={this.validarForm()}
                >
                  Crear Producto
                </button>
              </form>
            )}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

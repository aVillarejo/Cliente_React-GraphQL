import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';
import Paginador from './Paginador';

//importacion de consulta
import { CLIENTES_QUERY } from '../queries';
import { ELIMINAR_CLIENTE } from '../mutations';

class Clientes extends Component {
	limite = 10;
	state = {
		paginador: {
			offset: 0,
			actual: 1
		}
	};

	paginaAnt = () => {
		console.log('pagina Anteror');
		this.setState({
			paginador: {
				offset: this.state.paginador.offset - this.limite,
				actual: this.state.paginador.actual - 1
			}
		});
	};

	paginaSig = () => {
		console.log('pagina Siguiente');
		this.setState({
			paginador: {
				offset: this.state.paginador.offset + this.limite,
				actual: this.state.paginador.actual + 1
			}
		});
	};

	render() {
		return (
			/*
	loading: se muestra mientras se esta cargarndo la información
	error: mustra los errores encontrados
	data: datos encontrados
	*/
			<Query
				query={CLIENTES_QUERY}
				pollInterval={500}
				variables={{ limite: this.limite, offset: this.state.paginador.offset }}
			>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if (loading) return <Spinner />;
					if (error) return `Error: ${error.message}`;
					console.log(data);

					const { clientes, total } = data;
					const totalClientes = Number(total);

					return (
						<Fragment>
							<h2 className="text-center">Listado de Clientes</h2>
							<table className="table table-hover">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Nombre</th>
										<th scope="col">Empresa</th>
									</tr>
								</thead>
								<tbody>
									{clientes.map((item, index) => {
										const { id } = item;
										return (
											<tr key={item.id}>
												<th scope="row">{index + 1}</th>
												<td>
													{item.nombre} {item.apellido}
												</td>
												<td>{item.empresa}</td>
												<td className=" d-flex justify-content-end ">
													<Link
														className="btn btn-info d-block d-md-inline-block mr-1"
														style={{ color: 'white' }}
														to={`/cliente/editar/${item.id}`}
													>
														Edit
													</Link>
													<Mutation mutation={ELIMINAR_CLIENTE}>
														{(eliminarCliente) => (
															<button
																type="button"
																style={{ color: 'white' }}
																className="btn btn-danger d-block d-md-inline-block"
																onClick={() => {
																	if (
																		window.confirm(
																			'Realmente deseas eliminar el cliente'
																		)
																	) {
																		eliminarCliente({ variables: { id } });
																	}
																}}
															>
																Remove
															</button>
														)}
													</Mutation>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<Paginador
								actual={this.state.paginador.actual}
								totalClientes={totalClientes}
								limite={this.limite}
								paginaAnterior={this.paginaAnt}
								paginaSiguiente={this.paginaSig}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Clientes;

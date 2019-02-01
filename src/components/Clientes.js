import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

//importacion de consulta
import { CLIENTES_QUERY } from '../queries';
import { ELIMINAR_CLIENTE } from '../mutations';

const Contactos = () => (
	/*
	loading: se muestra mientras se esta cargarndo la información
	error: mustra los errores encontrados
	data: datos encontrados
	*/
	<Query query={CLIENTES_QUERY} pollInterval={500}>
		{({ loading, error, data, startPolling, stopPolling }) => {
			if (loading) return <Spinner />;
			if (error) return `Error: ${error.message}`;
			const { clientes } = data;
			console.log(clientes);
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
												className="btn btn-info d-block d-md-inline-block"
												style={{ color: 'white', margin: 2 }}
												to={`/cliente/editar/${item.id}`}
											>
												Editar
											</Link>
											<Mutation mutation={ELIMINAR_CLIENTE}>
												{(eliminarCliente) => (
													<button
														type="button"
														style={{ color: 'white', margin: 2 }}
														className="btn btn-danger d-block d-md-inline-block"
														onClick={() => {
															if (
																window.confirm('Realmente deseas eliminar el cliente')
															) {
																eliminarCliente({ variables: { id } });
															}
														}}
													>
														&times; Eliminar
													</button>
												)}
											</Mutation>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</Fragment>
			);
		}}
	</Query>
);

export default Contactos;

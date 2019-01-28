import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

//importacion de consulta
import { CLIENTES_QUERY } from '../queries';

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
								<th scope="col">Apellido</th>
							</tr>
						</thead>
						<tbody>
							{clientes.map((item, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{item.nombre}</td>
									<td>{item.apellido}</td>
									<td className=" d-flex justify-content-end ">
										<Link
											className="btn btn-info d-block d-md-inline-block"
											style={{ color: 'white' }}
											to={`/cliente/editar/${item.id}`}
										>
											Editar
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* <ul className="list-group">
						{clientes.map((item) => (
							<li key={item.id} className="list-group-item">
								<div className="row justify-content-between align-items-center">
									<div className="col-md-8 d-flex justify-content-between align-items-center">
										{item.nombre} {item.apellido}
									</div>
									<div className="col-md-4 d-flex justify-content-end">
										<a
											className="btn btn-info d-block d-md-inline-block"
											style={{ color: 'white' }}
										>
											Editar Cliente
										</a>
									</div>
								</div>
							</li>
						))}
					</ul> */}
				</Fragment>
			);
		}}
	</Query>
);

export default Contactos;

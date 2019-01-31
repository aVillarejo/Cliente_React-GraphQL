import React, { Component, Fragment } from 'react';
import { CLIENTE_QUERY } from '../queries';
import { Query } from 'react-apollo';
import Spinner from './Spinner';
import Formulario from './Form_EditarCliente';
class EditarCliente extends Component {
	state = {};
	render() {
		const { id } = this.props.match.params;
		return (
			<Fragment>
				<h2 className="text-center">Editar Cliente</h2>
				<div className="row justify-content-center">
					<Query query={CLIENTE_QUERY} variables={{ id }}>
						{({ loading, error, data, refetch }) => {
							if (loading) return <Spinner />;
							if (error) return `Error!: ${error.message}`;
							const { cliente } = data;

							return <Formulario cliente={cliente} refetch={refetch} />;
						}}
					</Query>
				</div>
			</Fragment>
		);
	}
}

export default EditarCliente;

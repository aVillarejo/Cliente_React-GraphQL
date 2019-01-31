import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	{
		clientes: getClientes {
			id
			nombre
			apellido
			empresa
		}
	}
`;

export const CLIENTE_QUERY = gql`
	query getCliente($id: ID) {
		cliente: getCliente(id: $id) {
			id
			nombre
			apellido
			empresa
			emails {
				email
			}
			edad
			tipo
		}
	}
`;

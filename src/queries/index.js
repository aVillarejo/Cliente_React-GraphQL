import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	query getClientes($limite: Int, $offset: Int) {
		clientes: getClientes(limite: $limite, offset: $offset) {
			id
			nombre
			apellido
			empresa
		}
		total: totalClientes
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

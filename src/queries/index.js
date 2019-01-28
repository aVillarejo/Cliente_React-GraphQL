import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	{
		clientes: getClientes {
			id
			nombre
			apellido
		}
	}
`;

import gql from "graphql-tag";

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
  query getCliente($id: ID!) {
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

export const PRODUCTOS_QUERY = gql`
  query getProductos($limite: Int, $offset: Int) {
    productos: getProductos(limite: $limite, offset: $offset) {
      id
      nombre
      stock
      precio
    }
    total: totalProductos
  }
`;

export const PRODUCTO_QUERY = gql`
  query getProducto($id: ID) {
    producto: getProductos(id: $id) {
      id
      nombre
      stock
      precio
    }
  }
`;

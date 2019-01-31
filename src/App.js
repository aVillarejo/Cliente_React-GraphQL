import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Componentes
import Header from './components/Header';
import Clientes from './components/Clientes';
import NuevoCliente from './components/NuevoCliente';
import EditarCliente from './components/EditarCliente';

const client = new ApolloClient({
	uri: `http://192.168.1.74:9000/graphql`,
	cache: new InMemoryCache({
		addTypename: false
	}),
	onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});
class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<Fragment>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Clientes} />
								<Route exact path="/cliente/nuevo" component={NuevoCliente} />
								<Route exact path="/cliente/editar/:id" component={EditarCliente} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;

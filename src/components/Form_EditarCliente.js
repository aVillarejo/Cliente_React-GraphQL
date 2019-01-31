import React, { Component } from 'react';
import { ACTUALIZAR_CLIENTE } from '../mutacions';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormularioEditarCliente extends Component {
	state = {
		cliente: this.props.cliente,
		error: false,
		emails: this.props.cliente.emails
	};
	handleChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				[event.target.name]: event.target.value
			}
		});
	};
	nuevoCampo = () => {
		this.setState({
			emails: this.state.emails.concat([ { email: '' } ])
		});
	};

	leerCampo = (i) => (e) => {
		const nuevoMail = this.state.emails.map((email, index) => {
			if (i !== index) return email;
			return { ...email, email: e.target.value.toLowerCase() };
		});

		this.setState({ emails: nuevoMail });
	};

	quitarCampo = (i) => () => {
		this.setState({
			emails: this.state.emails.filter((s, index) => i !== index)
		});
	};

	render() {
		const { emails } = this.state;

		return (
			<Mutation
				mutation={ACTUALIZAR_CLIENTE}
				onCompleted={() =>
					this.props.refetch().then(() => {
						this.props.history.push('/');
					})}
			>
				{(actualizarCliente) => (
					<form
						className="col-md-8 m-3"
						onSubmit={(event) => {
							event.preventDefault();
							const { id, nombre, apellido, empresa, tipo, edad } = this.state.cliente;
							const { emails } = this.state;

							if (nombre && apellido && empresa && tipo && edad) {
								this.setState({
									error: false
								});
								const input = {
									id,
									nombre,
									apellido,
									empresa,
									emails,
									tipo,
									edad: Number(edad)
								};
								console.log(input);

								actualizarCliente({
									variables: { input }
								});
							} else {
								this.setState({
									error: true
								});
							}
						}}
					>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label>Nombre</label>
								<input
									name="nombre"
									type="text"
									className="form-control"
									value={`${this.state.cliente.nombre}`}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</div>
							<div className="form-group col-md-6">
								<label>Apellido</label>
								<input
									name="apellido"
									type="text"
									className="form-control"
									value={`${this.state.cliente.apellido}`}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group col-md-12">
								<label>Empresa</label>
								<input
									name="empresa"
									type="text"
									className="form-control"
									value={`${this.state.cliente.empresa}`}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</div>

							{emails.map((input, index) => (
								<div key={index} className="form-group col-md-12">
									<label>Email {index + 1} : </label>
									<div className="input-group">
										<input
											type="email"
											value={`${this.state.emails[index].email}`}
											placeholder={`Email`}
											className="form-control"
											onChange={this.leerCampo(index)}
										/>
										<div className="input-group-append">
											<button
												className="btn btn-danger"
												type="button"
												onClick={this.quitarCampo(index)}
											>
												&times; Eliminar
											</button>
										</div>
									</div>
								</div>
							))}
							<div className="form-group d-flex justify-content-center col-md-12">
								<button onClick={this.nuevoCampo} type="button" className="btn btn-warning">
									+ Agregar Email
								</button>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label>Edad</label>
								<input
									name="edad"
									type="text"
									className="form-control"
									value={`${this.state.cliente.edad}`}
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</div>
							<div className="form-group col-md-6">
								<label>Tipo Cliente</label>
								<select
									name="tipo"
									className="form-control"
									onChange={(e) => {
										this.handleChange(e);
									}}
									value={`${this.state.cliente.tipo}`}
								>
									<option value="">Elegir...</option>
									<option value="PREMIUM">PREMIUM</option>
									<option value="BASICO">BÁSICO</option>
								</select>
							</div>
						</div>
						<button type="submit" className="btn btn-success float-right">
							Guardar Cambios
						</button>
					</form>
				)}
			</Mutation>
		);
	}
}

export default withRouter(FormularioEditarCliente);

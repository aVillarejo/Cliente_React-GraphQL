import React, { Component, Fragment } from 'react';

import { NUEVO_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';

class NuevoCliente extends Component {
	state = {
		cliente: {
			nombre: '',
			apellido: '',
			empresa: '',
			tipo: '',
			edad: 0
		},
		error: false,
		emails: [ { email: '' } ]
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

	handleEmailValue = (i, e) => {
		const nuevoEmail = this.state.emails.map((email, index) => {
			if (i !== index) return email;
			return {
				...email,
				email: e.target.value
			};
		});
		this.setState({
			emails: nuevoEmail
		});
	};

	handleRemoveEmail = (i) => {
		// let newItems = this.state.emails.filter((email, index) => i !== index);
		// this.setState({
		// 	emails: newItems
		// });

		this.setState((state) => {
			const emails = state.emails.filter((item, j) => i !== j);
			return { emails };
		});
	};

	render() {
		const { error } = this.state;
		let respuesta = error ? (
			<p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>
		) : (
			''
		);
		return (
			<Fragment>
				<h2 className="text-center">Nuevo Cliente</h2>
				{respuesta}
				<div className="row justify-content-center ">
					<Mutation mutation={NUEVO_CLIENTE} onCompleted={() => this.props.history.push('/')}>
						{(crearCliente) => (
							<form
								className="col-md-8 m-3"
								onSubmit={(e) => {
									e.preventDefault();
									const { nombre, apellido, empresa, tipo, edad } = this.state.cliente;
									const { emails } = this.state;

									if (nombre && apellido && empresa && tipo && edad) {
										this.setState({
											error: false
										});
										const input = {
											nombre,
											apellido,
											empresa,
											emails,
											tipo,
											edad: Number(edad)
										};

										crearCliente({
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
											type="text"
											className="form-control"
											placeholder="Nombre"
											name="nombre"
											onChange={(e) => {
												this.handleChange(e);
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Apellido</label>
										<input
											type="text"
											className="form-control"
											placeholder="Apellido"
											name="apellido"
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
											type="text"
											className="form-control"
											placeholder="Empresa"
											name="empresa"
											onChange={(e) => {
												this.handleChange(e);
											}}
										/>
									</div>
									{this.state.emails.map((input, index) => (
										<div key={index} className="form-group col-md-12">
											<label>Correo {index + 1}: </label>
											<div className="input-group">
												<input
													onChange={(event) => this.handleEmailValue(index, event)}
													value={`${this.state.emails[index].email}`}
													placeholder="Email"
													type="email"
													className="form-control"
												/>
												<div className="input-group-append">
													<button
														className="btn btn-danger"
														type="button"
														onClick={() => this.handleRemoveEmail(index)}
													>
														&times; Eliminar
													</button>
												</div>
											</div>
										</div>
									))}
									<div className="form-group d-flex justify-content-center col-md-12">
										<button
											type="button"
											className="btn btn-warning"
											onClick={() => this.nuevoCampo()}
										>
											Agregar Email
										</button>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Edad</label>
										<input
											type="number"
											pattern="[0-9]*"
											inputMode="numeric"
											className="form-control"
											placeholder="Edad"
											name="edad"
											onChange={(e) => {
												this.handleChange(e);
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Tipo Cliente</label>
										<select
											className="form-control"
											name="tipo"
											onChange={(e) => {
												this.handleChange(e);
											}}
										>
											<option value="">Elegir...</option>
											<option value="PREMIUM">PREMIUM</option>
											<option value="BASICO">BÁSICO</option>
										</select>
									</div>
								</div>
								<button type="submit" className="btn btn-success float-right">
									Agregar Cliente
								</button>
							</form>
						)}
					</Mutation>
				</div>
			</Fragment>
		);
	}
}

export default NuevoCliente;

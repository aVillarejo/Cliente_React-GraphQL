import React, { Component } from 'react';
//import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

// const override = css`
// 	display: block;
// 	margin: 0 auto;
// 	border-color: red;
// `;

export default class Spinner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	render() {
		return (
			<div className="text-center" style={{ margin: 90 }}>
				<div className="sweet-loading">
					<ClipLoader
						//css={override}
						sizeUnit={'px'}
						size={100}
						color={'#4A90E2'}
						loading={this.state.loading}
					/>
				</div>
			</div>
		);
	}
}

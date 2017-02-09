import React from 'react';

class Steps extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 0,
		};
	}

	render() {
		return this.props.steps[this.state.step];
	}
}

export default Steps;

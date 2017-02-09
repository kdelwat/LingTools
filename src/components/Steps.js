import React from 'react';

class Steps extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 2,
		};
	}

	render() {
		return (
			<div className="outer-step">
				<div className="step-progress">
					{this.state.step}
					<progress
						className="progress"
						value={this.state.step}
						max={this.props.steps.length}
					/>
					<hr />
				</div>
				{this.props.steps[this.state.step - 1]}
			</div>
		);
	}
}

export default Steps;

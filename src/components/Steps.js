import React from 'react';

export function Step(props) {
	return (
		<div className="inner-step">
			{props.children}
		</div>
	);
}

class Steps extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 1,
		};

		this.renderNextButton = this.renderNextButton.bind(this);
		this.next = this.next.bind(this);
	}

	next() {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	}

	renderNextButton(currentStep) {
		if (this.state.step >= this.props.steps.length) {
			return null;
		}

		const nextButtonClass = currentStep.props.advanceCondition ? 'button' : 'button is-disabled';

		return (
			<button
				className={nextButtonClass}
				onClick={this.next}
			>
				Next
			</button>
		);
	}

	render() {
		const currentStep = this.props.steps[this.state.step - 1];
		return (
			<div className="outer-step">
				<div className="step-progress">
					{this.state.step}
					<progress
						className="progress"
						value={this.state.step}
						max={this.props.steps.length}
					/>
					{this.renderNextButton(currentStep)}
					<hr />
				</div>
				{this.props.steps[this.state.step - 1]}
			</div>
		);
	}
}

export default Steps;

import React from 'react';

/* Step is a simple component which wraps other arbitrary components. It should
be supplied a advanceCondition prop, which is a boolean determining whether the
step is completed. */
export function Step(props) {
	return (
		<div className="inner-step">
			{props.children}
		</div>
	);
}

/* Steps is a component which wraps an array of Step components, specified by
the steps prop. It maintains the current step in state and handles advancing
forwards and backwards through the steps. */
class Steps extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 1,
		};

		this.renderNextButton = this.renderNextButton.bind(this);
		this.renderBackButton = this.renderBackButton.bind(this);
		this.next = this.next.bind(this);
		this.back = this.back.bind(this);
	}

	// Advance one step
	next() {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	}

	// Go back one step
	back() {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	}

	// Render the next button
	renderNextButton(currentStep) {
		// If there is no next step, return an empty div (to maintain positioning of the buttons).
		if (this.state.step >= this.props.steps.length) {
			return <div />;
		}

		// If the advance condition of the step hasn't been met, disable the button.
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

	// Render the back button.
	renderBackButton() {
		// If there is no previous step, return an empty div (to maintain
		// positioning of the buttons).
		if (this.state.step <= 1) {
			return <div />;
		}

		return (
			<button
				className="button"
				onClick={this.back}
			>
				Back
			</button>
		);
	}

	render() {
		const currentStep = this.props.steps[this.state.step - 1];
		return (
			<div className="outer-step">
				<div className="step-progress">
					<hr />
					<progress
						className="progress is-success"
						value={this.state.step}
						max={this.props.steps.length}
					/>
					<div className="step-buttons">
						{this.renderBackButton()}
						{this.renderNextButton(currentStep)}
					</div>
				</div>
				{this.props.steps[this.state.step - 1]}
			</div>
		);
	}
}

export default Steps;

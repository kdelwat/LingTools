import React from 'react';
import ReactDOM from 'react-dom';

// The time in milliseconds that a notification will appear for.
const lifespan = 5000;

const classes = {
	success: 'is-success',
	error: 'is-danger',
	warning: 'is-warning',
	info: 'is-info',
};

class Notification extends React.Component {
	constructor(props) {
		super(props);
		this.selfDestruct = this.selfDestruct.bind(this);
	}

	// When mounted, set a timer to destroy the notification after a given
	// time.
	componentDidMount() {
		setTimeout(this.selfDestruct, lifespan);
	}

	// Destroy the notification by unmounting it.
	selfDestruct() {
		ReactDOM.unmountComponentAtNode(this.props.container);
	}

	render() {
		const className = 'notification ' + classes[this.props.type];

		return (
			<div className={className}>
				<button
					className="delete"
					onClick={this.selfDestruct}
				/>
				{this.props.message}
			</div>
		);
	}
}

export function NotificationArea() {
	return (
		<div id="notification-area" />
	);
}

// Add a notification to a currently-mounted NotificationArea, given a message
// and a type, which can be one of 'success', 'error', 'warning', or 'info'.
export function addNotification(message, type) {
	const container = document.getElementById('notification-area'); // eslint-disable-line no-undef

	// Unmount any existing notifications.
	ReactDOM.unmountComponentAtNode(container);
	// Render the new notification in the NotificationArea. We must pass it the container so that it
	// can delete itself.
	ReactDOM.render(<Notification container={container} message={message} type={type} />,
		container);
}

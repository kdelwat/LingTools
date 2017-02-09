import React from 'react';
import ReactDOM from 'react-dom';

const classes = {
	success: 'is-success',
	error: 'is-danger',
	warning: 'is-warning',
	info: 'is-info',
};

function Notification(props) {
	const className = 'notification ' + classes[props.type];
	return (
		<div className={className}>
			<button
				className="delete"
				onClick={() => ReactDOM.unmountComponentAtNode(props.container)}
			/>
			{props.message}
		</div>
	);
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

	// Render the new notification in the NotificationArea. We must pass it the container so that it
	// can delete itself.
	ReactDOM.render(<Notification container={container} message={message} type={type} />,
		container);
}

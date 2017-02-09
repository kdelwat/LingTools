import React from 'react';
import ReactDOM from 'react-dom';

function Notification(props) {
	return (
		<div className="notification">
			<button className="delete" onClick={() => ReactDOM.unmountComponentAtNode(props.container)} />
			A notification
		</div>
	);
}

export function NotificationArea() {
	return (
		<div id="notification-area" />
	);
}

export function addNotification() {
	const container = document.getElementById('notification-area'); // eslint-disable-line no-undef

	ReactDOM.render(<Notification container={container} />,
		container);
}

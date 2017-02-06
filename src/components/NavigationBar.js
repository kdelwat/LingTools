import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, browserHistory } from 'react-router';


function NavigationBar(props) {
	if (props.url === '/') {
		return (
			<div className={css(styles.navigationBar)}>
				<ul>
					{props.links.map(renderLink)}
				</ul>
				{props.url}
			</div>
		);
	}

	return (
		<div className={css(styles.navigationBar)}>
			<a onClick={() => browserHistory.goBack()}>Back</a>
			{props.url}
		</div>
	);
}

// Render a link item from a link object
function renderLink(link) {
	return (
		<li key={link.url}><Link to={link.url}>{link.text}</Link></li>
	);
}

const styles = StyleSheet.create({
	navigationBar: {
		color: 'red',
		paddingLeft: 40,
		paddingRight: 40,
	},
});

export default NavigationBar;

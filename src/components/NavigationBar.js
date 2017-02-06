import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';


function NavigationBar(props) {
	if (props.url === '/') {
		return (
			<div className={css(styles.navigationBar)}>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/grammargen">GrammarGen</Link></li>
				</ul>
				{props.url}
			</div>
		);
	}

	return (
		<div className={css(styles.navigationBar)}>
			{props.url}
		</div>
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

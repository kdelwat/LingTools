import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const App = () => (
	<div className={css(styles.text)}>
		<h2>Hello, world.</h2>
	</div>
);

const styles = StyleSheet.create({
	text: {
		color: 'red',
	},
});

export default App;

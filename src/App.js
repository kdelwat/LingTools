import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Block, { Container } from './components/Layout';

const App = () => (
	<Container>
		<Block width={'100%'}>
			<h1>Welcome to the site!</h1>
		</Block>
		<Block width={'50%'} mobileWidth={'100%'}>
			<h2 className={css(styles.text)}>Hello, world!</h2>
		</Block>
		<Block width={'50%'} mobileWidth={'100%'}>
			<h2 className={css(styles.text)}>How you doin?</h2>
		</Block>
	</Container >
);

const styles = StyleSheet.create({
	text: {
		color: 'red',
	},
});

export default App;

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Block, { Container } from './components/Layout';

const GrammarGen = () => (
	<Container>
		<Block width={'100%'}>
			<h1>Welcome to GrammarGen!</h1>
		</Block>
		<Block width={'50%'} mobileWidth={'100%'}>
			<h2 className={css(styles.text)}>How bout we do some grammar!</h2>
		</Block>
		<Block width={'50%'} mobileWidth={'100%'}>
			<h2 className={css(styles.text)}>Yeah nah sounds good</h2>
		</Block>
	</Container >
);

const styles = StyleSheet.create({
	text: {
		color: 'red',
	},
});

export default GrammarGen;

import React from 'react';
import Block, { Container } from './components/Layout';

const Home = () => (
	<Container>
		<Block width={'100%'}>
			<h1>Welcome to the site!</h1>
		</Block>
		<Block width={'50%'} mobileWidth={'100%'}>
			<h2>Hello, world!</h2>
		</Block>
		<Block width={'50%'} mobileWidth={'100%'}>
			<h2>How you doin?</h2>
		</Block>
	</Container >
);

export default Home;

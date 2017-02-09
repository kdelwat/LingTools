import React from 'react';

import Block, { Container } from './components/Layout';
import { NotificationArea, addNotification } from './components/Notifications';


const Home = () => (
	<Container>
		<NotificationArea />
		<Block width={'100%'}>
			<h1>Welcome to the site!</h1>
			<button onClick={() => addNotification('An error occured', 'warning')} />
			<button onClick={() => addNotification('An info occured', 'info')} />

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

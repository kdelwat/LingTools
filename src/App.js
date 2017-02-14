import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './styles/main.scss';

import Home from './Home';
import Coda from './Coda';
import NavigationBar from './components/NavigationBar';

const App = () => (
	// Adding a random key to the Router prevents the hot module reloader from
	// complaining about Routes being changed.
	<Router key={Math.random()} history={browserHistory}>
		<Route path="/" component={NavigationContainer}>
			<IndexRoute component={Home} />
			<Route path="Coda" component={Coda} />
		</Route>
	</Router>
);

function NavigationContainer(props) {
	return (
		<div>
			<NavigationBar
				url={props.location.pathname}
				links={[
					{ url: '/coda', text: 'Coda' },
				]}
			/>

			{props.children}
		</div>
	);
}

export default App;

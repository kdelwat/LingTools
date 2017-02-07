import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './GlobalStyles';

import Home from './Home';
import GrammarGen from './GrammarGen';
import NavigationBar from './components/NavigationBar';

const App = () => (
	// Adding a random key to the Router prevents the hot module reloader from
	// complaining about Routes being changed.
	<Router key={Math.random()} history={browserHistory}>
		<Route path="/" component={NavigationContainer}>
			<IndexRoute component={Home} />
			<Route path="grammargen" component={GrammarGen} />
		</Route>
	</Router>
);

function NavigationContainer(props) {
	return (
		<div>
			<NavigationBar
				url={props.location.pathname}
				links={[
					{ url: '/', text: 'Home' },
					{ url: '/grammargen', text: 'GrammarGen' },
				]}
			/>

			{props.children}
		</div>
	);
}

export default App;

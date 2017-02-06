import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { StyleSheet, css } from 'aphrodite';

import Home from './Home';
import GrammarGen from './GrammarGen';

const App = () => (
	<Router history={browserHistory}>
		<Route path="/" component={NavigationContainer}>
			<IndexRoute component={Home} />
			<Route path="/grammargen" component={GrammarGen} />
		</Route>
	</Router>
);

function NavigationContainer(props) {
	return (
		<div>
			<div className={css(styles.navigationBar)}>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/grammargen">GrammarGen</Link></li>
				</ul>
			</div>

			{props.children}
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

export default App;

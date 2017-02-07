import React from 'react';
import { Link, browserHistory } from 'react-router';

import TiBackspace from 'react-icons/lib/ti/backspace';

/* NavigationBar is a component which creates a navigation bar. It takes the
current URL as a prop. If the current URL is the index, a full navigation bar
is displayed, with links from a prop shown. Otherwise, the name of the current
route is shown and a back button displayed.

Props:
	- url (required): a string of the current URL.
	- links (required): an array of link objects, each of which must contain a
	'url' key representing the url and a 'text' key representing the link's
	display text.
*/
function NavigationBar(props) {
	// Render the index navigation if on the root url
	if (props.url === '/') {
		return (
			<nav className="nav has-shadow">
				<div className="nav-center">
					{props.links.map(renderLink)}
				</div>
			</nav>
		);
	}

	// Otherwise, render the normal navigation bar with a back link
	return (
		<section className="hero is-primary is-small">
			<div className="hero-head">
				<nav className="nav">
					<div className="nav-left">
						<a className="nav-item" onClick={() => browserHistory.goBack()}>
							<TiBackspace className="icon" />
						</a>
					</div>
				</nav>
			</div>

			<div className="hero-body">
				<div className="container has-text-centered">
					<h1 className="title">
						{props.url.slice(1).toUpperCase()}
					</h1>
				</div>
			</div>
		</section>
	);
}

// Render a link item from a link object
function renderLink(link) {
	return (
		<a key={link.url} className="nav-item"><Link to={link.url}>{link.text}</Link></a>
	);
}

export default NavigationBar;

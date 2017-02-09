import React from 'react';
import { Link } from 'react-router';

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
	const currentUrl = props.url.slice(1);

	let currentTitle = 'Home';

	props.links.forEach((link) => {
		if (link.url.slice(1) === currentUrl) {
			currentTitle = link.text;
		}
	});

	return (
		<div>
			<nav className="nav has-shadow">
				<div className="nav-left">
					<a key={'/'} className="nav-item is-home">
						<Link to={'/'}>SMOOTHIE</Link>
					</a>
				</div>

				<div className="nav-right">
					{props.links.map(link => renderLink(link, currentUrl))}
				</div>
			</nav>

			<section className="hero is-primary is-small">
				<div className="hero-body">
					<div className="container has-text-centered">
						<h1 className="title">
							{currentTitle}
						</h1>
					</div>
				</div>
			</section>
		</div>
	);
}

// Render a link item from a link object
function renderLink(link, currentUrl) {
	let classes = 'nav-item is-tab';

	if (link.url.slice(1) === currentUrl) {
		classes += ' is-active';
	}

	return (
		<a key={link.url} className={classes}>
			<Link to={link.url}>{link.text}</Link>
		</a>
	);
}

export default NavigationBar;

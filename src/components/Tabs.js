import React, { Component } from 'react';

/* Tab is a simple Component which is designed to be added to the Tabs
component. It should be supplied a title prop, which will be displayed in the
tab selector. Its children will be rendered in the tabs body when it is active.
*/
export function Tab(props) {
	return (
		<div className="tab-body">
			{props.children}
		</div>
	);
}

/* Tabs is a component which implements a tabbed navigation bar. Its direct
children should all be Tab components. Tabs renders a header, containing all
tab titles, which allows the selection of the active tab. This active tab is
then rendered below the header. */
class Tabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 0,
		};

		this.renderTab = this.renderTab.bind(this);
		this.changeTab = this.changeTab.bind(this);
	}

	// Set the active tab to the new index.
	changeTab(index) {
		this.setState({ tab: index });
	}

	// Render a tab link in the header, adding a special class if the tab is active.
	renderTab(tab, index) {
		return (
			<li key={index} {...this.state.tab === index ? { className: 'is-active' } : {}}>
				<a onClick={() => this.changeTab(index)}>{tab.props.title}</a>
			</li>
		);
	}


	render() {
		return (
			<div>
				<div className="tabs">
					<ul>
						{this.props.children.map(this.renderTab)}
					</ul>
				</div>
				{this.props.children[this.state.tab]}
			</div>
		);
	}
}

export default Tabs;

import React, { Component } from 'react';

export function Tab(props) {
	return (
		<div>
			{props.children}
		</div>
	);
}

class Tabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 0,
		};

		this.renderTab = this.renderTab.bind(this);
		this.changeTab = this.changeTab.bind(this);
	}

	changeTab(index) {
		this.setState({ tab: index });
	}

	renderTab(tab, index) {
		if (this.state.tab === index) {
			return (
				<li key={index} className="is-active">
					<a onClick={() => this.changeTab(index)}>{tab.props.title}</a>
				</li>
			);
		}

		return (
			<li key={index}>
				<a onClick={() => this.changeTab(index)}>{tab.props.title}</a>
			</li>
		);
	}

	render() {
		return (
			<div className="tabs">
				<ul>
					{this.props.children.map(this.renderTab)}
				</ul>
			</div>
		);
	}
}

export default Tabs;

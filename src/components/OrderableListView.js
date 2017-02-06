import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class OrderableListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['1', '2'],
		};

		this.addItem = this.addItem.bind(this);
	}

	addItem() {
		const { items } = this.state;
		this.setState({
			items: [Math.random(), ...items],
		});
	}

	renderListItem(listItem) {
		return (
			<div className={css(styles.item)}>{listItem}</div>
		);
	}

	render() {
		return (
			<div className={css(styles.outer)}>
				<div className={css(styles.inner)}>
					{this.state.items.map(this.renderListItem)}
				</div>
				<a className={css(styles.addItemButton)} onClick={this.addItem}>Add</a>
			</div>
		);
	}
}

const styles = StyleSheet.create({
	outer: {
		border: '1px solid orange',
	},
	item: {
		color: 'purple',
	},
	addItemButton: {
		color: 'yellow',
	},
});

export default OrderableListView;

import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class OrderableListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: ['one', 'two'],
		};
	}

	renderListItem(listItem) {
		return (
			<div className={css(styles.item)}>{listItem}</div>
		);
	}

	render() {
		return (
			<div className={css(styles.outer)}>
				{this.state.items.map(this.renderListItem)}
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
});

export default OrderableListView;

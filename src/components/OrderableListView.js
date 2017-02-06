import React from 'react';
import { StyleSheet, css } from 'aphrodite';

class OrderableListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.initial ? props.initial : [],
		};

		this.renderListItem = this.renderListItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.promoteItem = this.promoteItem.bind(this);
		this.demoteItem = this.demoteItem.bind(this);
	}

	addItem() {
		const { items } = this.state;
		const newValue = this.props.addFunction();

		this.setState({
			items: [...items, newValue],
		});
	}

	promoteItem(index) {
		if (index === 0) {
			return;
		}

		const { items } = this.state;

		const promotedItem = items[index];
		items[index] = items[index - 1];
		items[index - 1] = promotedItem;

		this.setState({
			items,
		});
	}

	demoteItem(index) {
		const { items } = this.state;

		if (index === items.length - 1) {
			return;
		}

		const demotedItem = items[index];
		items[index] = items[index + 1];
		items[index + 1] = demotedItem;

		this.setState({
			items,
		});
	}

	renderListItem(listItem, index) {
		return (
			<div className={css(styles.item)}>
				{listItem} {index}
				<a onClick={() => this.promoteItem(index)}>Promote</a>
				<a onClick={() => this.demoteItem(index)}>Demote</a>
			</div>
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

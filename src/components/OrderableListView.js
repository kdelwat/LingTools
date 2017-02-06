import React from 'react';
import { StyleSheet, css } from 'aphrodite';

/* OrderableListView is a component which creates a list of items. Each item
can be promoted, demoted, or deleted from the list. There is an add button,
which adds a new item based on an add function passed to the component as a
prop.

Props:
	- initial (optional): an array of initial list values.
	- addFunction (required): a function which takes no arguments and returns a new item.
*/
class OrderableListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.initial ? props.initial : [],
		};

		this.renderItem = this.renderItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.promoteItem = this.promoteItem.bind(this);
		this.demoteItem = this.demoteItem.bind(this);
	}

	// Call the add function specified in props and add the return value to the
	// end of the list.
	addItem() {
		const { items } = this.state;
		const newValue = this.props.addFunction();

		this.setState({
			items: [...items, newValue],
		});
	}

	// Move the item specified by index up one position in the list
	promoteItem(index) {
		// If the item is already first, don't do anything
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

	// Move the item specified by index down one position in the list
	demoteItem(index) {
		const { items } = this.state;

		// If the item is already the last item, don't do anything
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

	// Delete the item specified by index
	deleteItem(index) {
		const { items } = this.state;

		items.splice(index, 1);

		this.setState({
			items,
		});
	}

	// Given a list item and its index, render the item and its controls.
	renderItem(listItem, index) {
		return (
			<div className={css(styles.item)}>
				{listItem} {index}
				<a onClick={() => this.promoteItem(index)}>Promote</a>
				<a onClick={() => this.demoteItem(index)}>Demote</a>
				<a onClick={() => this.deleteItem(index)}>Delete</a>
			</div>
		);
	}

	render() {
		return (
			<div className={css(styles.outer)}>
				<div className={css(styles.inner)}>
					{this.state.items.map(this.renderItem)}
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

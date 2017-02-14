import React from 'react';

import TiArrowSortedUp from 'react-icons/lib/ti/arrow-sorted-up';
import TiArrowSortedDown from 'react-icons/lib/ti/arrow-sorted-down';
import TiDelete from 'react-icons/lib/ti/delete';
import TiCloudStorage from 'react-icons/lib/ti/cloud-storage';

/* OrderableListView is a component which creates a list of items. Each item
can be promoted, demoted, or deleted from the list. There is an add button,
which adds a new item based on an add function passed to the component as a
prop.

Props:
	- items (required): an array of items to render in the list.
	- onUpdate (required): a callback which is passed the new items when a change is made.
	- displayFunction (optional): a function that takes each item and returns a string for
	rendering, useful for arrays of objects (e.g. {item => item.name})
	- addFunction: a function that returns a new item when invoked. If an addFunction is specified,
	an add button will be rendered to trigger it.
	- title (optional): a string to display as the list title.
    - removable (optional): a boolean (default false) that determines whether a remove option is
	present for list items.
*/
class OrderableListView extends React.Component {
	constructor(props) {
		super(props);

		this.update = this.update.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.renderAddButton = this.renderAddButton.bind(this);
		this.addItem = this.addItem.bind(this);
		this.promoteItem = this.promoteItem.bind(this);
		this.demoteItem = this.demoteItem.bind(this);
	}

	// Update the parent component with the new list.
	update(items) {
		this.props.onUpdate(items);
	}

	// Call the add function specified in props and add the return value to the
	// end of the list.
	addItem() {
		const items = this.props.items;
		const newValue = this.props.addFunction();

		this.update([...items, newValue]);
	}

	// Move the item specified by index up one position in the list
	promoteItem(index) {
		// If the item is already first, don't do anything
		if (index === 0) {
			return;
		}

		const items = this.props.items;

		const promotedItem = items[index];
		items[index] = items[index - 1];
		items[index - 1] = promotedItem;

		this.update(items);
	}

	// Move the item specified by index down one position in the list
	demoteItem(index) {
		const items = this.props.items;

		// If the item is already the last item, don't do anything
		if (index === items.length - 1) {
			return;
		}

		const demotedItem = items[index];
		items[index] = items[index + 1];
		items[index + 1] = demotedItem;

		this.update(items);
	}

	// Delete the item specified by index
	deleteItem(index) {
		const items = this.props.items;
		items.splice(index, 1);
		this.update(items);
	}

	// If there is an addFunction, return an add button. Otherwise return null.
	renderAddButton() {
		if (this.props.addFunction) {
			return (
				<a className="button is-primary" onClick={this.addItem}>
					<span className="icon">
						<TiCloudStorage />
					</span>
				</a>
			);
		}

		return null;
	}

	// If the removable prop is true, return a delete button. Otherwise return null.
	renderDeleteButton(index) {
		if (this.props.removable) {
			return (
				<a onClick={() => this.deleteItem(index)}>
					<span className="icon">
						<TiDelete />
					</span>
				</a>
			);
		}

		return null;
	}

	// Given a list item and its index, render the item and its controls.
	renderItem(listItem, index) {
		let itemString = null;
		if (this.props.displayFunction) {
			itemString = this.props.displayFunction(listItem);
		} else {
			itemString = listItem;
		}
		return (
			<div className="panel-block" key={index}>
				<span className="orderable-list-left">
					{itemString}
				</span>
				<span>
					<a onClick={() => this.promoteItem(index)}>
						<span className="icon">
							<TiArrowSortedUp />
						</span>
					</a>
					<a onClick={() => this.demoteItem(index)}>
						<span className="icon">
							<TiArrowSortedDown />
						</span>
					</a>
					{this.renderDeleteButton(index)}
				</span>
			</div>
		);
	}

	render() {
		return (
			<div className="orderable-list">
				<div className="orderable-list-header">
					<h3 className="orderable-list-title">
						{this.props.title}
					</h3>

					{this.renderAddButton()}
				</div>

				<div className="orderable-list-body">
					{this.props.items.map(this.renderItem)}
				</div>
			</div>
		);
	}
}

export default OrderableListView;

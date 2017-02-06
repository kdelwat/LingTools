import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// The grid's gutter size, in px.
const gutter = 40;
const containerGutter = 40;

// The maximum width of the mobile breakpoint, in px.
const mobileBreakpoint = 800;

function Container(props) {
	return (
		<div className={css(styles.container)}>{props.children}</div>
	);
}

function Block(props) {
	// Create a local stylesheet for overriding width from props.
	// A media query allows overriding of the mobile width; if none is provided
	// the main width is used instead.
	const local = StyleSheet.create({
		block: {
			['@media (max-width: ' + mobileBreakpoint + 'px)']: {
				width: props.mobileWidth ? props.mobileWidth : props.width,
			},
			width: props.width,
		},
	});

	return (
		<div className={css(styles.block, local.block)}>
			<div className={css(styles.innerBlock)}>{props.children}</div>
		</div>
	);
}

const styles = StyleSheet.create({
	block: {
		padding: gutter / 2,
		boxSizing: 'border-box',
	},
	innerBlock: {
		border: '1px solid blue',
	},
	expandedBlock: {
		margin: -gutter,
	},
	container: {
		padding: containerGutter / 2,
		display: 'flex',
		flexWrap: 'wrap',
	},
});

export { Container };
export default Block;

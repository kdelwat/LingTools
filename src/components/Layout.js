import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { defaultColours, colours } from '../CommonStyles';

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
		border: '1px solid rgba(0, 0, 0, 0.2)',
		boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
		borderRadius: 10,
		padding: 20,
		backgroundColor: colours.white,
	},
	expandedBlock: {
		margin: -gutter,
	},
	container: {
		padding: containerGutter / 2,
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: defaultColours.background,
	},
});

export { Container };
export default Block;

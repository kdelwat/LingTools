import React from 'react';

function Container(props) {
	return (
		<div>{props.children}</div>
	);
}

function Block(props) {
	return (
		<div>
			<div>{props.children}</div>
		</div>
	);
}

export { Container };
export default Block;

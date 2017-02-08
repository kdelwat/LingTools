import React from 'react';

function Container(props) {
	return (
		<div className="block-container">{props.children}</div>
	);
}

function Block(props) {
	const style = {
		width: props.width,
	};

	return (
		<div className="block" style={style}>
			<div className="box">{props.children}</div>
		</div>
	);
}

export { Container };
export default Block;

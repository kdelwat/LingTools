import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Form from 'react-jsonschema-form';

import Block, { Container } from './components/Layout';

const nameFormSchema = {
	title: 'Personal Information',
	type: 'object',
	properties: {
		firstName: {
			title: 'First name',
			type: 'string',
		},
		lastName: {
			title: 'Last name',
			type: 'string',
		},
	},
};

class GrammarGen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: 'Paul',
			lastName: 'Hogan',
		};

		this.settingsFormSubmitted = this.settingsFormSubmitted.bind(this);
	}

	settingsFormSubmitted(data) {
		this.setState(data.formData);
	}

	render() {
		return (
			<Container>
				<Block width={'100%'}>
					<h1>Welcome to GrammarGen!</h1>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<h2 className={css(styles.text)}>Gday, {this.state.firstName} {this.state.lastName}!</h2>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<Form
						schema={nameFormSchema}
						onSubmit={this.settingsFormSubmitted}
					/>
				</Block>
			</Container >
		);
	}
}

const styles = StyleSheet.create({
	text: {
		color: 'red',
	},
});

export default GrammarGen;

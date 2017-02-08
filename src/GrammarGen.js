import React from 'react';

import Block, { Container } from './components/Layout';
import OrderableListView from './components/OrderableListView';
import StyledForm from './components/StyledForm';

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

const nameFormUISchema = {
	firstName: {
		'ui:help': 'A help message',
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
					<h2>Gday, {this.state.firstName} {this.state.lastName}!</h2>
					<OrderableListView
						initial={[1, 2]}
						title="Files"
						addFunction={() => Math.random() * 1000}
					/>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={nameFormSchema}
						uiSchema={nameFormUISchema}
						onSubmit={this.settingsFormSubmitted}
					/>
				</Block>
			</Container >
		);
	}
}

export default GrammarGen;

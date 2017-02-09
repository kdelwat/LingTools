import React from 'react';

import Block, { Container } from './components/Layout';
import OrderableListView from './components/OrderableListView';
import StyledForm from './components/StyledForm';

const nameFormSchema = {
	title: 'Personal Information',
	type: 'object',
	required: ['firstName'],
	properties: {
		firstName: {
			title: 'First name',
			type: 'string',
			minLength: 8,
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
			files: [{ name: 'test.md', contents: 'stuff' },
			{ name: 'test2.md', contents: 'stuff' }],
		};

		this.settingsFormSubmitted = this.settingsFormSubmitted.bind(this);
		this.updateFiles = this.updateFiles.bind(this);
	}

	settingsFormSubmitted(data) {
		this.setState(data.formData);
	}

	updateFiles(files) {
		this.setState({ files });
	}

	render() {
		return (
			<Container>
				<Block width={'100%'}>
					<h1>Welcome to GrammarGen!</h1>
					{JSON.stringify(this.state.files)}
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<h2>Gday, {this.state.firstName} {this.state.lastName}!</h2>
					<OrderableListView
						initial={this.state.files}
						onUpdate={this.updateFiles}
						title="Files"
						removable
						itemTransformer={item => item.name}
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

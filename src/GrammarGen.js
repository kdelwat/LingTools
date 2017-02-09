import React from 'react';
import { dataURItoBlob } from 'react-jsonschema-form/lib/utils';

import Block, { Container } from './components/Layout';
import { NotificationArea, addNotification } from './components/Notifications';
import OrderableListView from './components/OrderableListView';
import StyledForm from './components/StyledForm';
import Steps from './components/Steps';

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

const filesSchema = {
	title: 'Source files',
	type: 'object',
	properties: {
		files: {
			type: 'array',
			items: {
				type: 'string',
				format: 'data-url',
			},
		},
	},
};

const validFileTypes = ['text/plain', 'text/markdown'];

class GrammarGen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: 'Paul',
			lastName: 'Hogan',
			files: [],
		};

		this.settingsFormSubmitted = this.settingsFormSubmitted.bind(this);
		this.filesFormSubmitted = this.filesFormSubmitted.bind(this);
		this.updateFiles = this.updateFiles.bind(this);
	}

	settingsFormSubmitted(data) {
		this.setState(data.formData);
	}

	// Convert the files given in the file selector into objects,
	// where name is the filename and blob is the blob containing
	// file data.
	filesFormSubmitted(data) {
		const fileObjects = data.formData.files.map(fileURI => dataURItoBlob(fileURI));

		if (fileObjects.some(file => !validFileTypes.includes(file.blob.type))) {
			addNotification('Files must be Markdown!', 'error');
		} else {
			this.setState({ files: fileObjects });
		}
	}

	updateFiles(files) {
		this.setState({ files });
	}

	stepOne() {
		return (
			<div className="inner-step">
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={filesSchema}
						onSubmit={this.filesFormSubmitted}
					/>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={nameFormSchema}
						uiSchema={nameFormUISchema}
						onSubmit={this.settingsFormSubmitted}
					/>
				</Block>
			</div>
		);
	}

	stepTwo() {
		return (
			<div className="inner-step">
				<Block width={'50%'} mobileWidth={'100%'}>
					<OrderableListView
						items={this.state.files}
						onUpdate={this.updateFiles}
						title="Files"
						removable
						displayFunction={item => item.name + ' ' + item.blob.size}
						addFunction={() => Math.random() * 1000}
					/>
				</Block>

				<Block width={'50%'} mobileWidth={'100%'}>
					<h1>How are you doing today?</h1>
				</Block>
			</div>
		);
	}

	render() {
		return (
			<Container>
				<NotificationArea />
				<Block width={'100%'}>
					<h1>Welcome to GrammarGen!</h1>
					{JSON.stringify(this.state.files)}
				</Block>
				<Steps steps={[this.stepOne(), this.stepTwo()]} />
			</Container >
		);
	}
}

export default GrammarGen;

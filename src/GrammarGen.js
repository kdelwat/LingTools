import React from 'react';
import { dataURItoBlob } from 'react-jsonschema-form/lib/utils';

import Block, { Container } from './components/Layout';
import { NotificationArea, addNotification } from './components/Notifications';
import OrderableListView from './components/OrderableListView';
import StyledForm from './components/StyledForm';
import Steps, { Step } from './components/Steps';
import Tabs, { Tab } from './components/Tabs';

const metadataSchema = {
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

const metadataUISchema = {
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
			title: 'Select files',
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

		this.basicFormSubmitted = this.basicFormSubmitted.bind(this);
		this.filesFormSubmitted = this.filesFormSubmitted.bind(this);
		this.updateFiles = this.updateFiles.bind(this);
	}

	basicFormSubmitted(data) {
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
			addNotification('Files successfully loaded!', 'success');
			this.setState({ files: fileObjects });
		}
	}

	updateFiles(files) {
		this.setState({ files });
	}

	stepOne() {
		return (
			<Step advanceCondition>
				<Block width={'100%'} mobileWidth={'100%'}>
					<div className="content">
						<h3>Introduction</h3>
						<p>GrammarGen requires its input to be in a specific
						format in order to correctly output a grammar. The main
						input is any number of Markdown files. The top-level heading of
						each file (e.g. marked with <code>#</code>) should be the
						title of the chapter. A simple example would look like
						the following:</p>
						<blockquote>
							# Syntax<br /><br />

							The syntax of the language is fairly simple.<br /><br />

							## Alignment<br /><br />

							The language has an ergative-absolutive alignment.<br />
						</blockquote><br />
						<p>In addition, an optional lexicon file can be
						supplied in CSV format, which will be converted into a
						dictionary reference (and in the case of HTML output,
						hoverable definitions!).</p>
					</div>
				</Block>
			</Step>
		);
	}

	stepTwo() {
		return (
			<Step advanceCondition={this.state.files.length > 0}>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Select any number of Markdown files with the button to
						the right. They can be re-ordered in the next step.
						Once you have selected all the desired files,
						press <strong>Validate</strong> to ensure they are the correct
						filetype, then proceed to the next step.
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={filesSchema}
						onSubmit={this.filesFormSubmitted}
						className="file-selector"
					>
						<div>
							<button type="submit" className="button is-info">Validate</button>
						</div>
					</StyledForm>
				</Block>
			</Step>
		);
	}

	stepThree() {
		return (
			<Step advanceCondition>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Use the arrows to place your input files in the order
						they should appear in in the text. The top item is
						first and so on.
					</div>
				</Block>

				<Block width={'50%'} mobileWidth={'100%'}>
					<OrderableListView
						items={this.state.files}
						onUpdate={this.updateFiles}
						title="Source files"
						displayFunction={item => item.name}
					/>
				</Block>
			</Step>
		);
	}

	stepFour() {
		return (
			<Step advanceCondition>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Fill in metadata and other details which will be
						included in the output.
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={metadataSchema}
						uiSchema={metadataUISchema}
						onSubmit={this.basicFormSubmitted}
					/>
				</Block>
			</Step>
		);
	}

	render() {
		return (
			<Container>
				<NotificationArea />
				<Block width={'100%'}>
					<div className="content">
						<p>
							<strong>GrammarGen</strong> is a simple tool allowing the creation of professional-looking language reference grammars from Markdown source. It supports all features of <a href="http://pandoc.org/MANUAL.html">Pandoc Markdown</a> as well as custom linguistics features, which are shown below.
						</p>

					</div>
					<Tabs>
						<Tab title="One">
							<div className="content">
								<p>This is an example feature. It does stuff, in the format:</p>
								<blockquote>@ example,<br />more</blockquote>

							</div>
						</Tab>
						<Tab title="Two">Goodbye</Tab>
					</Tabs>
					{JSON.stringify(this.state)}
				</Block>
				<Steps steps={[this.stepOne(), this.stepTwo(), this.stepThree(), this.stepFour()]} />
			</Container >
		);
	}
}

export default GrammarGen;

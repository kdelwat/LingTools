import React from 'react';
import { dataURItoBlob } from 'react-jsonschema-form/lib/utils';

import Block, { Container } from './components/Layout';
import { NotificationArea, addNotification } from './components/Notifications';
import OrderableListView from './components/OrderableListView';
import StyledForm from './components/StyledForm';
import Steps, { Step } from './components/Steps';
import Tabs, { Tab } from './components/Tabs';

const baseServerURL = 'http://127.0.0.1:5000';

const metadataSchema = {
	title: 'Metadata',
	type: 'object',
	required: ['author', 'grammarTitle'],
	properties: {
		grammarTitle: {
			title: 'Title',
			type: 'string',
		},
		grammarSubtitle: {
			title: 'Subtitle',
			type: 'string',
		},
		author: {
			title: 'Author',
			type: 'string',
		},
	},
};

const formatSchema = {
	title: 'Output settings',
	type: 'object',
	required: ['format'],
	properties: {
		format: {
			title: 'Format',
			type: 'string',
			enum: ['LaTeX PDF', 'HTML'],
		},
	},
};

const latexSettingsSchema = {
	title: 'LaTeX settings',
	type: 'object',
	required: ['layout'],
	properties: {
		layout: {
			title: 'Paper size',
			type: 'string',
			enum: ['A4', 'A5'],
		},
	},
};

const HTMLSettingsSchema = {
	title: 'HTML settings',
	type: 'object',
	required: ['theme'],
	properties: {
		theme: {
			title: 'Theme',
			type: 'string',
			enum: ['Default'],
		},
	},
};

const availableFormatSchemas = {
	'LaTeX PDF': latexSettingsSchema,
	HTML: HTMLSettingsSchema,
	undefined: null,
};

const markdownFilesSchema = {
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

const CSVFileSchema = {
	title: 'Lexicon file',
	type: 'object',
	properties: {
		csv: {
			type: 'string',
			title: 'File',
			format: 'data-url',
		},
	},
};

const CSVSettingsSchema = {
	title: 'Lexicon columns',
	type: 'object',
	required: ['csvColumnWord', 'csvColumnLocal', 'csvColumnDefinition', 'csvColumnPronunciation', 'csvColumnPartOfSpeech'],
	properties: {
		csvColumnWord: {
			type: 'integer',
			title: 'Con-word',
			minimum: 1,
		},
		csvColumnLocal: {
			type: 'integer',
			title: 'Local word',
			minimum: 1,

		},
		csvColumnDefinition: {
			type: 'integer',
			title: 'Definition',
			minimum: 1,

		},
		csvColumnPronunciation: {
			type: 'integer',
			title: 'Pronunciation',
			minimum: 1,

		},
		csvColumnPartOfSpeech: {
			type: 'integer',
			title: 'Part of speech',
			minimum: 1,
		},
	},
};

const validFileTypes = ['text/plain', 'text/markdown'];

class GrammarGen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isGenerating: false,
			author: '',
			grammarTitle: 'My language',
			grammarSubtitle: 'A descriptive grammar and lexicon',
			files: [],
			csvColumnWord: 1,
			csvColumnLocal: 2,
			csvColumnDefinition: 6,
			csvColumnPronunciation: 3,
			csvColumnPartOfSpeech: 4,
		};

		this.genericFormSubmitted = this.genericFormSubmitted.bind(this);
		this.markdownFilesFormSubmitted = this.markdownFilesFormSubmitted.bind(this);
		this.csvFileFormSubmitted = this.csvFileFormSubmitted.bind(this);
		this.addBlankLexicon = this.addBlankLexicon.bind(this);
		this.generateFormSubmitted = this.generateFormSubmitted.bind(this);
		this.updateFiles = this.updateFiles.bind(this);

		this.generate = this.generate.bind(this);
	}

	// Given a relative filename, download the file by making a GET request to the server.
	download(filename) {
		window.open(baseServerURL + '/download?filename=' + filename, 'downloadFileWindow'); // eslint-disable-line no-undef
	}

	// Place all current settings and files into a FormData object and send it to the server.
	generate() {
		console.log('Generating with the following data: ');
		console.log(this.state);

		// Display the generating indicator.
		this.setState({ isGenerating: true });

		const data = new FormData();  // eslint-disable-line no-undef

		// An array of settings which should be sent to the server if available.
		const availableSettings = [
			'grammarTitle',
			'grammarSubtitle',
			'author',
			'format',
			'theme',
			'layout',
			'csvColumnWord',
			'csvColumnLocal',
			'csvColumnDefinition',
			'csvColumnPronunciation',
			'csvColumnPartOfSpeech',
		];

		// Loop through these available settings and add those present in the
		// current state to the FormData object.
		availableSettings.map((setting) => { // eslint-disable-line
			if (this.state[setting]) {
				data.append(setting, this.state[setting]);
			}
		});

		// Add each Markdown file to the FormData, using its filename prepended with a unique
		// index to prevent collisions.
		this.state.files.map((fileObject, index) =>
			data.append(index + fileObject.name, fileObject.blob));

		// Add the CSV file to the FormData, with its filename as the key.
		data.append(this.state.csv.name, this.state.csv.blob);

		// Post the data to the server endpoint.
		const request = new XMLHttpRequest(); // eslint-disable-line no-undef

		// Set a listener to trigger when the POST request is finished.
		request.onreadystatechange = () => {
			if (request.readyState === XMLHttpRequest.DONE) { // eslint-disable-line

				// Disable loading indicator
				this.setState({ isGenerating: false });

				if (request.responseText.startsWith('ERROR')) {
					addNotification(request.responseText.slice(5), 'error');
				} else {
					// After receiving the filename back from the request, download the file.
					this.download(request.responseText);
				}
			}
		};

		request.open('POST', baseServerURL);
		request.send(data);
	}

	// Add a blank lexicon file when the user doesn't want one.
	addBlankLexicon() {
		// Include just a header string, which the server will ignore.
		const blankCSVString = 'Conword,Local,Pronunciation,Type,Gender,Definitions';

		this.setState({
			csv: {
				name: 'lexicon.csv',
				blob: new Blob([blankCSVString], { type: 'text/csv' }), // eslint-disable-line no-undef
			},
		});
	}

	genericFormSubmitted(data) {
		this.setState(data.formData);
	}

	generateFormSubmitted(data) {
		this.setState(data.formData,
			this.generate);
	}

	// Convert the files given in the file selector into objects,
	// where name is the filename and blob is the blob containing
	// file data.
	markdownFilesFormSubmitted(data) {
		if (!data.formData.files) {
			addNotification('No files selected!', 'error');
			return;
		}

		const fileObjects = data.formData.files.map(fileURI => dataURItoBlob(fileURI));

		if (fileObjects.some(file => !validFileTypes.includes(file.blob.type))) {
			addNotification('Files must be Markdown!', 'error');
		} else {
			addNotification('Files successfully loaded!', 'success');
			this.setState({ files: fileObjects });
		}
	}

	csvFileFormSubmitted(data) {
		if (!data.formData.csv) {
			addNotification('No file selected!', 'error');
			return;
		}

		const fileObject = dataURItoBlob(data.formData.csv);

		if (fileObject.blob.type !== 'text/csv') {
			addNotification('File must be CSV!', 'error');
		} else {
			addNotification('File successfully loaded!', 'success');
			this.setState({ csv: fileObject });
		}
	}

	updateFiles(files) {
		this.setState({ files });
	}

	stepWelcome() {
		return (
			<Step advanceCondition>
				<Block width={'100%'}>
					<div className="content">
						<h3>Introduction</h3>
						<p>
							GrammarGen is a simple tool which
							helps with the creation of professional-looking
							language reference grammars from sources written in
							an extended version
							of <a href="https://en.wikipedia.org/wiki/Markdown">Markdown</a>.
							Currently, both interactive HTML and PDF outputs
							are supported. A lexicon file can also be provided
							to include a translation dictionary in the output!
						</p>
						<p>
							To continue, press <strong>Next</strong> to advance
							to the next step, which will cover input formats.
						</p>
						<h3>Output examples</h3>
						<p>These might be a bit stretched, depending on your screen size.</p>
						<div className="images">
							<img src="http://imgur.com/ix0TLvF.png" alt="Example of LaTeX output" />
							<img src="http://imgur.com/cN4gHMc.png" alt="Example of HTML output" />
						</div>
					</div>
				</Block>
			</Step>
		);
	}

	stepIntroduction() {
		return (
			<Step advanceCondition>
				<Block width={'100%'} mobileWidth={'100%'}>
					<div className="content">
						<h3>Input formats</h3>
						<p>GrammarGen requires its input to be in a specific
						format in order to correctly output a grammar. The main
						input is any number of Markdown files, each
						representing a chapter. The top-level heading of each
						file (e.g. marked with <code>#</code>) should be the
						title of the chapter. A simple example of a syntax
						chapter would look like the following:</p>

						<blockquote>
							# Syntax<br /><br />

							The syntax of the language is fairly simple.<br /><br />

							## Alignment<br /><br />

							The language has an ergative-absolutive alignment.<br />
						</blockquote>

						<p>Input files support all features
						of <a href="http://pandoc.org/MANUAL.html">Pandoc
						Markdown</a>, including embedding web images, as well as a number
						of custom linguistics features:</p>
					</div>

					<Tabs>
						<Tab title="Example">
							<div className="content">
								<p>Examples, including a gloss and translation,
								can be created using the (@) syntax from
								Pandoc.</p>
								<blockquote>
									(@) sentence,<br />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gloss,<br />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;translation<br />
								</blockquote>
								<p>The commas following the sentence and gloss
								must be included. The following is an actual
								example of this feature:</p>
								<blockquote>
									(@) wann-uma maaju-maaju-j ka jinn-u-m,<br />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;see.aux-pst
									kangaroo-pl-nom 2.val.1 eat-an-3rd,<br />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The
									kangaroos ate/were eating.<br />
								</blockquote>
							</div>
						</Tab>

						<Tab title="Word">
							<div className="content">
								<p>To mark a word as a conword, surround it in
								backticks where it appears in the text.</p>
								<blockquote>
									The word `Ngujari`...
								</blockquote>
								<p>This enables special formatting of the word,
								and in the case of HTML output shows its
								definition when hovered over.</p>
							</div>
						</Tab>

						<Tab title="Rule">
							<div className="content">
								<p>Rules defining grammatical constructs can be
								created using a new syntax.</p>
								<blockquote>
									(*)label: rule
								</blockquote>
								<p>The following is an actual
								example of this feature:</p>
								<blockquote>
									(*)Noun Phrase: np = [adj(s)-attr] n [rel(s)]
								</blockquote>
							</div>
						</Tab>
					</Tabs>

					<hr />

					<div className="content">
						<p>In addition, an optional lexicon file can be
						supplied in CSV format, which will be converted into a
						dictionary reference (and in the case of HTML output,
						hoverable definitions!). This can be exported from
						Excel or Libreoffice Calc. While the exact columns of
						the file can be adjusted later in the process, an
						example would look like the following:</p>

						<blockquote>
							Conword,Local,Pronunciation,Type,Gender,Definitions<br />
							bunn,to shine,buːnn,verb,,&quot;To shine as in: The sun shines.&quot;<br />
							bilj,to hop,biːlj,verb,,&quot;Used when referring to kangaroos.&quot;<br />
							bilru,seal,biːlru,noun,animate,&quot;Can also refer to a specific totem.&quot;<br />
						</blockquote>
					</div>
				</Block>
			</Step >
		);
	}

	stepMarkdownFiles() {
		return (
			<Step advanceCondition={this.state.files.length > 0}>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Select any number of Markdown files with the button to
						the right. They can be re-ordered in the next step.
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={markdownFilesSchema}
						onChange={this.markdownFilesFormSubmitted}
						className="file-selector"
					>
						<div />
					</StyledForm>
				</Block>
			</Step>
		);
	}

	stepOrderFiles() {
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

	stepCSVFile() {
		return (
			<Step advanceCondition={this.state.csv}>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Select a CSV file containing your lexicon using the
						input to the right. The columns corresponding to each
						part of the definition can be changed in the next step.
						The first row will be skipped, so headers should be at
						the top of the file.
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={CSVFileSchema}
						onChange={this.csvFileFormSubmitted}
						className="file-selector"
					>
						<div />
					</StyledForm>

					<button
						className="button is-info is-fullwidth"
						onClick={this.addBlankLexicon}
					>
						No lexicon
					</button>
				</Block>
			</Step>
		);
	}

	stepCSVColumns() {
		return (
			<Step advanceCondition>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						If needed, change the columns in the CSV file that
						correspond to each part of the word definitions. The
						first column is number 1. Make sure that the columns
						are all different!
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={CSVSettingsSchema}
						liveValidate
						onChange={this.genericFormSubmitted}
						formData={this.state}
					>
						<div />
					</StyledForm>
				</Block>
			</Step>
		);
	}

	stepMetadata() {
		return (
			<Step advanceCondition={this.state.author.length > 0 && this.state.grammarTitle.length > 0}>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Fill in metadata and other details which will be
						included in the output.
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={metadataSchema}
						onChange={this.genericFormSubmitted}
						formData={this.state}
					>
						<div />
					</StyledForm>
				</Block>
			</Step>
		);
	}

	stepGenerate() {
		let formatSettingsForm = null;

		// Signify loading through button styling
		let buttonClass = 'button is-success';

		if (this.state.isGenerating) {
			buttonClass += ' is-loading';
		}

		if (this.state.format) {
			const formatSettingsSchema = availableFormatSchemas[this.state.format];
			formatSettingsForm = (
				<StyledForm
					schema={formatSettingsSchema}
					onSubmit={this.generateFormSubmitted}
					formData={this.state}
				>
					<div>
						<button type="submit" className={buttonClass}>Generate</button>
					</div>
				</StyledForm>);
		}

		return (
			<Step advanceCondition>
				<Block width={'50%'} mobileWidth={'100%'}>
					<div className="content">
						Choose desired output settings and
						press <strong>Generate</strong> to create your grammar. You
						may need to allow pop-ups on this site for the download
						to work. LaTeX generation will take some time!
					</div>
				</Block>
				<Block width={'50%'} mobileWidth={'100%'}>
					<StyledForm
						schema={formatSchema}
						onChange={this.genericFormSubmitted}
						formData={this.state}
					>
						<div />
					</StyledForm>
					{formatSettingsForm}
				</Block>
			</Step>
		);
	}

	render() {
		return (
			<Container>
				<NotificationArea />
				<Steps
					steps={[
						this.stepWelcome(),
						this.stepIntroduction(),
						this.stepMarkdownFiles(),
						this.stepOrderFiles(),
						this.stepCSVFile(),
						this.stepCSVColumns(),
						this.stepMetadata(),
						this.stepGenerate()]}
				/>
			</Container >
		);
	}
}

export default GrammarGen;

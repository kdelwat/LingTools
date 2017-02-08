import React from 'react';
import Form from 'react-jsonschema-form';

import Block, { Container } from './components/Layout';
import OrderableListView from './components/OrderableListView';

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

function CustomFieldTemplate(props) {
	if (props.id === 'root') {
		return (
			<div>
				{props.children}
			</div>
		);
	}

	return (
		<div className="form-row">
			<label htmlFor={props.id} className="label">{props.label}</label>
			<p className="control">
				{props.children}
			</p>
		</div>
	);
}

function FormTitle({ title }) {
	return (
		<label htmlFor="root" className="form-title">{title}</label>
	);
}

const fields = {
	TitleField: FormTitle,
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
					<Form
						schema={nameFormSchema}
						onSubmit={this.settingsFormSubmitted}
						fields={fields}
						FieldTemplate={CustomFieldTemplate}
					/>
				</Block>
			</Container >
		);
	}
}

export default GrammarGen;

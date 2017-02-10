import React from 'react';
import Form from 'react-jsonschema-form';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';
import TiWarning from 'react-icons/lib/ti/warning';

// Render a help tooltip when hovering over an icon.
function HelpTooltip(props) {
	return (
		<span className="form-help">
			<FaQuestionCircle />
			<div className="box content help-message">{props.message}</div>
		</span>
	);
}

// Render an error message from a given string, to go under the field.
function renderError(error) {
	return (
		<span className="help is-danger"><TiWarning /> {error}</span>
	);
}

// A template which overrides the default of react-jsonschema-form.
function CustomFieldTemplate(props) {
	// If rendering the root element, just return its children unchanged.
	if (props.id === 'root') {
		return (
			<div>
				{props.children}
			</div>
		);
	}

	// If a help message is present, add a tooltip to the label.
	let helpMessage = null;
	if (props.help.props.help) {
		helpMessage = <HelpTooltip message={props.help} />;
	}

	// Otherwise, correctly format the label and children with Bulma classes.
	return (
		<div className="form-row">
			<label htmlFor={props.id} className="label">
				{props.label}{props.required ? '*' : null}
				{helpMessage}
			</label>
			<div className="control">
				{props.children}
				{props.rawErrors ? props.rawErrors.map(renderError) : null}
			</div>
		</div>
	);
}

// Override default title styling.
function FormTitle({ title }) {
	return (
		<label htmlFor="root" className="form-title">{title}</label>
	);
}

const fields = {
	TitleField: FormTitle,
};

// StyledForm returns a customised Form component. All usual props
// can be passed through normally.
function StyledForm(props) {
	return (
		<Form
			{...props}
			fields={fields}
			showErrorList={false}
			FieldTemplate={CustomFieldTemplate}
		>
			{props.children}
		</Form>
	);
}

export default StyledForm;

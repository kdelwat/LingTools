import React from 'react';
import Form from 'react-jsonschema-form';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';

// Render a help tooltip when hovering over an icon.
function HelpTooltip(props) {
	return (
		<span className="form-help">
			<FaQuestionCircle />
			<div className="box content help-message">{props.message}</div>
		</span>
	);
}

// A template which overrides the default of react-jsonschema-form.
function CustomFieldTemplate(props) {
	console.log(props.help);
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
			<label htmlFor={props.id} className="label">{props.label}
				{helpMessage}
			</label>
			<p className="control">
				{props.children}
			</p>
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
			FieldTemplate={CustomFieldTemplate}
		/>
	);
}

export default StyledForm;

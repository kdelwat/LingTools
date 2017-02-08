import React from 'react';
import Form from 'react-jsonschema-form';

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

	// Otherwise, correctly format the label and children with Bulma classes.
	return (
		<div className="form-row">
			<label htmlFor={props.id} className="label">{props.label}</label>
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

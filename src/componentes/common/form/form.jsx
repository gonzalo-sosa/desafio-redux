import { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};

    error.details.forEach((d) => {
      errors[d.path[0]] = d.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema && this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    if (input.name in data) data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Call the server
    if (this.doSubmit) this.doSubmit();
  };

  renderSelect({ name, label, options }) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  }

  renderInput({
    name,
    label,
    value,
    type = 'text',
    autoFocus = false,
    ...rest
  }) {
    const { data, errors } = this.state;

    return (
      <Input
        {...rest}
        autoFocus={autoFocus}
        type={type}
        id={name}
        name={name}
        value={value ?? data[name]}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={!!this.validate()}
        type="submit"
        className="btn btn-primary mt-2"
      >
        {label}
      </button>
    );
  }
}

export default Form;

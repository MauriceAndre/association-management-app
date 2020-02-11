import React, { Component } from "react";
import { Form as SemanticForm } from "semantic-ui-react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Button from "./button";
import Checkbox from "./checkbox";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    wasValidated: false
  };

  static Container = SemanticForm;
  static Group = SemanticForm.Group;
  static Input = ({ name, scope, ...rest }) => {
    const { data, errors } = scope.state;
    const error = errors[name];

    return (
      <Input
        name={name}
        value={data[name]}
        onChange={scope.handleChange}
        error={error && { content: error }}
        {...rest}
      />
    );
  };
  static Select = ({ name, scope, ...rest }) => {
    const { data, errors } = scope.state;
    const error = errors[name];

    return (
      <Select
        name={name}
        value={data[name]}
        onChange={(event, currentTarget) =>
          scope.handleChange({ currentTarget })
        }
        error={error && { content: error }}
        {...rest}
      />
    );
  };
  static Button = ({ ...rest }) => {
    return <Button {...rest} />;
  };
  static Checkbox = ({ name, scope, ...rest }) => {
    const { data, errors } = scope.state;
    const error = errors[name];

    return (
      <Checkbox
        name={name}
        value={data[name]}
        onChange={scope.handleChange}
        error={error && { content: error }}
        {...rest}
      />
    );
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {}, wasValidated: true });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
}

export default Form;

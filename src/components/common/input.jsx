import React from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

const Input = ({ name, label, placeholder, ...rest }) => {
  return (
    <Form.Input
      id={name}
      name={name}
      label={label}
      placeholder={placeholder || label}
      {...rest}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default Input;

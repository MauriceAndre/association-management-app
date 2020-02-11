import React from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

const Select = ({ name, label, placeholder, ...rest }) => {
  return (
    <Form.Select
      id={name}
      name={name}
      label={label}
      placeholder={placeholder || label}
      {...rest}
    />
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default Select;

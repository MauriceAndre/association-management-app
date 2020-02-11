import React from "react";
import { Form } from "semantic-ui-react";
import PropTypes from "prop-types";

const Checkbox = ({ name, ...rest }) => {
  return <Form.Checkbox id={name} name={name} {...rest} />;
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired
};

export default Checkbox;

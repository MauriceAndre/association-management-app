import React from "react";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";
import PropTypes from "prop-types";

const Checkbox = ({ name, ...rest }) => {
  return <SemanticCheckbox id={name} name={name} {...rest} />;
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired
};

export default Checkbox;

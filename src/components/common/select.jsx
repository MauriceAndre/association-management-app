import React from "react";
import { Select as SemanticSelect } from "semantic-ui-react";
import PropTypes from "prop-types";

const Select = ({ name, label, placeholder, ...rest }) => {
  return (
    <SemanticSelect
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

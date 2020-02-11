import React, { Component } from "react";
import { Button as SemanticButton } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Button extends Component {
  static Group = SemanticButton.Group;

  render() {
    let { text, to, onClick, ...rest } = this.props;
    const originOnClick = onClick || function() {};

    if (to) {
      onClick = (event, data) => {
        originOnClick(event, data);
        this.props.history.push(to);
      };
    }

    return text ? (
      <SemanticButton onClick={onClick} {...rest}>
        {text}
      </SemanticButton>
    ) : (
      <SemanticButton onClick={onClick} {...rest} />
    );
  }
}

Button.propTypes = {
  text: PropTypes.string
};

export default withRouter(Button);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

class ProfileDropdown extends Component {
  options = [
    {
      key: "user",
      content: (
        <span>
          Signed in as{" "}
          <strong>{`${this.props.user.firstName} ${this.props.user.lastName}`}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "profile",
      text: "Your Profile",
      onClick: () => this.forwardTo("/profile")
    },
    {
      key: "settings",
      text: "Settings",
      onClick: () => this.forwardTo("/settings")
    },
    {
      key: "sign-out",
      text: "Sign Out",
      onClick: () => this.forwardTo("/logout")
    }
  ];

  forwardTo = url => {
    this.props.history.push(url);
  };

  trigger = (
    <span>
      <Icon name="user" /> {this.props.user.firstName}
    </span>
  );

  render() {
    return (
      <Dropdown
        trigger={this.trigger}
        options={this.options}
        pointing="top right"
      />
    );
  }
}

export default withRouter(ProfileDropdown);

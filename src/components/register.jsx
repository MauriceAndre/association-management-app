import React, { Fragment } from "react";
import Joi from "joi-browser";
import { Header } from "semantic-ui-react";
import userService from "../services/userService";
import logger from "../services/logService";
import feedback from "../utils/feedback";
import UserContext from "./../context/userContext";
import Form from "./common/form";

class Register extends Form {
  static contextType = UserContext;

  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: ""
    },
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Last Name"),
    email: Joi.string()
      .min(3)
      .max(255)
      .email()
      .required()
      .label("Email"),
    password1: Joi.string()
      .min(6)
      .max(255)
      .required()
      .label("Password"),
    password2: Joi.string()
      .min(6)
      .max(255)
      .required()
      .label("Password")
  };

  doSubmit() {
    if (!this.validatePasswords()) return;

    this.register();
  }

  validatePasswords() {
    const { password1, password2 } = this.state.data;

    if (password1 !== password2) {
      const errors = { ...this.state.errors };
      errors.password2 = "Password has to match with above.";
      this.setState({ errors });
      return false;
    }

    return true;
  }

  register = async () => {
    try {
      const user = this.mapToRequestObj();
      await userService.register(user);
      this.context.updateCurrentUser();

      feedback.register();
      this.props.history.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      logger.log(ex.response.data);
    }
  };

  mapToRequestObj() {
    const { lastName, firstName, email, password1: password } = this.state.data;
    return {
      lastName,
      firstName,
      email,
      password
    };
  }

  render() {
    return (
      <Fragment>
        <Header as="h1">Register</Header>
        <Form.Container onSubmit={this.handleSubmit}>
          <Form.Input name="firstName" label="First Name" scope={this} />
          <Form.Input name="lastName" label="Last Name" scope={this} />
          <Form.Input name="email" label="Email" scope={this} />
          <Form.Input
            type="password"
            name="password1"
            label="Password"
            scope={this}
          />
          <Form.Input
            type="password"
            name="password2"
            label="Confirm Password"
            placeholder="Re-enter Password"
            scope={this}
          />
          <Form.Button type="submit" text="Register" />
        </Form.Container>
      </Fragment>
    );
  }
}

export default Register;

import React, { Fragment } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import UserContext from "./../context/userContext";
import { Header } from "semantic-ui-react";
import feedback from "../utils/feedback";

class Login extends Form {
  static contextType = UserContext;

  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    this.login();
  };

  login = async () => {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
      this.context.updateCurrentUser();

      feedback.login();

      const { state } = this.props.location;
      const route = state ? state.from.pathname : "/";
      this.props.history.replace(route);
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Fragment>
        <Header as="h1">Login</Header>
        <Form.Container onSubmit={this.handleSubmit}>
          <Form.Input name="email" label="Email" scope={this} />
          <Form.Input
            type="password"
            name="password"
            label="Password"
            scope={this}
          />
          <Form.Button type="submit" text="Login" />
        </Form.Container>
      </Fragment>
    );
  }
}

export default Login;

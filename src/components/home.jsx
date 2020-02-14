import React, { Component, Fragment } from "react";
import { Header } from "semantic-ui-react";

class Home extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          Association Management
        </Header>
      </Fragment>
    );
  }
}

export default Home;

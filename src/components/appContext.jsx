import React, { Component } from "react";
import UserContext from "../context/userContext";
import auth from "../services/authService";

class AppContext extends Component {
  state = { currentUser: null };

  componentDidMount() {
    this.updateCurrentUser();
  }

  updateCurrentUser = () => {
    const user = auth.getCurrentUser();
    this.setCurrentUser(user);
  };

  setCurrentUser = currentUser => {
    this.setState({ currentUser });
  };

  render() {
    const { currentUser } = this.state;

    return (
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser: this.setCurrentUser,
          updateCurrentUser: this.updateCurrentUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default AppContext;

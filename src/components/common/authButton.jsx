import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function AuthButton() {
  return (
    <Fragment>
      <Link className="btn btn-primary mr-2" to="/login">
        Login
      </Link>
      <Link className="btn btn-outline-primary" to="/register">
        Register
      </Link>
    </Fragment>
  );
}

export default AuthButton;

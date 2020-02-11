import React, { useContext } from "react";
import { Link } from "react-router-dom";
import config from "./../services/configService";
import UserContext from "./../context/userContext";
import ProfileDropdown from "./common/profileDropdown";
import AuthButton from "./common/authButton";
import NavItems from "./common/navItems";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  const navItems = [
    { content: "Driver's Log", to: "/drivers-log", protected: true }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        {config.name}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav mr-auto">
          <NavItems items={navItems} />
        </div>
        <form className="form-inline my-2 my-lg-0">
          {currentUser ? (
            <ProfileDropdown user={currentUser} />
          ) : (
            <AuthButton />
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

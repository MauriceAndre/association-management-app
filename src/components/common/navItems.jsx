import React from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

function NavItems({ items }) {
  return (
    <ul className="navbar-nav mr-auto">
      {items.map((item, idx) => {
        if (item.protected && !auth.getCurrentUser()) return null;

        return (
          <li key={idx} className="nav-item inline">
            <Link className="nav-link" to={item.to}>
              {item.content}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavItems;

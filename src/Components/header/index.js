import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      <Link to="/produtos">
        <img
          src="/images/banner-metostore.png"
          alt="Banner Metostore"
          className="header-banner"
        />
      </Link>
    </div>
  );
}

export default Header;

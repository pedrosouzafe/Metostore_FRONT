import React, { useState } from "react";

import "./Navbar.css";

import { Link } from "react-router-dom"; // Nos ajuda para criar uma Single Page Application utilizando rotas para o front

// FontAweasome icons
import {
  faBars,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [show, setShow] = useState(false); // useState para setar o estado dos componentes

  return (
    <div className="nav">
      <div className="inner-content">
        <div className="logo">
          <Link to={"/"}>
            <img src="/images/logo-meto.png" alt="Logo Metodista" />

            <h1>
              METO<span>STORE</span>
            </h1>
          </Link>
        </div>

        <nav className={`${show && "show"}`}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>

            <li>
              <Link to={"/produtos"}>Produtos</Link>
            </li>

            <li>
              <Link to={"/sobre"}>Sobre</Link>
            </li>
          </ul>
        </nav>

        <div className="navs-icon-container">
          <div className="search-input-container">
            <input type="text" placeholder="Procurar produto" />
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <button className="shopping-cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <div className="products-count">0</div>
          </button>

          <button className="menu-button" onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

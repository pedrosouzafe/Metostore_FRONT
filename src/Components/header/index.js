import "./Header.css";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="inner-content">
        <div className="left-side">
          <h2>As melhores ofertas para os melhores produtos de tecnologia!</h2>

          <Link to="/produtos" className="see-more-btn">
            <span>Produtos</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <div className="right-side">
          <img src="/images/header-products-img.png" alt="Imagem de Produtos" />
        </div>
      </div>
    </header>
  );
}

export default Header;

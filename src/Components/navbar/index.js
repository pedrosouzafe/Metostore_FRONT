import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import {
  faBars,
  faSearch,
  faShoppingCart,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar({ setSidebarCart, selectedProducts }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pesquisarProdutos = () => {
    if (!query.trim()) return;
    navigate(`/produtos/busca?query=${encodeURIComponent(query)}`);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      pesquisarProdutos();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="nav">
      <div className="inner-content">
        <div className="logo">
          <Link
            to={"/"}
            onClick={() => {
              setQuery("");
            }}
          >
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

            <li
              className={`dropdown ${dropdownOpen ? "open" : ""}`}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span className="dropdown-title">
                Categorias <FontAwesomeIcon icon={faChevronDown} />
              </span>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-section">
                    <h4>Categorias</h4>
                    <Link to="/produtos/busca?categoria=PERIFERICOS">
                      Periféricos
                    </Link>
                    <Link to="/produtos/busca?categoria=HARDWARE">
                      Hardware
                    </Link>
                    <Link to="/produtos/busca?categoria=GAMES">Games</Link>
                    <Link to="/produtos/busca?categoria=SMARTPHONES">
                      Smartphones
                    </Link>
                  </div>

                  <div className="dropdown-section">
                    <h4>Filtrar por</h4>
                    <Link to="/produtos/busca?filtro=price_asc">
                      Preço: menor → maior
                    </Link>
                    <Link to="/produtos/busca?filtro=price_desc">
                      Preço: maior → menor
                    </Link>
                    <Link to="/produtos/busca?filtro=best_rated">
                      Melhor avaliados
                    </Link>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="navs-icon-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Procurar produto"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button onClick={pesquisarProdutos}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <button
            className="shopping-cart"
            onClick={() => setSidebarCart(true)}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <div className="products-count">{selectedProducts.length}</div>
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

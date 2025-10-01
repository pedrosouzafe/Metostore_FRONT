import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="page-inner-content content">
        <div className="logo-footer">
          <Link to={"/"}>
            <h1>
              METO<span>STORE</span>
            </h1>
          </Link>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus hic accusantium quasi corporis nostrum.
          </p>
        </div>
        <div className="links">
          <h3>Links úteis</h3>

          <ul>
            <li>
              <Link to="/">Cupons</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Políticas</Link>
            </li>
            <li>
              <Link to="/">Torne-se afiliado</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="page-inner-content">
        <hr />

        <p className="copyright">
          Copyright 2025 - Metostore - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;

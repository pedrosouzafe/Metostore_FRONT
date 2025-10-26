import "./ExclusiveSection.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ExclusiveSection() {
  return (
    <div className="exclusive-section">
      <div className="page-inner-content">
        <div className="content">
          <div className="left-side">
            <div className="product-content">
              <h2>Console Microsoft Xbox Series S</h2>
              <p>
                A nova geração de consoles é liderada pelo Xbox Series S, que
                chegou ao mercado para impressionar a todos. Sua potência e alto
                desempenho permitem reduzir significativamente o tempo de
                carregamento de jogos e conteúdo em comparação com outros
                consoles. <br/><br/>Além disso, oferece a possibilidade de jogar
                por horas enquanto se diverte com jogadores ao redor do mundo.
              </p>
            </div>
            <Link to={"/produtos/5"} className="see-more-btn">
              <span>Ver Produto</span>
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </Link>
          </div>
          <div className="right-side">
            <Link to={"/produtos/5"}>
              <img
                src="/images/xbox-image.png"
                alt="Console Microsoft Xbox Series S"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExclusiveSection;

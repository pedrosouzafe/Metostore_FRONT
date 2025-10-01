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
              <h2>Smart Band 4</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                unde ab dolores odit dolorem magni magnam reprehenderit odio ut,
                veritatis sunt ea, totam iure iste voluptatem? Aperiam nobis
                dolore accusantium?
              </p>
            </div>
            <Link to={"/products"} className="see-more-btn">
              <span>Ver Produto</span>
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </Link>
          </div>
          <div className="right-side">
            <img src="/images/exclusive.png" alt="Smart Band 4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExclusiveSection;

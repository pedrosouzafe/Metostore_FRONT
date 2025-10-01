import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarProduct.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function SidebarProduct() {
  return (
    <div className="sidebar-product">
      <div className="left-side">
        <button>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
        <div className="details">
          <h4>Nome do produto</h4>
          <p>R$400.00</p>
          <input type="number" min={1} max={100} />
          <p className="price-sum">
            <b>Soma: </b> R$1000
          </p>
        </div>
      </div>

      <div className="right-side">
        <img src="/images/products/product-4.png" alt="Produto" />
      </div>
    </div>
  );
}

export default SidebarProduct;

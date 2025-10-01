import { Link } from "react-router-dom";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

function Product({ id, image, name, rate, price }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="price-rate">
        <p className="price">
          <span>R$</span>
          {price}
        </p>
        <p className="rate">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
      </div>

      <div className="buttons">
        <Link to="/products/123/checkout" className="btn-icon">
          <span>Comprar Agora</span>
          <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>
        </Link>

        <button className="btn-icon add-to-cart-btn">
          <span>Adicionar ao Carrinho</span>
          <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default Product;

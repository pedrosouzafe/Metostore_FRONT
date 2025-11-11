import { Link } from "react-router-dom";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Rate from "../rate";

function Product({ id, image, name, rate, price, addProductToCart }) {
  return (
    <Link to={`/produtos/${id}`}>
      <div className="product">
        <img src={image} alt={name} />
        <p className="name">{name}</p>
        <div className="price-rate">
          <p className="price">
            <span>R$</span>
            {price}
          </p>
          <Rate rate={rate} />
        </div>
        <div className="buttons">
          <button
            className="btn-icon  add-to-cart-list"
            onClick={() => addProductToCart(id)}
          >
            <span>Comprar agora</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Product;

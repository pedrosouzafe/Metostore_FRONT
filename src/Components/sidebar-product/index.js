import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faXmark,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import "./SidebarProduct.css";
import { useState, useRef } from "react";

function SidebarProduct({
  id,
  image,
  name,
  price,
  quantity,
  removeProductFromCart,
  addToCartTotal,
  className = "",
  increaseQuantity,
  decreaseQuantity,
  cartQuantity,
}) {
  const [quantidade, setQuantity] = useState(1);
  const prevQuantity = useRef(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > quantity) return;
    const diff = newQuantity - prevQuantity.current;
    addToCartTotal(diff * price);
    setQuantity(newQuantity);
    prevQuantity.current = newQuantity;
  };

  const totalProductPrice = price * quantidade;

  return (
    <div className={`sidebar-product ${className}`}>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      <div className="product-info">
        <div className="product-header">
          <h4>{name}</h4>
          <button
            className="remove-product-btn"
            onClick={() => {
              removeProductFromCart(id);
              addToCartTotal(-totalProductPrice);
            }}
            title="Remover produto"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <p className="unit-price">R$ {price.toFixed(2)}</p>

        <div className="quantity-control">
          <button onClick={() => decreaseQuantity(id)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            type="number"
            min={1}
            max={quantity}
            value={cartQuantity}
            readOnly
          />
          <button onClick={() => increaseQuantity(id)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <p className={`stock-info ${quantity <= 2 ? "low-stock" : "in-stock"}`}>
          <FontAwesomeIcon icon={faBoxOpen} />
          {quantity === 1 ? " Último disponível" : `${quantity} disponíveis`}
        </p>
      </div>

      <div className="total-sidebar-product">
        <p className="total-label">Total</p>
        <p className="total-price">R$ {totalProductPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default SidebarProduct;

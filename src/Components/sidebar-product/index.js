import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarProduct.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SidebarProduct({
  id,
  image,
  name,
  rate,
  price,
  addProductToCart,
  removeProductFromCart,
  addToCartTotal,
}) {
  const [quantity, setQuantity] = useState(1);
  const [priceSum, setPriceSum] = useState(price);

  const changeCartTotal = () => {};

  return (
    <div className="sidebar-product">
      <div className="left-side">
        <button
          className="remove-product-btn"
          onClick={() => {
            removeProductFromCart(id);
            addToCartTotal(-priceSum);
          }}
        >
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
        <div className="details">
          <h4>{name}</h4>
          <p>R${price}</p>
          <input
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              addToCartTotal(e.target.value * price - priceSum);
              setPriceSum(e.target.value * price);
            }}
          />
          {priceSum > price && (
            <p className="price-sum">
              <b>Valor Total: </b> R${priceSum}
            </p>
          )}
        </div>
      </div>

      <div className="right-side">
        <img src={image} alt={name} />
      </div>
    </div>
  );
}

export default SidebarProduct;

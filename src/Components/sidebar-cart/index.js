import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarCart.css";
import { faMoneyBill, faXmark } from "@fortawesome/free-solid-svg-icons";
import SidebarProduct from "../sidebar-product";
import { Link } from "react-router-dom";

function SidebarCart({
  setSidebarCart,
  showSidebarCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
}) {
  return (
    <aside className={`sidebar-cart ${showSidebarCart && "show"}`}>
      <div className="top">
        <h3>Seu carrinho</h3>
        <button onClick={() => setSidebarCart(false)}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
      </div>

      <div className="sidebar-products-list">
        {selectedProducts.map((product) => (
          <SidebarProduct
            key={product.id}
            {...product}
            removeProductFromCart={removeProductFromCart}
            addToCartTotal={addToCartTotal}
          />
        ))}
      </div>

      {cartTotal === 0 ? (
        <i>Seu carrinho está vazio!</i>
      ) : (
        <>
          <div className="total-container">
            <b>Total: </b> R${cartTotal}
          </div>

          <Link to="/cart/checkout" className="btn-icon">
            <span>Pagar Agora</span>
            <FontAwesomeIcon icon={faMoneyBill} />
          </Link>
        </>
      )}
    </aside>
  );
}

export default SidebarCart;

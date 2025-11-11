import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarCart.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SidebarProduct from "../sidebar-product";
import { Link } from "react-router-dom";

function SidebarCart({
  setSidebarCart,
  showSidebarCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
  setQuantity,
  quantidade,
}) {
  return (
    <aside className={`sidebar-cart ${showSidebarCart ? "show" : ""}`}>
      <div className="top">
        <h3>Seu carrinho</h3>
        <button onClick={() => setSidebarCart(false)}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
      </div>

      <div className="sidebar-products-list">
        {selectedProducts.length === 0 ? (
          <i>Seu carrinho está vazio!</i>
        ) : (
          selectedProducts.map((product) => (
            <SidebarProduct
              setQuantity={setQuantity}
              quantidade={quantidade}
              key={product.id}
              {...product}
              removeProductFromCart={removeProductFromCart}
              addToCartTotal={addToCartTotal}
            />
          ))
        )}
      </div>

      {cartTotal > 0 && (
        <>
          <div className="total-container">
            <b>Total: </b> R${cartTotal.toFixed(2)}
          </div>

          <Link to="/cart/checkout" className="add-to-cart">
            <span>Finalizar Pedido</span>
          </Link>
        </>
      )}
    </aside>
  );
}

export default SidebarCart;

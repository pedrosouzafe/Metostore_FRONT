import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarCart.css";
import { faMoneyBill, faXmark } from "@fortawesome/free-solid-svg-icons";
import SidebarProduct from "../sidebar-product";
import { Link } from "react-router-dom";

function SidebarCart() {
  return (
    <aside className="sidebar-cart">
      <div className="top">
        <h3>Seu carrinho</h3>
        <button>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
      </div>

      <div className="sidebar-products-list">
        <SidebarProduct></SidebarProduct>
      </div>

      <div className="total-container">
        <b>Total: </b> R$3000.00
      </div>

      <Link to="/cart/checkout" className="btn-icon">
        <span>Pagar Agora</span>
        <FontAwesomeIcon icon={faMoneyBill} />
      </Link>

      <i>Seu carrinho está vazio!</i>
    </aside>
  );
}

export default SidebarCart;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading-spinner";
import SidebarProduct from "../sidebar-product";
import "./CheckoutSection.css";

function CheckoutSection({
  selectedProducts,
  cartTotal,
  addToCartTotal,
  removeProductFromCart,
  setLoading,
  loading,
  user,
  increaseQuantity,
  decreaseQuantity,
  setSelectedProducts,
}) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const postOrders = async () => {
    if (cartTotal === 0) {
      alert("Adicione produtos ao carrinho!");
      return;
    }

    setLoading(true);

    const newProducts = selectedProducts.map((prod) => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      quantity: prod.cartQuantity,
    }));

    const body = {
      user: user.id,
      total: cartTotal,
      items: newProducts,
    };

    console.log("Pedido enviado:", JSON.stringify(body));

    setTimeout(() => {
      fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao finalizar compra");
          return res.json();
        })
        .then(() => {
          setShowModal(true);

          setSelectedProducts([]);
          addToCartTotal(0);

          setTimeout(() => {
            setShowModal(false);
            navigate("/");
          }, 3000);
        })
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
    }, 2500);
  };

  return (
    <div className="checkout-section">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="checkout-container">
          <div className="checkout-products">
            <h2>Meus Itens</h2>

            {selectedProducts.length === 0 ? (
              <p className="empty-cart">Seu carrinho está vazio 😢</p>
            ) : (
              <div className="products-list-checkout">
                {selectedProducts.map((product) => (
                  <SidebarProduct
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    key={product.id}
                    {...product}
                    removeProductFromCart={removeProductFromCart}
                    addToCartTotal={addToCartTotal}
                    className="checkout-version"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="checkout-summary">
            <h2>Resumo da Compra</h2>

            <div className="summary-details">
              <div className="summary-line">
                <p>Produtos:</p>
                <p>R$ {cartTotal.toFixed(2)}</p>
              </div>
              <div className="summary-line">
                <p>Frete:</p>
                <p className="free-shipping">Grátis</p>
              </div>
              <div className="summary-total">
                <p>Total:</p>
                <p>R$ {cartTotal.toFixed(2)}</p>
              </div>
            </div>

            <button
              className="checkout-button"
              onClick={postOrders}
              disabled={loading}
            >
              {loading ? <div className="spinner"></div> : "Finalizar Compra"}
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Compra realizada com sucesso! 🎉</h3>
            <p>
              Obrigado por comprar conosco,{" "}
              {user.name?.split(" ")[0] || "cliente"}!
            </p>
            <p>Redirecionando para a Home...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutSection;

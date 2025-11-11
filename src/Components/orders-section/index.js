import { useEffect, useState } from "react";
import "./OrdersSection.css";
import LoadingSpinner from "../loading-spinner";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function OrdersSection({ userId }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productCache, setProductCache] = useState({});

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/user/${userId}`);
        const data = await res.json();
        setOrders(data.content || []);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  const fetchProduct = async (id) => {
    if (productCache[id]) return productCache[id];

    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      const data = await res.json();
      setProductCache((prev) => ({ ...prev, [id]: data }));
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    async function preloadProducts() {
      const allItemIds = orders.flatMap((order) =>
        order.items.map((i) => i.id)
      );
      const uniqueIds = [...new Set(allItemIds)];
      for (const id of uniqueIds) {
        await fetchProduct(id);
      }
    }

    if (orders.length > 0) preloadProducts();
  }, [orders]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="orders-page">
      <h2>Meus Pedidos</h2>

      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-date">
              <p>
                {new Date(order.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                })}
              </p>
              <p>{order.items.length} compra(s)</p>
            </div>

            <div className="order-info">
              <div className="order-items">
                {order.items.map((item) => {
                  const product = productCache[item.id];
                  return (
                    <div className="order-item" key={item.id}>
                      <div className="product-details-order">
                        {product && (
                          <img
                            src={product.image}
                            alt={item.name}
                            className="order-item-img"
                          />
                        )}
                        <div className="order-item-info">
                          <p className="item-name">{item.name}</p>
                          <div className="item-details">
                            <p>R${item.price.toFixed(2)}</p>
                            <p>{item.quantity} unidade</p>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn-rebuy"
                        onClick={() => navigate(`/produtos/${product.id}`)}
                      >
                        Comprar novamente
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersSection;

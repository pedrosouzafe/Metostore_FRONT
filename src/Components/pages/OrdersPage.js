import { useParams } from "react-router-dom";
import OrdersSection from "../orders-section";

function OrdersPage() {
  const { id } = useParams();

  return <OrdersSection userId={id} />;
}

export default OrdersPage;

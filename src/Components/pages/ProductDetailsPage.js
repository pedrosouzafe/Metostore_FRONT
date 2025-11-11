import { useParams } from "react-router-dom";
import ProductDetails from "../product-details";

function ProductDetailsPage({ addProductToCart, user }) {
  const { id } = useParams();

  return (
    <>
      <ProductDetails
        id={id}
        addProductToCart={addProductToCart}
        user={user}
      ></ProductDetails>
    </>
  );
}

export default ProductDetailsPage;

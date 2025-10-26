import { useParams } from "react-router-dom";
import ProductDetails from "../product-details";

function ProductDetailsPage({ addProductToCart }) {
  const { id } = useParams();

  return (
    <>
      <ProductDetails
        id={id}
        addProductToCart={addProductToCart}
      ></ProductDetails>
    </>
  );
}

export default ProductDetailsPage;

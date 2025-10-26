import Product from "../product";
import "./ProductsList.css";
import LoadingSpinner from "../loading-spinner";

function ProductsList({ products, addProductToCart, loading }) {
  return (
    <div className="product-list">
      {loading ? (
        <LoadingSpinner />
      ) : (
        products.map((product) => (
          <Product
            key={product.id}
            {...product}
            addProductToCart={addProductToCart}
          />
        ))
      )}
    </div>
  );
}

export default ProductsList;

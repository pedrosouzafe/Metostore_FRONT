import Product from "../product";
import "./ProductsList.css";

function ProductsList({ products }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductsList;

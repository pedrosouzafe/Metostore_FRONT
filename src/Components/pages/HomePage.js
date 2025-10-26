import ExclusiveSection from "../exclusive-section";
import Header from "../header";
import ProductsList from "../products-list";

function HomePage({ products, addProductToCart, loading }) {
  return (
    <>
      <Header />

      <div className="page-inner-content">
        <div className="section-tittle">
          <h3>Produtos Populares</h3>
          <div className="underline"></div>
        </div>

        <div className="main-content">
          <ProductsList
            addProductToCart={addProductToCart}
            products={products}
            loading={loading}
          />
        </div>
      </div>
      <ExclusiveSection></ExclusiveSection>
    </>
  );
}

export default HomePage;

import ExclusiveSection from "../exclusive-section";
import Header from "../header";
import ProductsList from "../products-list";
import SidebarCart from "../sidebar-cart";

function HomePage({ products }) {
  return (
    <>
      <Header />
      <SidebarCart />
      <div className="page-inner-content">
        <div className="section-tittle">
          <h3>Produtos Populares</h3>
          <div className="underline"></div>
        </div>

        <div className="main-content">
          <ProductsList products={products} />
        </div>
      </div>
      <ExclusiveSection></ExclusiveSection>
    </>
  );
}

export default HomePage;

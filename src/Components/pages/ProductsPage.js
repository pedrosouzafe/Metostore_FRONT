import ProductsList from "../products-list";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "../pagination";

function ProductsPage({
  products,
  addProductToCart,
  currentPage,
  setCurrentPage,
  totalPage,
  loading,
  totalProducts,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (pageFromUrl - 1 !== currentPage) {
      setCurrentPage(pageFromUrl - 1);
    }
  }, [pageFromUrl]);

  const handlePageChange = (pageZeroBased) => {
    if (pageZeroBased >= 0 && pageZeroBased < totalPage) {
      setCurrentPage(pageZeroBased);
      setSearchParams({ page: pageZeroBased + 1 });
      window.scrollTo({ top: 0, behavior: "smooth" }); // aqui também funciona
    }
  };

  return (
    <div className="page-inner-content">
      <div className="section-tittle">
        <h3>Produtos</h3>
        <div className="underline"></div>
      </div>

      <div className="main-content">
        <ProductsList
          products={products}
          addProductToCart={addProductToCart}
          loading={loading}
        />
      </div>

      <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPage={totalPage}
        totalProducts={totalProducts}
      />
    </div>
  );
}

export default ProductsPage;

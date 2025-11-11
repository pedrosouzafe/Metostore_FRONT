import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsList from "../products-list";
import Pagination from "../pagination";
import LoadingSpinner from "../loading-spinner";

function ProductsSearchPage({ addProductToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 0;
  const query = searchParams.get("query") || "";
  const category = searchParams.get("categoria") || "";
  const filtro = searchParams.get("filtro") || "";

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [nomeFiltro, setNomeFiltro] = useState("");

  useEffect(() => {
    switch (filtro) {
      case "price_asc":
        setNomeFiltro("Do menor para o maior preço");
        break;
      case "price_desc":
        setNomeFiltro("Do maior para o menor preço");
        break;
      case "best_rated":
        setNomeFiltro("Melhores avaliados");
        break;
      default:
        setNomeFiltro("");
        break;
    }
  }, [filtro]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url =
          category || query || filtro
            ? `http://localhost:8080/products/search?size=12&category=${category}&query=${query}&page=${page}&order=${filtro}`
            : `http://localhost:8080/products?size=12&page=${page}`;

        console.log("Buscando:", url);
        const response = await fetch(url);
        const data = await response.json();

        setProducts(data.content);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalElements);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setSearchParams({
        categoria: category,
        query,
        filtro,
        page: newPage,
      });
    }
  };

  return (
    <div className="page-inner-content">
      <div className="section-tittle">
        <h3>
          {totalProducts !== 0 ? (
            query ? (
              `Resultados para "${query}"`
            ) : category ? (
              `Categoria: ${category}`
            ) : filtro ? (
              `Filtrando por: ${nomeFiltro}`
            ) : (
              "Todos os produtos"
            )
          ) : (
            <div className="zero-products">
              <h3>Desculpe, nenhum produto foi encontrado...</h3>
              <p>Tente novamente com outro termo</p>
            </div>
          )}
        </h3>
        <div className="underline"></div>
      </div>

      <div className="main-content">
        <ProductsList
          products={products}
          addProductToCart={addProductToCart}
          loading={loading}
        />
      </div>

      {totalProducts !== 0 && (
        <Pagination
          query={query}
          category={category}
          filtro={filtro}
          currentPage={page}
          totalPage={totalPages}
          handlePageChange={handlePageChange}
          totalProducts={totalProducts}
        />
      )}
    </div>
  );
}

export default ProductsSearchPage;

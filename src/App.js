import NavBar from "./Components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // TODO Pesquisar pra que serve
import { useEffect, useState } from "react";
import Footer from "./Components/footer";
import SidebarCart from "./Components/sidebar-cart";

import HomePage from "./Components/pages/HomePage";
import ProductsPage from "./Components/pages/ProductsPage";
import ProductDetailsPage from "./Components/pages/ProductDetailsPage";
import ProductsSearchPage from "./Components/pages/ProductsSearchPage";

function App() {
  const [products, setProducts] = useState([]);
  const [showSidebarCart, setSidebarCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [productsPage, setProductsPage] = useState([]); // TODO Alterar pra ser do mesmo tipo que o products
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const addToCartTotal = (value) => {
    setCartTotal(cartTotal + value);

    if (cartTotal < 0) setCartTotal(0);
  };

  // Página principal
  useEffect(() => {
    // Requisitar produtos
    setLoading(true);
    fetch("http://localhost:8080/products?size=12")
      .then((res) => res.json())
      .then((data) => setProducts(data.content))
      .finally(() => setLoading(false));
  }, []);

  // Página de produtos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log("Current page: " + currentPage);

        const response = await fetch(
          `http://localhost:8080/products?page=${currentPage}`
        );
        const data = await response.json();

        console.log(`http://localhost:8080/products?page=${currentPage}`);
        console.log(data);

        setTotalPage(data.totalPages);
        setProductsPage(data.content);
        setTotalProducts(data.totalElements);
        console.log("Total de páginas: " + totalPage);
      } catch (err) {
        console.log("Erro: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  //

  const addProductToCart = (id) => {
    const productToAdd = products.filter(
      (product) => product.id === parseInt(id)
    )[0];
    if (selectedProducts.includes(productToAdd)) return;

    console.log(productToAdd);

    setSelectedProducts(selectedProducts.concat(productToAdd));
    setCartTotal(cartTotal + productToAdd.price);
  };

  const removeProductFromCart = (id) => {
    const newSelectedProducts = selectedProducts.filter(
      (product) => product.id !== id
    );

    setSelectedProducts(newSelectedProducts);
  };

  return (
    <Router>
      <div className="App">
        <NavBar
          setSidebarCart={setSidebarCart}
          selectedProducts={selectedProducts}
        />
        <SidebarCart
          addToCartTotal={addToCartTotal}
          removeProductFromCart={removeProductFromCart}
          cartTotal={cartTotal}
          selectedProducts={selectedProducts}
          setSidebarCart={setSidebarCart}
          showSidebarCart={showSidebarCart}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  addToCartTotal={addToCartTotal}
                  removeProductFromCart={removeProductFromCart}
                  products={products}
                  setSidebarCart={setSidebarCart}
                  showSidebarCart={showSidebarCart}
                  addProductToCart={addProductToCart}
                  selectedProducts={selectedProducts}
                  cartTotal={cartTotal}
                  loading={loading}
                ></HomePage>
              }
            />
            <Route
              path={`/produtos`}
              element={
                <ProductsPage
                  products={productsPage}
                  setProducts={setProducts}
                  addProductToCart={addProductToCart}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                  loading={loading}
                  totalProducts={totalProducts}
                />
              }
            />

            <Route
              path="/produtos/:id"
              element={
                <ProductDetailsPage addProductToCart={addProductToCart} />
              }
            />

            <Route
              path="/produtos/busca"
              element={
                <ProductsSearchPage addProductToCart={addProductToCart} />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

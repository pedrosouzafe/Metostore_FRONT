import NavBar from "./Components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Components/footer";
import SidebarCart from "./Components/sidebar-cart";

import HomePage from "./Components/pages/HomePage";
import ProductsPage from "./Components/pages/ProductsPage";
import ProductDetailsPage from "./Components/pages/ProductDetailsPage";
import ProductsSearchPage from "./Components/pages/ProductsSearchPage";
import LoginPage from "./Components/pages/LoginPage";
import CheckoutPage from "./Components/pages/CheckoutPage";
import OrdersPage from "./Components/pages/OrdersPage";

function App() {
  const [products, setProducts] = useState([]);
  const [showSidebarCart, setSidebarCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [productsPage, setProductsPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [user, setUser] = useState(undefined);

  // Atualiza o total sempre que o carrinho mudar
  useEffect(() => {
    const total = selectedProducts.reduce(
      (sum, p) => sum + p.price * p.cartQuantity,
      0
    );
    setCartTotal(total);
  }, [selectedProducts]);

  const addToCartTotal = (value) => {
    setCartTotal((prevTotal) => Math.max(0, prevTotal + value));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/products?size=12")
      .then((res) => res.json())
      .then((data) => setProducts(data.content))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/products?page=${currentPage}`
        );
        const data = await response.json();

        setTotalPage(data.totalPages);
        setProductsPage(data.content);
        setTotalProducts(data.totalElements);
      } catch (err) {
        console.log("Erro: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const fetchProduct = async (id) => {
    const productFetch = await fetch(`http://localhost:8080/products/${id}`)
      .then((res) => res.json())
      .catch((err) => alert(err));

    return productFetch;
  };

  const addProductToCart = async (id) => {
    const productToAdd = await fetchProduct(id);

    const existingProduct = selectedProducts.find(
      (p) => p.id === productToAdd.id
    );

    if (existingProduct) {
      // aumenta cartQuantity, respeitando o estoque (quantity)
      const updatedProducts = selectedProducts.map((p) =>
        p.id === id
          ? {
              ...p,
              cartQuantity:
                p.cartQuantity < p.quantity
                  ? p.cartQuantity + 1
                  : p.cartQuantity,
            }
          : p
      );
      setSelectedProducts(updatedProducts);
    } else {
      // adciona novo produto com cartQuantity inicial
      setSelectedProducts([
        ...selectedProducts,
        { ...productToAdd, cartQuantity: 1 },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    const updatedProducts = selectedProducts.map((p) =>
      p.id === id
        ? {
            ...p,
            cartQuantity:
              p.cartQuantity < p.quantity ? p.cartQuantity + 1 : p.cartQuantity,
          }
        : p
    );
    setSelectedProducts(updatedProducts);
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = selectedProducts
      .map((p) =>
        p.id === id
          ? { ...p, cartQuantity: Math.max(1, p.cartQuantity - 1) }
          : p
      )
      .filter((p) => p.cartQuantity > 0);
    setSelectedProducts(updatedProducts);
  };

  const removeProductFromCart = (id) => {
    const newSelectedProducts = selectedProducts.filter((p) => p.id !== id);
    setSelectedProducts(newSelectedProducts);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/login"
          element={
            <>
              <NavBar
                setSidebarCart={setSidebarCart}
                selectedProducts={selectedProducts}
                loading={loading}
                user={user}
              />
              <LoginPage
                user={user}
                setUser={setUser}
                loading={loading}
                setLoading={setLoading}
              />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <NavBar
                setSidebarCart={setSidebarCart}
                selectedProducts={selectedProducts}
                loading={loading}
                user={user}
                setUser={setUser}
              />
              <SidebarCart
                selectedProducts={selectedProducts}
                setSidebarCart={setSidebarCart}
                showSidebarCart={showSidebarCart}
                removeProductFromCart={removeProductFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cartTotal={cartTotal}
                addToCartTotal={addToCartTotal}
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
                      />
                    }
                  />
                  <Route
                    path="/produtos"
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
                      <ProductDetailsPage
                        addProductToCart={addProductToCart}
                        user={user}
                      />
                    }
                  />
                  <Route
                    path="/produtos/busca"
                    element={
                      <ProductsSearchPage addProductToCart={addProductToCart} />
                    }
                  />

                  <Route
                    path="/cart/checkout"
                    element={
                      <CheckoutPage
                        addToCartTotal={addToCartTotal}
                        setLoading={setLoading}
                        loading={loading}
                        user={user}
                        selectedProducts={selectedProducts}
                        setSidebarCart={setSidebarCart}
                        showSidebarCart={showSidebarCart}
                        removeProductFromCart={removeProductFromCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        cartTotal={cartTotal}
                        setSelectedProducts={setSelectedProducts}
                      />
                    }
                  />

                  <Route path="/pedidos/user/:id" element={<OrdersPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

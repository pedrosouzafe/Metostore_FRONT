import NavBar from "./Components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // TODO Pesquisar pra que serve
import { useEffect, useState } from "react";
import Footer from "./Components/footer";

import HomePage from "./Components/pages/HomePage";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Requisitar produtos
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.content));
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products}></HomePage>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

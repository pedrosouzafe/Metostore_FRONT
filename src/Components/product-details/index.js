import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Rate from "../rate";

function ProductDetails({ id, addProductToCart }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(-1);
  const [currentUrlImage, setCurrentUrlImage] = useState(product.image);

  const handleImage = (index) => {
    setCurrentImage(index);

    setCurrentUrlImage(
      currentImage === -1 ? product.image : product.images[currentImage].url
    );
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-spinner"></div>;

  return (
    <div className="product-details-container">
      <div className="product-gallery">
        <div className="main-image">
          <a href={currentUrlImage} target="_blank" rel="noopener noreferrer">
            {currentImage === -1 ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <img
                src={product.images[currentImage].url}
                alt={product.images[currentImage].altText}
              />
            )}
          </a>
        </div>
        <div className="thumbnail-row">
          <img
            src={product.image}
            alt={product.name}
            onClick={() => handleImage(-1)}
          />
          {product.images?.map((img, index) => (
            <img
              key={index + 1}
              src={img.url}
              alt={img.altText}
              onClick={() => handleImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <div className="brand-rate">
          <p className="product-brand">{product.brand}</p>
          <Rate rate={product.rate} />
        </div>
        <h2 className="product-title">{product.name}</h2>
        <p className="product-metostore">
          Produto vendido e entregue por: <span>Metostore</span>
        </p>

        <div className="about-product">
          <FontAwesomeIcon icon={faCircleInfo} className="circle-info" />
          <p className="about">SOBRE O PRODUTO</p>
        </div>
        <div className="product-description">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="buy-box">
        <div className="price-section">
          <h3 className="price">
            R$ {String(product.price).replace(".", ",")}
          </h3>
          <p className="installments">
            <span>R$ {product.price}</span> em até 10x de{" "}
            <span>R$ {(product.price / 10).toFixed(2).replace(".", ",")}</span>{" "}
            sem juros
          </p>
          <p className="stock">
            {product.available > 0 ? "Em estoque" : "Esgotado"}
          </p>
        </div>

        <button
          className="add-to-cart"
          onClick={() => addProductToCart(product.id)}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span>Adicionar ao carrinho</span>
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

import CheckoutSection from "../checkout-section";

function CheckoutPage({
  selectedProducts,
  cartTotal,
  addToCartTotal,
  removeProductFromCart,
  setLoading,
  loading,
  user,
  increaseQuantity,
  decreaseQuantity,
  setSelectedProducts,
}) {
  return (
    <div>
      <CheckoutSection
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        user={user}
        selectedProducts={selectedProducts}
        cartTotal={cartTotal}
        addToCartTotal={addToCartTotal}
        removeProductFromCart={removeProductFromCart}
        setLoading={setLoading}
        loading={loading}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
}

export default CheckoutPage;

   // Function to calculate the total price based on cart items
   module.exports=function calculateTotalPrice(cartItems) {
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
      if (cartItem.productId) {
        const subtotal = cartItem.quantity * cartItem.productId.productPrice;
        totalPrice += subtotal;
      }
    });

    return totalPrice.toFixed(2);
  }

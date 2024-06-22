document.addEventListener('DOMContentLoaded', function() {
    const paymentItems = document.getElementById('payment-items');
    const paymentTotal = document.getElementById('payment-total');
    const paymentStatus = document.getElementById('payment-status');
    const paymentForm = document.getElementById('payment-form');

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    // Display cart items
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name}: R$${item.price}`;
        paymentItems.appendChild(listItem);
    });

    // Display total price
    paymentTotal.textContent = totalPrice.toFixed(2);

    // Handle form submission
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Always return "OK"
        paymentStatus.textContent = 'Pedido reservado com sucesso!';
    });
});

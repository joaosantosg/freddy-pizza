document.addEventListener('DOMContentLoaded', function() {
    const div_pizzas = document.getElementById('div-pizzas');
    const div_bebidas = document.getElementById('div-bebidas');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.createElement('button');
    let totalPrice = 0;
    let cart = [];

    checkoutButton.textContent = 'Reserve seu pedido';
    checkoutButton.id = 'checkout-button';
    document.getElementById('cart').appendChild(checkoutButton);

    document.getElementById('pizza-button').addEventListener('click', function() {
        div_pizzas.classList.remove('invisible');
        div_bebidas.classList.add('invisible');
    });

    document.getElementById('bebida-button').addEventListener('click', function() {
        div_bebidas.classList.remove('invisible');
        div_pizzas.classList.add('invisible');
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));

            addItemToCart(itemName, itemPrice);
        });
    });

    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Adicione itens ao carrinho antes de finalizar o pedido');
            return;
        }
        if (confirm('Deseja finalizar o pedido?') === false) {
            return;
        }
        // Save cart data to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
        // Redirect to payment page
        window.location.href = '/pages/payment.html';
    });

    function addItemToCart(name, price) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name}: R$${price}`;
        cartItems.appendChild(listItem);

        totalPrice += price;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        cart.push({ name, price });
    }
    const footer = document.querySelector('footer');

    // Function to check if footer is at the bottom of the viewport
    function checkFooterPosition() {
        const footerOffsetTop = footer.offsetTop;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollTop = window.scrollY || window.pageYOffset;

        // Calculate the distance from the top of the footer to the bottom of the viewport
        const footerBottomPosition = bodyHeight - footerOffsetTop;

        // Show or hide footer based on scroll position
        if (footerBottomPosition <= windowHeight + scrollTop) {
            footer.style.visibility = 'visible';
        } else {
            footer.style.visibility = 'hidden';
        }
    }

    // Check footer position on scroll
    window.addEventListener('scroll', checkFooterPosition);

    // Initial check when DOM is loaded
    checkFooterPosition();
});

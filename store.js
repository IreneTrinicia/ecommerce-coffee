var cart = [];

function addToCart(title, price, imageSrc) {
    var cartItem = {
        title: title,
        price: price,
        imageSrc: imageSrc,
        quantity: 1 
    };
    var existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));
}

var addToCartButtons = document.getElementsByClassName('shop-item-button');
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var shopItem = buttonClicked.parentElement.parentElement;
        var title = shopItem.querySelector('.shop-item-title').innerText;
        var price = parseFloat(shopItem.querySelector('.shop-item-price').innerText.replace('$', ''));
        var imageSrc = shopItem.querySelector('.shop-item-image').src;
        addToCart(title, price, imageSrc);
        updateCartTotal();
    });
}
function incrementQuantity(title) {
    var item = cart.find(item => item.title === title);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); 
    }
}

function decrementQuantity(title) {
    var item = cart.find(item => item.title === title);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); 
    }
}

var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var removeButton = removeCartItemButtons[i];
    removeButton.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var cartItem = buttonClicked.parentElement.parentElement;
        var title = cartItem.querySelector('.cart-item-title').innerText;
        removeFromCart(title);
        cartItem.remove();
        updateCartTotal();
    });
}

function updateCartTotal() {
    var cartItems = document.getElementsByClassName('cart-item');
    var total = 0;
    
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.querySelector('.cart-price');
        var quantityElement = cartItem.querySelector('.cart-quantity-input');
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }
    
    total = Math.round(total * 100) / 100;
    
    document.querySelector('.cart-total-price').innerText = '$' + total.toFixed(2);
}

updateCartTotal();

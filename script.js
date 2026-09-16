// Sample Products Data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        category: "audio",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
        id: 2,
        title: "Smartwatch Series 5",
        price: 199.99,
        category: "wearables",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
    },
    {
        id: 3,
        title: "Ergonomic Mechanical Keyboard",
        price: 129.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"
    },
    {
        id: 4,
        title: "Bluetooth Portable Speaker",
        price: 49.99,
        category: "audio",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"
    },
    {
        id: 5,
        title: "Fitness Tracker Band",
        price: 39.99,
        category: "wearables",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80"
    },
    {
        id: 6,
        title: "Wireless Gaming Mouse",
        price: 59.99,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('products');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});

// Display Products Grid
function displayProducts(items) {
    productGrid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Products by Category
function filterProducts(category) {
    // Update Active Button Style
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });

    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Cart UI (Count, Items List, Total Price)
function updateCartUI() {
    // Total count of items
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888;">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Total Price calculation
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Toggle Cart Sidebar
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Mock Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    updateCartUI();
    closeCart();
}
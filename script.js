// Cart Management System
let cart = {
    plan: null,
    addons: [],
    subtotal: 0,
    addonsTotal: 0,
    grandTotal: 0
};

// WhatsApp Configuration
const WA_NUMBER = '085232602370';
const WA_MESSAGE_TEMPLATE = `Hi blur_food! Saya tertarik endorse:

Package: {PLAN}
Add-ons: {ADDONS}
Agency/Company: {AGENCY}
Brand: {BRAND}
Contact Person: {CONTACT_PERSON}
Email: {EMAIL}
Notes: {NOTES}

Total: IDR {TOTAL}

Mohon info availability & next steps.`;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    loadCart();
    
    // Plan selection
    document.querySelectorAll('.select-plan').forEach(button => {
        button.addEventListener('click', selectPlan);
    });
    
    // Add-ons selection
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addAddon);
    });
    
    // Clear cart
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Form submission
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }
    
    // Preview WhatsApp
    const previewBtn = document.getElementById('preview-wa');
    if (previewBtn) {
        previewBtn.addEventListener('click', previewWhatsApp);
    }
    
    // Modal controls
    const modal = document.getElementById('wa-modal');
    const closeModal = document.querySelector('.close-modal');
    const copyBtn = document.getElementById('copy-wa');
    const sendBtn = document.getElementById('send-wa');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyWhatsAppMessage);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendWhatsApp);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Update order button state
    updateOrderButton();
});

// Cart Functions
function loadCart() {
    const savedCart = localStorage.getItem('blurfood_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('blurfood_cart', JSON.stringify(cart));
    updateOrderButton();
}

function selectPlan(e) {
    const button = e.currentTarget;
    const plan = button.dataset.plan;
    const price = parseInt(button.dataset.price);
    
    cart.plan = { name: plan, price: price };
    calculateTotals();
    updateCartDisplay();
    saveCart();
    
    // Scroll to cart section
    document.querySelector('.order-form').scrollIntoView({ behavior: 'smooth' });
}

function addAddon(e) {
    const button = e.currentTarget;
    const addon = button.dataset.addon;
    const price = parseInt(button.dataset.price);
    
    // Check if addon already exists
    const existingIndex = cart.addons.findIndex(item => item.name === addon);
    
    if (existingIndex > -1) {
        // Remove if already exists (toggle)
        cart.addons.splice(existingIndex, 1);
        button.textContent = 'Add to Cart';
        button.classList.remove('added');
    } else {
        // Add new addon
        cart.addons.push({ name: addon, price: price });
        button.textContent = 'Remove from Cart';
        button.classList.add('added');
    }
    
    calculateTotals();
    updateCartDisplay();
    saveCart();
}

function calculateTotals() {
    cart.subtotal = cart.plan ? cart.plan.price : 0;
    cart.addonsTotal = cart.addons.reduce((sum, addon) => sum + addon.price, 0);
    cart.grandTotal = cart.subtotal + cart.addonsTotal;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const addonsTotalEl = document.getElementById('addons-total');
    const grandTotalEl = document.getElementById('grand-total');
    
    if (!cartItems) return;
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (!cart.plan && cart.addons.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">No items selected yet</p>';
    } else {
        // Add plan
        if (cart.plan) {
            const planItem = document.createElement('div');
            planItem.className = 'cart-item';
            planItem.innerHTML = `
                <div class="item-name">${formatPlanName(cart.plan.name)} Package</div>
                <div class="item-price">IDR ${formatPrice(cart.plan.price)}</div>
            `;
            cartItems.appendChild(planItem);
        }
        
        // Add addons
        cart.addons.forEach(addon => {
            const addonItem = document.createElement('div');
            addonItem.className = 'cart-item addon-item';
            addonItem.innerHTML = `
                <div class="item-name">+ ${formatAddonName(addon.name)}</div>
                <div class="item-price">${addon.price === 0 ? 'FREE' : `IDR ${formatPrice(addon.price)}`}</div>
            `;
            cartItems.appendChild(addonItem);
        });
    }
    
    // Update totals
    if (subtotalEl) subtotalEl.textContent = `IDR ${formatPrice(cart.subtotal)}`;
    if (addonsTotalEl) addonsTotalEl.textContent = `IDR ${formatPrice(cart.addonsTotal)}`;
    if (grandTotalEl) grandTotalEl.textContent = `IDR ${formatPrice(cart.grandTotal)}`;
    
    // Update addon buttons state
    updateAddonButtons();
}

function updateAddonButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        const addon = button.dataset.addon;
        const isInCart = cart.addons.some(item => item.name === addon);
        
        if (isInCart) {
            button.textContent = 'Remove from Cart';
            button.classList.add('added');
        } else {
            button.textContent = 'Add to Cart';
            button.classList.remove('added');
        }
    });
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = {
            plan: null,
            addons: [],
            subtotal: 0,
            addonsTotal: 0,
            grandTotal: 0
        };
        
        updateCartDisplay();
        saveCart();
        
        // Reset addon buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.textContent = 'Add to Cart';
            button.classList.remove('added');
        });
    }
}

function updateOrderButton() {
    const submitBtn = document.getElementById('submit-order');
    if (submitBtn) {
        submitBtn.disabled = !cart.plan || cart.grandTotal === 0;
    }
}

// Formatting Functions
function formatPrice(price) {
    return price.toLocaleString('id-ID');
}

function formatPlanName(plan) {
    const names = {
        'basic': 'Basic',
        'plus': 'Plus',
        'custom': 'Custom'
    };
    return names[plan] || plan;
}

function formatAddonName(addon) {
    const names = {
        'mirror': 'Mirror All 3 Platforms',
        'boost30': 'Boost Code TikTok 30 Days',
        'boost365': 'Boost Code TikTok 365 Days',
        'keranjang': 'Keranjang Kuning',
        'owning': 'Owning'
    };
    return names[addon] || addon;
}

// Order Form Functions
function submitOrder(e) {
    e.preventDefault();
    
    // Validate form
    const agency = document.getElementById('agency').value.trim();
    const brand = document.getElementById('brand').value.trim();
    const contactPerson = document.getElementById('contact-person').value.trim();
    const email = document.getElementById('email').value.trim();
    const notes = document.getElementById('notes').value.trim();
    
    if (!agency || !brand || !contactPerson || !email) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }
    
    if (!cart.plan) {
        alert('Please select a package first');
        return;
    }
    
    // Generate WhatsApp message
    const waMessage = generateWhatsAppMessage({
        agency,
        brand,
        contactPerson,
        email,
        notes
    });
    
    // Show preview modal
    showWhatsAppPreview(waMessage);
}

function generateWhatsAppMessage(data) {
    const addonsList = cart.addons.length > 0 
        ? cart.addons.map(addon => formatAddonName(addon.name)).join(', ')
        : 'None';
    
    return WA_MESSAGE_TEMPLATE
        .replace('{PLAN}', formatPlanName(cart.plan.name))
        .replace('{ADDONS}', addonsList)
        .replace('{AGENCY}', data.agency)
        .replace('{BRAND}', data.brand)
        .replace('{CONTACT_PERSON}', data.contactPerson)
        .replace('{EMAIL}', data.email)
        .replace('{NOTES}', data.notes || 'None')
        .replace('{TOTAL}', formatPrice(cart.grandTotal));
}

function previewWhatsApp() {
    // Validate form
    const agency = document.getElementById('agency').value.trim();
    const brand = document.getElementById('brand').value.trim();
    const contactPerson = document.getElementById('contact-person').value.trim();
    const email = document.getElementById('email').value.trim();
    const notes = document.getElementById('notes').value.trim();
    
    if (!agency || !brand || !contactPerson || !email) {
        alert('Please fill in all required fields (marked with *) to preview WhatsApp message');
        return;
    }
    
    if (!cart.plan) {
        alert('Please select a package first');
        return;
    }
    
    const waMessage = generateWhatsAppMessage({
        agency,
        brand,
        contactPerson,
        email,
        notes
    });
    
    showWhatsAppPreview(waMessage);
}

function showWhatsAppPreview(message) {
    const modal = document.getElementById('wa-modal');
    const messageContent = document.getElementById('wa-message-content');
    
    if (modal && messageContent) {
        messageContent.textContent = message;
        modal.style.display = 'block';
    }
}

function copyWhatsAppMessage() {
    const messageContent = document.getElementById('wa-message-content');
    const message = messageContent.textContent;
    
    navigator.clipboard.writeText(message)
        .then(() => {
            alert('Message copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy message. Please try again.');
        });
}

function sendWhatsApp() {
    const messageContent = document.getElementById('wa-message-content');
    const message = encodeURIComponent(messageContent.textContent);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;
    
    window.open(waUrl, '_blank');
    
    // Clear cart after sending
    clearCart();
    
    // Reset form
    document.getElementById('order-form').reset();
    
    // Close modal
    document.getElementById('wa-modal').style.display = 'none';
    
    // Show success message
    alert('WhatsApp opened with your order details! Please send the message to complete your order.');
}

// CSS sudah dipindah ke style.css
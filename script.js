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

// Additional CSS for cart and forms
const additionalStyles = `
/* Cart Styles */
.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--gray-light);
}

.cart-item:last-child {
    border-bottom: none;
}

.addon-item {
    background: var(--light);
    margin-left: 1rem;
    border-radius: 8px;
}

.empty-cart {
    text-align: center;
    color: var(--gray);
    padding: 2rem;
    font-style: italic;
}

.cart-total {
    margin-top: 2rem;
    padding: 1.5rem;
    background: var(--light);
    border-radius: var(--radius);
}

.total-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.grand-total {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary);
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 2px solid var(--gray-light);
}

/* Form Styles */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--dark);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid var(--gray-light);
    border-radius: var(--radius);
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
}

.form-note {
    color: var(--gray);
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
}

.modal-content {
    background: white;
    margin: 5% auto;
    width: 90%;
    max-width: 600px;
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: var(--dark);
    color: white;
}

.close-modal {
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
}

.modal-body {
    padding: 2rem;
}

.wa-preview {
    background: #f0f0f0;
    padding: 1.5rem;
    border-radius: var(--radius);
    margin-bottom: 2rem;
    white-space: pre-wrap;
    font-family: monospace;
    line-height: 1.5;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

/* Pricing Page Specific */
.pricing-header {
    padding: 3rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
}

.pricing-header h1 {
    color: white;
    margin-bottom: 1rem;
}

.alert {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: var(--radius);
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 600px;
    margin: 2rem auto 0;
}

.alert i {
    font-size: 1.5rem;
}

.plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 3rem 0;
}

.plan-card {
    background: white;
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow);
    position: relative;
    transition: var(--transition);
}

.plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.plan-card.popular {
    border: 2px solid var(--primary);
}

.popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.plan-header {
    text-align: center;
    margin-bottom: 2rem;
}

.price {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    margin: 1rem 0;
}

.plan-desc {
    color: var(--gray);
    font-size: 0.9rem;
}

.plan-features {
    margin-bottom: 2rem;
}

.feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.feature i {
    color: var(--success);
}

.select-plan {
    width: 100%;
    padding: 1rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.select-plan:hover {
    background: var(--primary-dark
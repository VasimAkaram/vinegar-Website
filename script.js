// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            mobileMenu.classList.add('hidden');
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Also make child elements visible
            entry.target.querySelectorAll('.benefit-card, .product-card, .testimonial-card').forEach(element => {
                element.classList.add('active');
            });
        }
    });
}, observerOptions);

// Observe all sections and their cards
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    // Also observe individual cards
    section.querySelectorAll('.benefit-card, .product-card, .testimonial-card').forEach(card => {
        observer.observe(card);
    });
});

// Initialize visibility on page load
document.addEventListener('DOMContentLoaded', () => {
    // Make all sections visible initially
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('visible');
    });
    
    // Add scroll-reveal class to elements that should animate on scroll
    document.querySelectorAll('.benefit-card, .product-card, .testimonial-card').forEach(element => {
        element.classList.add('scroll-reveal');
    });
});

// Cart Functionality
let cart = [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center';
        itemElement.innerHTML = `
            <div>
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600">₹${item.price}</p>
            </div>
            <button class="text-red-500 hover:text-red-700" onclick="removeFromCart('${item.id}')">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `₹${total}`;
}

function addToCart(productId, name, price) {
    cart.push({ id: productId, name, price });
    updateCart();
    showCartModal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function showCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('hidden');
    cartModal.classList.add('active');
}

function hideCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.remove('active');
    setTimeout(() => {
        cartModal.classList.add('hidden');
    }, 300);
}

// Add click event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseInt(productCard.querySelector('p.text-2xl').textContent.replace('₹', ''));
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        addToCart(productId, productName, productPrice);
    });
});

// Close cart modal when clicking outside
document.getElementById('cart-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('cart-modal')) {
        hideCartModal();
    }
});

// Form Submission
const contactForm = document.querySelector('#contact form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Newsletter Form
const newsletterForm = document.querySelector('footer form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
}); 
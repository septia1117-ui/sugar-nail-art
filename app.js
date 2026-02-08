/**
 * Sugar Nail Art - Main Application Script
 * Mobile PWA for nail art booking
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format number to Rupiah currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted rupiah string
 */
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

/**
 * Generate unique order ID
 * @returns {string} Order ID in format #SNA1234
 */
function generateOrderId() {
  const prefix = "SNA";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `#${prefix}${randomNum}`;
}

/**
 * Format date to Indonesian locale
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

// ============================================
// PWA INSTALLATION
// ============================================

let deferredPrompt;

// Capture the install prompt event
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  console.log("PWA install prompt available");
});

// Handle successful installation
window.addEventListener("appinstalled", () => {
  console.log("PWA installed successfully!");
  deferredPrompt = null;
});

// ============================================
// SERVICE WORKER REGISTRATION
// ============================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registered (v2) with scope:",
          registration.scope,
        );
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed:", err);
      });
  });
}

// ============================================
// LOCALSTORAGE HELPERS
// ============================================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store (will be JSON stringified)
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Retrieved value or default
 */
function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

// ============================================
// NAVIGATION HELPERS
// ============================================

/**
 * Update active navigation state
 * Sets the active class on the current page's nav item
 */
function updateNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Initialize navigation on page load
document.addEventListener("DOMContentLoaded", updateNavigation);

// ============================================
// SHOPPING CART FUNCTIONS
// ============================================

/**
 * Add package to cart
 * @param {string} packageName - Name of the package
 * @param {number} price - Package price
 */
function addPackageToCart(packageName, price) {
  const packageData = {
    name: packageName,
    price: price,
  };

  saveToStorage("selectedPackage", packageData);
}

/**
 * Get current cart package
 * @returns {Object|null} Package data or null
 */
function getCartPackage() {
  return getFromStorage("selectedPackage", null);
}

/**
 * Clear cart data
 */
function clearCart() {
  removeFromStorage("selectedPackage");
  removeFromStorage("selectedAddons");
  removeFromStorage("orderNotes");
}

// ============================================
// ORDER HISTORY FUNCTIONS
// ============================================

/**
 * Save order to history
 * @param {Object} order - Order object
 */
function saveOrderToHistory(order) {
  const orders = getFromStorage("orderHistory", []);
  orders.unshift(order); // Add to beginning of array

  // Keep only last 50 orders to prevent storage overflow
  if (orders.length > 50) {
    orders.splice(50);
  }

  saveToStorage("orderHistory", orders);
}

/**
 * Get all orders from history
 * @returns {Array} Array of order objects
 */
function getOrderHistory() {
  return getFromStorage("orderHistory", []);
}

/**
 * Clear all order history
 */
function clearOrderHistory() {
  removeFromStorage("orderHistory");
}

// ============================================
// WHATSAPP INTEGRATION
// ============================================

/**
 * Send order to WhatsApp
 * @param {Object} orderData - Complete order data
 * @param {string} adminNumber - WhatsApp admin number
 */
function sendToWhatsApp(orderData, adminNumber = "6282297978885") {
  const { packageName, packagePrice, addons, notes, total } = orderData;

  // Build WhatsApp message
  let message = `Halo Sugar Nail Art 💅\n\nSaya ingin order nail art:\n\n`;
  message += `✨ Paket: ${packageName}\n`;
  message += `💰 Harga: ${formatRupiah(packagePrice)}\n\n`;

  if (addons && addons.length > 0) {
    message += `➕ Add-ons:\n`;
    addons.forEach((addon) => {
      message += `- ${addon.name} (+${formatRupiah(addon.price)})\n`;
    });
    message += `\n`;
  }

  if (notes) {
    message += `📝 Catatan:\n${notes}\n\n`;
  }

  message += `Total: ${formatRupiah(total)}\n\n`;
  message += `Terima kasih 😊`;

  // Encode and create WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  window.location.href = whatsappUrl;
}

// ============================================
// ANALYTICS & TRACKING (Optional)
// ============================================

/**
 * Track page view
 * @param {string} pageName - Name of the page
 */
function trackPageView(pageName) {
  console.log(`Page view: ${pageName}`);
  // You can integrate with Google Analytics or other tracking here
  // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: pageName });
}

/**
 * Track event
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Additional event data
 */
function trackEvent(eventName, eventData = {}) {
  console.log(`Event: ${eventName}`, eventData);
  // You can integrate with analytics here
  // Example: gtag('event', eventName, eventData);
}

// ============================================
// INITIALIZATION
// ============================================

// Log app initialization
console.log("Sugar Nail Art PWA initialized");

// Track page view on load
document.addEventListener("DOMContentLoaded", () => {
  const pageName = window.location.pathname.split("/").pop() || "index.html";
  trackPageView(pageName);
});

// ============================================
// EXPORT FOR TESTING (if using modules)
// ============================================

// Uncomment if using ES6 modules
// export {
//     formatRupiah,
//     showToast,
//     generateOrderId,
//     formatDate,
//     addPackageToCart,
//     getCartPackage,
//     clearCart,
//     saveOrderToHistory,
//     getOrderHistory,
//     sendToWhatsApp
// };

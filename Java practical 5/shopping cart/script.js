// Global State
let cart = [];
let idCounter = 1;

// Helper function to format numbers as Indian Rupee (INR)
const formatINR = (amount) => {
    return '₹' + amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

// Add Product
function addProduct() {
    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('price');
    const qtyInput = document.getElementById('quantity');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const qty = parseInt(qtyInput.value);

    // Validation
    if (name === "") {
        alert("Please enter a product name.");
        nameInput.focus();
        return;
    }
    if (isNaN(price) || price <= 0) {
        alert("Please enter a valid price greater than 0.");
        priceInput.focus();
        return;
    }
    if (isNaN(qty) || qty < 1) {
        alert("Please enter a valid quantity (at least 1).");
        qtyInput.focus();
        return;
    }

    const total = price * qty;

    const product = {
        id: idCounter++,
        name: name,
        price: price,
        qty: qty,
        total: total
    };

    cart.push(product);

    // Clear inputs
    nameInput.value = "";
    priceInput.value = "";
    qtyInput.value = "1";
    nameInput.focus();

    renderCart();
    calculateTotals();
}

// Delete Product
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        cart = cart.filter(item => item.id !== id);
        renderCart();
        calculateTotals();
    }
}

// Render Table
function renderCart() {
    const tbody = document.getElementById('cartBody');
    tbody.innerHTML = "";

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#999; padding: 20px;">
                    No products added yet. Try adding a "Pen" (₹10) or "Laptop" (₹30000).
                </td>
            </tr>
        `;
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${formatINR(item.price)}</td>
            <td>${item.qty}</td>
            <td style="font-weight: 600;">${formatINR(item.total)}</td>
            <td>
                <button class="btn-delete" onclick="deleteProduct(${item.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Calculate Totals and Render Lists
function calculateTotals() {
    // 1. Total Amount
    const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

    // 2. Discount (20%)
    const discountRate = 0.20; 
    const discountAmount = totalAmount * discountRate;
    
    // 3. Final Amount
    const finalAmount = totalAmount - discountAmount;

    // Update UI
    document.getElementById('totalAmount').innerText = formatINR(totalAmount);
    document.getElementById('discountAmount').innerText = "-" + formatINR(discountAmount);
    document.getElementById('finalAmount').innerText = formatINR(finalAmount);

    renderLists();
}

// Render Lists (Low Cost, Expensive, Summary)
function renderLists() {
    const lowCostList = document.getElementById('lowCostList');
    const expensiveList = document.getElementById('expensiveList');
    const noLowCostMsg = document.getElementById('noLowCost');
    const noExpensiveMsg = document.getElementById('noExpensive');
    const itemSummaryList = document.getElementById('itemSummary');

    // Clear existing lists
    lowCostList.innerHTML = "";
    expensiveList.innerHTML = "";
    itemSummaryList.innerHTML = "";

    let hasLowCost = false;
    let hasExpensive = false;

    cart.forEach(item => {
        // 1. Item Summary (All items)
        const summaryItem = document.createElement('li');
        summaryItem.innerHTML = `${item.name} <span>${formatINR(item.total)}</span>`;
        itemSummaryList.appendChild(summaryItem);

        // 2. Low-Cost Items (Price < 1000)
        if (item.price < 1000) {
            hasLowCost = true;
            const lowCostItem = document.createElement('li');
            lowCostItem.innerHTML = `${item.name} <span>${formatINR(item.price)}</span>`;
            lowCostList.appendChild(lowCostItem);
        }

        // 3. Expensive Items (Price > 1000)
        if (item.price > 1000) {
            hasExpensive = true;
            const expensiveItem = document.createElement('li');
            expensiveItem.innerHTML = `${item.name} <span>${formatINR(item.price)}</span>`;
            expensiveList.appendChild(expensiveItem);
        }
    });

    // Show/Hide "No low-cost items" message
    if (hasLowCost) {
        noLowCostMsg.style.display = 'none';
    } else {
        noLowCostMsg.style.display = 'block';
        if (cart.length === 0) {
            noLowCostMsg.innerText = "Cart is empty.";
        } else {
            noLowCostMsg.innerText = "No items priced below ₹1000 found.";
        }
    }

    // Show/Hide "No expensive items" message
    if (hasExpensive) {
        noExpensiveMsg.style.display = 'none';
    } else {
        noExpensiveMsg.style.display = 'block';
        if (cart.length === 0) {
            noExpensiveMsg.innerText = "Cart is empty.";
        } else {
            noExpensiveMsg.innerText = "No items priced above ₹1000 found.";
        }
    }
}

// Event Listeners for "Enter" key
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['productName', 'price', 'quantity'];
    
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addProduct();
            }
        });
    });

    renderCart();
    calculateTotals();
});
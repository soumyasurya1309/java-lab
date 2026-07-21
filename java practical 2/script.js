// Global State
let billItems = [];
let discountPercent = 0;

// DOM Elements
const elements = {
    brand: document.getElementById('brand'),
    customBrand: document.getElementById('custom-brand'),
    name: document.getElementById('name'),
    size: document.getElementById('size'),
    color: document.getElementById('color'),
    price: document.getElementById('price'),
    qty: document.getElementById('qty'),
    gstRate: document.getElementById('gst-rate'),
    list: document.getElementById('list'),
    subTotal: document.getElementById('sub'),
    discountDisplay: document.getElementById('discount-display'),
    discVal: document.getElementById('disc-val'),
    cgst: document.getElementById('cgst'),
    sgst: document.getElementById('sgst'),
    final: document.getElementById('final'),
    printBtn: document.getElementById('printBtn'),
    emptyRow: document.getElementById('empty'),
    customerName: document.getElementById('customerName'),
    discountInput: document.getElementById('discountPercent')
};

// Event Listeners
elements.brand.addEventListener('change', function() {
    if (this.value === 'Other') {
        elements.customBrand.style.display = 'block';
        elements.customBrand.focus();
    } else {
        elements.customBrand.style.display = 'none';
    }
});

elements.discountInput.addEventListener('input', function() {
    let val = parseFloat(this.value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 100) val = 100;
    discountPercent = val;
    updateTotals();
});

// Add Item
function addItem() {
    const brand = elements.brand.value;
    const customBrand = elements.customBrand.value.trim();
    const finalBrand = brand === 'Other' ? customBrand : brand;
    
    const name = elements.name.value;
    const size = elements.size.value;
    const color = elements.color.value;
    const price = parseFloat(elements.price.value);
    const qty = parseInt(elements.qty.value);
    const gstRate = parseFloat(elements.gstRate.value) / 100;

    // Validation
    if (!name || !size || !color || !finalBrand || isNaN(price) || price <= 0 || isNaN(qty) || qty < 1) {
        alert('Please fill all fields correctly with valid positive numbers.');
        return;
    }

    const item = {
        id: Date.now(),
        brand: finalBrand,
        name,
        size,
        color,
        price,
        qty,
        gstRate,
        total: price * qty
    };

    billItems.push(item);
    renderTable();
    updateTotals();
    clearInputs();
}

function clearInputs() {
    elements.name.value = '';
    elements.size.value = '';
    elements.color.value = '';
    elements.price.value = '';
    elements.qty.value = '1';
    elements.brand.value = '';
    elements.customBrand.style.display = 'none';
    elements.name.focus();
}

function removeItem(id) {
    billItems = billItems.filter(item => item.id !== id);
    renderTable();
    updateTotals();
}

function clearBill() {
    if (confirm('Are you sure you want to clear the entire bill?')) {
        billItems = [];
        elements.discountInput.value = '';
        discountPercent = 0;
        renderTable();
        updateTotals();
    }
}

function renderTable() {
    elements.list.innerHTML = '';
    
    if (billItems.length === 0) {
        elements.list.appendChild(elements.emptyRow);
        elements.emptyRow.style.display = 'table-row';
        elements.printBtn.disabled = true;
        return;
    }
    
    elements.emptyRow.style.display = 'none';
    elements.printBtn.disabled = false;

    billItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${item.brand}</strong><br>
                <small>${item.name} (${item.size}, ${item.color})</small>
            </td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>₹${item.total.toFixed(2)}</td>
            <td>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </td>
        `;
        elements.list.appendChild(row);
    });
}

function updateTotals() {
    if (billItems.length === 0) {
        elements.subTotal.textContent = '₹0.00';
        elements.cgst.textContent = '₹0.00';
        elements.sgst.textContent = '₹0.00';
        elements.final.textContent = '₹0.00';
        elements.discountDisplay.style.display = 'none';
        return;
    }

    // Calculate Subtotal
    const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
    elements.subTotal.textContent = `₹${subtotal.toFixed(2)}`;

    // Calculate Discount
    const discountAmount = subtotal * (discountPercent / 100);
    const discountedSubtotal = subtotal - discountAmount;
    
    // Show/Hide Discount
    if (discountPercent > 0) {
        elements.discountDisplay.style.display = 'block';
        elements.discVal.textContent = `₹${discountAmount.toFixed(2)}`;
    } else {
        elements.discountDisplay.style.display = 'none';
    }

    // Calculate GST on Discounted Amount
    // Note: GST is calculated on the final price after discount
    const totalGst = discountedSubtotal * 0.18; // Assuming avg 18% for simplicity or calculate per item
    // Actually, since items have different GST rates, let's calculate per item
    
    let totalCgst = 0;
    let totalSgst = 0;
    
    billItems.forEach(item => {
        const itemTotalAfterDiscount = item.total * (1 - (discountPercent / 100));
        // Split discount proportionally is complex, usually discount is applied to total first
        // Simplified: Apply discount to subtotal, then calculate GST on remaining
        // But if items have different GST rates, we should calculate GST per item first, then apply discount?
        // Standard practice: Discount on Item Total, then GST on discounted amount
    });
    
    // Re-calculate with per-item GST logic
    totalCgst = 0;
    totalSgst = 0;
    
    billItems.forEach(item => {
        const itemDiscount = item.total * (discountPercent / 100);
        const itemAfterDiscount = item.total - itemDiscount;
        const itemGst = itemAfterDiscount * item.gstRate;
        totalCgst += (itemGst / 2);
        totalSgst += (itemGst / 2);
    });

    elements.cgst.textContent = `₹${totalCgst.toFixed(2)}`;
    elements.sgst.textContent = `₹${totalSgst.toFixed(2)}`;
    
    const grandTotal = discountedSubtotal + totalCgst + totalSgst;
    elements.final.textContent = `₹${grandTotal.toFixed(2)}`;
}
// Trading App State
const state = {
    balance: 10000,
    portfolio: {
        arabica: 0,
        robusta: 0,
        liberica: 0,
        excelsa: 0
    },
    prices: {
        arabica: 25.50,
        robusta: 18.75,
        liberica: 32.00,
        excelsa: 28.25
    },
    transactions: []
};

// Initialize the app
function init() {
    loadState();
    updateDisplay();
    startPriceFluctuation();
}

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('roastboothState');
    if (savedState) {
        const loaded = JSON.parse(savedState);
        state.balance = loaded.balance;
        state.portfolio = loaded.portfolio;
        state.transactions = loaded.transactions || [];
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('roastboothState', JSON.stringify(state));
}

// Update all display elements
function updateDisplay() {
    document.getElementById('balance').textContent = state.balance.toFixed(2);
    
    const portfolioValue = calculatePortfolioValue();
    document.getElementById('portfolio-value').textContent = portfolioValue.toFixed(2);
    
    const netWorth = state.balance + portfolioValue;
    document.getElementById('net-worth').textContent = netWorth.toFixed(2);
    
    updateProductCards();
    updateTransactionHistory();
}

// Calculate total portfolio value
function calculatePortfolioValue() {
    let total = 0;
    for (const product in state.portfolio) {
        total += state.portfolio[product] * state.prices[product];
    }
    return total;
}

// Update product cards
function updateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const product = card.dataset.product;
        const priceElement = card.querySelector('.product-price');
        const ownedElement = card.querySelector('.owned-amount');
        
        priceElement.textContent = state.prices[product].toFixed(2);
        ownedElement.textContent = state.portfolio[product].toFixed(2);
    });
}

// Update transaction history
function updateTransactionHistory() {
    const listElement = document.getElementById('transaction-list');
    
    if (state.transactions.length === 0) {
        listElement.innerHTML = '<p class="no-transactions">No transactions yet. Start trading!</p>';
        return;
    }
    
    listElement.innerHTML = '';
    const recentTransactions = state.transactions.slice(-10).reverse();
    
    recentTransactions.forEach(transaction => {
        const item = document.createElement('div');
        item.className = `transaction-item ${transaction.type}`;
        
        const productName = transaction.product.charAt(0).toUpperCase() + transaction.product.slice(1);
        const action = transaction.type === 'buy' ? 'Bought' : 'Sold';
        
        item.innerHTML = `
            <div><strong>${action}</strong> ${transaction.quantity} lbs of ${productName} @ $${transaction.price.toFixed(2)}/lb</div>
            <div>Total: $${transaction.total.toFixed(2)}</div>
            <div class="transaction-time">${transaction.time}</div>
        `;
        
        listElement.appendChild(item);
    });
}

// Execute a trade
function trade(product, type) {
    const card = document.querySelector(`.product-card[data-product="${product}"]`);
    const quantityInput = card.querySelector('.quantity');
    const quantity = parseFloat(quantityInput.value);
    
    if (!quantity || quantity <= 0) {
        showMessage('Please enter a valid quantity', 'error');
        return;
    }
    
    const price = state.prices[product];
    const total = quantity * price;
    
    if (type === 'buy') {
        if (total > state.balance) {
            showMessage('Insufficient funds!', 'error');
            return;
        }
        
        state.balance -= total;
        state.portfolio[product] += quantity;
        
        addTransaction(product, type, quantity, price, total);
        showMessage(`Bought ${quantity} lbs of ${product}!`, 'success');
    } else if (type === 'sell') {
        if (quantity > state.portfolio[product]) {
            showMessage('Insufficient inventory!', 'error');
            return;
        }
        
        state.balance += total;
        state.portfolio[product] -= quantity;
        
        addTransaction(product, type, quantity, price, total);
        showMessage(`Sold ${quantity} lbs of ${product}!`, 'success');
    }
    
    quantityInput.value = 1;
    updateDisplay();
    saveState();
}

// Add a transaction to history
function addTransaction(product, type, quantity, price, total) {
    const transaction = {
        product,
        type,
        quantity,
        price,
        total,
        time: new Date().toLocaleString()
    };
    
    state.transactions.push(transaction);
}

// Show message to user
function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    
    setTimeout(() => {
        messageElement.className = 'message';
        messageElement.style.display = 'none';
    }, 3000);
}

// Simulate price fluctuations
function startPriceFluctuation() {
    setInterval(() => {
        for (const product in state.prices) {
            const change = (Math.random() - 0.5) * 2; // -1 to +1
            state.prices[product] = Math.max(5, state.prices[product] + change);
        }
        updateProductCards();
    }, 5000); // Update every 5 seconds
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', init);

const form = document.getElementById('transaction-form');
const list = document.getElementById('list-items');
const totalBalance = document.getElementById('total-balance');
const ctx = document.getElementById('expenseChart').getContext('2d');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let myChart;

// Fungsi Update UI [cite: 36, 38]
function updateUI() {
    list.innerHTML = '';
    let total = 0;
    const categoryTotals = { Food: 0, Transport: 0, Fun: 0 };

    transactions.forEach((t, index) => {
        total += parseFloat(t.amount);
        categoryTotals[t.category] += parseFloat(t.amount);

        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <div>
                <strong>${t.name}</strong><br>
                <small>$${t.amount} - ${t.category}</small>
            </div>
            <button class="btn-delete" onclick="deleteItem(${index})">Delete</button>
        `;
        list.appendChild(li);
    });

    totalBalance.innerText = `$${total.toFixed(2)}`;
    updateChart(categoryTotals);
}

// Fungsi Simpan ke LocalStorage [cite: 52]
function deleteItem(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateUI();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTx = {
        name: document.getElementById('item-name').value,
        amount: document.getElementById('amount').value,
        category: document.getElementById('category').value
    };

    transactions.push(newTx);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    form.reset();
    updateUI();
});

// Logic Chart.js [cite: 39]
function updateChart(data) {
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#2ecc71', '#3498db', '#e67e22']
            }]
        }
    });
}

updateUI();
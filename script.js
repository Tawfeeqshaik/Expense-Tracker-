let entries = JSON.parse(localStorage.getItem('et-entries') || '[]');

// Set today's date as default
document.getElementById('dt').value = new Date().toISOString().split('T')[0];

// Save entries to localStorage
function save() {
  localStorage.setItem('et-entries', JSON.stringify(entries));
}

// Add a new entry
function addEntry() {
  const desc = document.getElementById('desc').value.trim();
  const amt  = parseFloat(document.getElementById('amt').value);
  const type = document.getElementById('type').value;
  const cat  = document.getElementById('cat').value;
  const dt   = document.getElementById('dt').value;
  const err  = document.getElementById('err-msg');

  if (!desc)        { err.textContent = '⚠️ Please enter a description.'; return; }
  if (!amt || amt <= 0) { err.textContent = '⚠️ Please enter a valid amount.'; return; }
  if (!dt)          { err.textContent = '⚠️ Please select a date.'; return; }
  err.textContent = '';

  entries.unshift({ id: Date.now(), desc, amt, type, cat, dt });
  save();
  renderTable();
  updateSummary();

  document.getElementById('desc').value = '';
  document.getElementById('amt').value  = '';
}

// Delete a single entry by id
function deleteEntry(id) {
  entries = entries.filter(e => e.id !== id);
  save();
  renderTable();
  updateSummary();
}

// Clear all entries
function clearAll() {
  entries = [];
  save();
  renderTable();
  updateSummary();
}

// Render the table based on active filters
function renderTable() {
  const ft     = document.getElementById('filter-type').value;
  const fc     = document.getElementById('filter-cat').value;
  const tbody  = document.getElementById('table-body');
  const empty  = document.getElementById('empty-msg');
  const table  = document.getElementById('main-table');

  const filtered = entries.filter(e => {
    if (ft !== 'all' && e.type !== ft) return false;
    if (fc !== 'all' && e.cat  !== fc) return false;
    return true;
  });

  if (filtered.length === 0) {
    table.style.display = 'none';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    table.style.display = 'table';

    tbody.innerHTML = filtered.map(e => `
      <tr>
        <td>${e.dt}</td>
        <td>${e.desc}</td>
        <td>${e.cat}</td>
        <td>
          <span class="badge ${e.type === 'income' ? 'income-badge' : 'expense-badge'}">
            ${e.type}
          </span>
        </td>
        <td style="font-weight:600; color:${e.type === 'income' ? '#3a9e6f' : '#d9534f'}">
          ${e.type === 'income' ? '+' : '-'}₹${e.amt.toFixed(2)}
        </td>
        <td>
          <button class="del-btn" onclick="deleteEntry(${e.id})">✕</button>
        </td>
      </tr>
    `).join('');
  }
}

// Update the summary cards
function updateSummary() {
  const income  = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amt, 0);
  const expense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amt, 0);
  const bal     = income - expense;

  document.getElementById('total-income').textContent  = '₹' + income.toFixed(2);
  document.getElementById('total-expense').textContent = '₹' + expense.toFixed(2);

  const balEl = document.getElementById('balance');
  balEl.textContent  = (bal < 0 ? '-₹' : '₹') + Math.abs(bal).toFixed(2);
  balEl.style.color  = bal < 0 ? '#d9534f' : '#4a90d9';
}

// Init on page load
renderTable();
updateSummary();

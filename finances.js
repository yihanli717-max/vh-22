
function openSidebar() {
    var side = document.getElementById('sidebar');
    side.style.display = (side.style.display === "block") ? "none" : "block";
}

function closeSidebar() {
    document.getElementById('sidebar').style.display = 'none';
}


function openForm() {
    resetFormState();
    document.getElementById("transaction-form").style.display = "block";
}

function closeForm() {
    resetFormState();
    document.getElementById("transaction-form").style.display = "none";
}


let transactions = [];

function resetFormState() {
    document.getElementById("transaction-form").reset();
    document.getElementById("submitBtn").textContent = "Add";
}

function getValidatedTransactionFormData() {
    const form = document.getElementById("transaction-form");

    if (!form.checkValidity()) {
        showFeedback("Please complete the required expense fields before submitting.", "error");
        form.reportValidity();
        return null;
    }

    const transaction = {
        trDate: document.getElementById("tr-date").value,
        trCategory: document.getElementById("tr-category").value.trim(),
        trAmount: Number(document.getElementById("tr-amount").value),
        trNotes: document.getElementById("tr-notes").value.trim(),
    };

    if (!transaction.trDate || !transaction.trCategory || !transaction.trNotes) {
        showFeedback("Please complete the required expense fields before submitting.", "error");
        return null;
    }

    if (!Number.isFinite(transaction.trAmount) || transaction.trAmount < 0) {
        showFeedback("Expense amount must be a valid non-negative number.", "error");
        return null;
    }

    return transaction;
}

function createCell(value, className = "") {
    const cell = document.createElement("td");
    if (className) {
        cell.className = className;
    }
    cell.textContent = value;
    return cell;
}

function createActionButton(title, iconClassName, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.title = title;
    button.setAttribute("aria-label", title);
    button.addEventListener("click", onClick);

    const icon = document.createElement("i");
    icon.className = iconClassName;
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);

    return button;
}

function showFeedback(message, type = "success") {
    const feedbackElement = document.getElementById("page-feedback");
    feedbackElement.textContent = message;
    feedbackElement.className = `page-feedback is-${type}`;
}

function clearFeedback() {
    const feedbackElement = document.getElementById("page-feedback");
    feedbackElement.textContent = "";
    feedbackElement.className = "page-feedback";
}

function persistFallback(key, fallbackData) {
    try {
        localStorage.setItem(key, JSON.stringify(fallbackData));
    } catch (error) {
        console.warn(`Unable to persist fallback data for ${key}.`, error);
    }

    return fallbackData;
}

function getStoredArray(key, fallbackData) {
    try {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) {
            return persistFallback(key, fallbackData);
        }

        const parsedValue = JSON.parse(storedValue);

        if (!Array.isArray(parsedValue)) {
            throw new Error(`Invalid data format for ${key}`);
        }

        return parsedValue;
    } catch (error) {
        console.warn(`Unable to parse stored data for ${key}. Resetting to fallback data.`, error);
        return persistFallback(key, fallbackData);
    }
}

function getNextTransactionId() {
    const highestId = transactions.reduce((maxId, transaction) => {
        const numericId = Number(transaction.trID);

        if (!Number.isFinite(numericId)) {
            return maxId;
        }

        return Math.max(maxId, numericId);
    }, 0);

    return highestId + 1;
}

window.onload = function () {
    transactions = getStoredArray("bizTrackTransactions", [
            {
                trID: 1,
                trDate: "2024-01-05",
                trCategory: "Rent",
                trAmount: 100.00,
                trNotes: "January Rent"
            },
            {
                trID: 2,
                trDate: "2024-01-15",
                trCategory: "Order Fulfillment",
                trAmount: 35.00,
                trNotes: "Order #1005"
            },
            {
                trID: 3,
                trDate: "2024-01-08",
                trCategory: "Utilities",
                trAmount: 120.00,
                trNotes: "Internet"
            },
            {
                trID: 4,
                trDate: "2024-02-05",
                trCategory: "Supplies",
                trAmount: 180.00,
                trNotes: "Embroidery Machine"
            },
            {
                trID: 5,
                trDate: "2024-01-25",
                trCategory: "Miscellaneous",
                trAmount: 20.00,
                trNotes: "Pizza"
            },
        ]);
  
    renderTransactions(transactions);
}

function addOrUpdate(event) {
    let type = document.getElementById("submitBtn").textContent;
    if (type === 'Add') {
        newTransaction(event);
    } else if (type === 'Update'){
        const trId = document.getElementById("tr-id").value;
        updateTransaction(+trId); // convert to number
    }
}


function newTransaction(event) {
    event.preventDefault();
    clearFeedback();
    const transactionData = getValidatedTransactionFormData();

    if (!transactionData) {
        return;
    }

    const trID = getNextTransactionId();
    
    const transaction = {
      trID,
      ...transactionData,
    };
    
    transactions.push(transaction);
  
    renderTransactions(transactions);
    localStorage.setItem("bizTrackTransactions", JSON.stringify(transactions));
    displayExpenses();
  
    resetFormState();
    showFeedback(`Expense ${trID} added successfully.`);
}


function renderTransactions(transactions) {
    const transactionTableBody = document.getElementById("tableBody");
    transactionTableBody.innerHTML = "";

    const transactionToRender = transactions;

    transactionToRender.forEach(transaction => {
        const transactionRow = document.createElement("tr");
        transactionRow.className = "transaction-row";

        transactionRow.dataset.trID = transaction.trID;
        transactionRow.dataset.trDate = transaction.trDate;
        transactionRow.dataset.trCategory = transaction.trCategory;
        transactionRow.dataset.trAmount = transaction.trAmount;
        transactionRow.dataset.trNotes = transaction.trNotes;

        const formattedAmount = typeof transaction.trAmount === 'number' ? `$${transaction.trAmount.toFixed(2)}` : '';

        transactionRow.appendChild(createCell(transaction.trID));
        transactionRow.appendChild(createCell(transaction.trDate));
        transactionRow.appendChild(createCell(transaction.trCategory));
        transactionRow.appendChild(createCell(formattedAmount, "tr-amount"));
        transactionRow.appendChild(createCell(transaction.trNotes));

        const actionCell = document.createElement("td");
        actionCell.className = "action";

        const editButton = createActionButton("Edit", "edit-icon fa-solid fa-pen-to-square", () => {
            editRow(transaction.trID);
        });
        const deleteButton = createActionButton("Delete", "delete-icon fas fa-trash-alt", () => {
            deleteTransaction(transaction.trID);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        transactionRow.appendChild(actionCell);

        transactionTableBody.appendChild(transactionRow);
  });
  displayExpenses();
}

function displayExpenses() {
    const resultElement = document.getElementById("total-expenses");

    const totalExpenses = transactions
        .reduce((total, transaction) => total + transaction.trAmount,0);

    resultElement.innerHTML = `
        <span>Total Expenses: $${totalExpenses.toFixed(2)}</span>
    `;
}

function editRow(trID) {
    const trToEdit = transactions.find(transaction => transaction.trID == trID);
    
    document.getElementById("tr-id").value = trToEdit.trID;      
    document.getElementById("tr-date").value = trToEdit.trDate;
    document.getElementById("tr-category").value = trToEdit.trCategory;
    document.getElementById("tr-amount").value = trToEdit.trAmount;
    document.getElementById("tr-notes").value = trToEdit.trNotes;
  
    document.getElementById("submitBtn").textContent = "Update";

    document.getElementById("transaction-form").style.display = "block";
  }
  
function deleteTransaction(trID) {
    const indexToDelete = transactions.findIndex(transaction => transaction.trID == trID);

    if (indexToDelete !== -1) {
        transactions.splice(indexToDelete, 1);

        localStorage.setItem("bizTrackTransactions", JSON.stringify(transactions));

        renderTransactions(transactions);
        showFeedback(`Expense ${trID} deleted successfully.`);
    }
}

  function updateTransaction(trID) {
    const indexToUpdate = transactions.findIndex(transaction => transaction.trID === trID);

    if (indexToUpdate !== -1) {
        const transactionData = getValidatedTransactionFormData();

        if (!transactionData) {
            return;
        }

        const updatedTransaction = {
            trID: trID,
            ...transactionData,
        };

        transactions[indexToUpdate] = updatedTransaction;

        localStorage.setItem("bizTrackTransactions", JSON.stringify(transactions));

        renderTransactions(transactions);

        resetFormState();
        showFeedback(`Expense ${trID} updated successfully.`);
    }
}

function sortTable(column) {
    const tbody = document.getElementById("tableBody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    const isNumeric = column === "trID" || column === "trAmount";

    const sortedRows = rows.sort((a, b) => {
        const aValue = isNumeric ? parseFloat(a.dataset[column]) : a.dataset[column];
        const bValue = isNumeric ? parseFloat(b.dataset[column]) : b.dataset[column];

        if (typeof aValue === "string" && typeof bValue === "string") {
            // Case-insensitive string comparison for text columns
            return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
        } else {
            return aValue - bValue;
        }
    });

    rows.forEach(row => tbody.removeChild(row));

    sortedRows.forEach(row => tbody.appendChild(row));
}

document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        performSearch();
    }
});

document.getElementById("searchInput").addEventListener("input", performSearch);
document.getElementById("searchInput").addEventListener("search", performSearch);


function performSearch() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    const rows = document.querySelectorAll(".transaction-row");
    let visibleCount = 0;

    rows.forEach(row => {
        const visible = row.innerText.toLowerCase().includes(searchInput);
        row.style.display = visible ? "table-row" : "none";
        if (visible) {
            visibleCount += 1;
        }
    });

    if (!searchInput) {
        clearFeedback();
        return;
    }

    if (visibleCount === 0) {
        showFeedback("No matching expenses found.", "info");
        return;
    }

    clearFeedback();
}


function exportToCSV() {
    const transactionsToExport = transactions.map(transaction => {
        return {
            trID: transaction.trID,
            trDate: transaction.trDate,
            trCategory: transaction.trCategory,
            trAmount: transaction.trAmount.toFixed(2),
            trNotes: transaction.trNotes,
        };
    });
  
    const csvContent = generateCSV(transactionsToExport);
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'biztrack_expense_table.csv';
  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    showFeedback("Expenses exported to CSV.");
}
  
function escapeCSVValue(value) {
    const stringValue = String(value ?? "");
    const safeValue = /^[\t\r ]*[=+\-@]/.test(stringValue) ? `'${stringValue}` : stringValue;
    const escapedQuotes = safeValue.replace(/"/g, '""');

    return /[",\n\r]/.test(escapedQuotes) ? `"${escapedQuotes}"` : escapedQuotes;
}

function generateCSV(data) {
    const headers = Object.keys(data[0]).map(escapeCSVValue).join(',');
    const rows = data.map(order => Object.values(order).map(escapeCSVValue).join(','));

    return `${headers}\n${rows.join('\n')}`;
}

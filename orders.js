
function openSidebar() {
    var side = document.getElementById('sidebar');
    side.style.display = (side.style.display === "block") ? "none" : "block";
}

function closeSidebar() {
    document.getElementById('sidebar').style.display = 'none';
}


function openForm() {
    resetFormState();
    document.getElementById("order-form").style.display = "block";
}

function closeForm() {
    resetFormState();
    document.getElementById("order-form").style.display = "none";
}

let orders = [];

function setOrderIdReadOnly(isReadOnly) {
    const orderIdInput = document.getElementById("order-id");
    orderIdInput.readOnly = isReadOnly;
    orderIdInput.setAttribute("aria-readonly", String(isReadOnly));
}

function resetFormState() {
    const orderForm = document.getElementById("order-form");
    delete orderForm.dataset.editingId;
    document.getElementById("order-form").reset();
    document.getElementById("submitBtn").textContent = "Add";
    setOrderIdReadOnly(false);
}

function getValidatedOrderFormData() {
    const form = document.getElementById("order-form");

    if (!form.checkValidity()) {
        showFeedback("Please complete the required order fields before submitting.", "error");
        form.reportValidity();
        return null;
    }

    const itemPrice = Number(document.getElementById("item-price").value);
    const qtyBought = Number(document.getElementById("qty-bought").value);
    const shipping = Number(document.getElementById("shipping").value);
    const taxes = Number(document.getElementById("taxes").value);

    const order = {
        orderID: document.getElementById("order-id").value.trim(),
        orderDate: document.getElementById("order-date").value,
        itemName: document.getElementById("item-name").value.trim(),
        itemPrice,
        qtyBought,
        shipping,
        taxes,
        orderStatus: document.getElementById("order-status").value.trim(),
    };

    if (!order.orderID || !order.orderDate || !order.itemName || !order.orderStatus) {
        showFeedback("Please complete the required order fields before submitting.", "error");
        return null;
    }

    if (!Number.isFinite(itemPrice) || itemPrice < 0) {
        showFeedback("Item price must be a valid non-negative number.", "error");
        return null;
    }

    if (!Number.isInteger(qtyBought) || qtyBought <= 0) {
        showFeedback("Quantity bought must be a valid whole number greater than zero.", "error");
        return null;
    }

    if (!Number.isFinite(shipping) || shipping < 0 || !Number.isFinite(taxes) || taxes < 0) {
        showFeedback("Shipping and taxes must be valid non-negative numbers.", "error");
        return null;
    }

    return {
        ...order,
        orderTotal: ((itemPrice * qtyBought) + shipping + taxes),
    };
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

window.onload = function () {
    orders = getStoredArray("bizTrackOrders", [
        {
            orderID: "1001",
            orderDate: "2024-01-05",
            itemName: "Baseball caps",
            itemPrice: 25.00,
            qtyBought: 2,
            shipping: 2.50,
            taxes: 9.00,
            orderTotal: 61.50,
            orderStatus: "Pending"
        },
        {
            orderID: "1002",
            orderDate: "2024-03-05",
            itemName: "Water bottles",
            itemPrice: 17.00,
            qtyBought: 3,
            shipping: 3.50,
            taxes: 6.00,
            orderTotal: 60.50,
            orderStatus: "Processing"
        },
        {
            orderID: "1003",
            orderDate: "2024-02-05",
            itemName: "Tote bags",
            itemPrice: 20.00,
            qtyBought: 4,
            shipping: 2.50,
            taxes: 2.00,
            orderTotal: 84.50,
            orderStatus: "Shipped"
        },
        {
            orderID: "1004",
            orderDate: "2023-01-05",
            itemName: "Canvas prints",
            itemPrice: 55.00,
            qtyBought: 1,
            shipping: 2.50,
            taxes: 19.00,
            orderTotal: 76.50,
            orderStatus: "Delivered"
        },
        {
            orderID: "1005",
            orderDate: "2024-01-15",
            itemName: "Beanies",
            itemPrice: 15.00,
            qtyBought: 2,
            shipping: 3.90,
            taxes: 4.00,
            orderTotal: 37.90,
            orderStatus: "Pending"
        },
        ]);

    renderOrders(orders);
}

function addOrUpdate(event) {
    let type = document.getElementById("submitBtn").textContent;
    if (type === 'Add') {
        newOrder(event);
    } else if (type === 'Update'){
        const orderID = document.getElementById("order-form").dataset.editingId;
        updateOrder(orderID);
    }
}


function newOrder(event) {
  event.preventDefault();
  clearFeedback();
  const order = getValidatedOrderFormData();

  if (!order) {
    return;
  }

  if (isDuplicateID(order.orderID, null)) {
    showFeedback("Order ID already exists. Please use a unique ID.", "error");
    return;
  }

  orders.push(order);

  renderOrders(orders);
  localStorage.setItem("bizTrackOrders", JSON.stringify(orders));

  resetFormState();
  showFeedback(`Order ${order.orderID} added successfully.`);
}


function renderOrders(orders) {
    const orderTableBody = document.getElementById("tableBody");
    orderTableBody.innerHTML = "";

    const orderToRender = orders;
    const statusMap = {
        "Pending": "pending",
        "Processing": "processing",
        "Shipped": "shipped",
        "Delivered": "delivered"
    }

    orderToRender.forEach(order => {
      const orderRow = document.createElement("tr");
      orderRow.className = "order-row";

      orderRow.dataset.orderID = order.orderID;
      orderRow.dataset.orderDate = order.orderDate;
      orderRow.dataset.itemName = order.itemName;
      orderRow.dataset.itemPrice = order.itemPrice;
      orderRow.dataset.qtyBought = order.qtyBought;
      orderRow.dataset.shipping = order.shipping;
      orderRow.dataset.taxes = order.taxes;
      orderRow.dataset.orderTotal = order.orderTotal;
      orderRow.dataset.orderStatus = order.orderStatus;

      const formattedPrice = typeof order.itemPrice === 'number' ? `$${order.itemPrice.toFixed(2)}` : '';
      const formattedShipping = typeof order.shipping === 'number' ? `$${order.shipping.toFixed(2)}` : '';
      const formattedTaxes = typeof order.taxes === 'number' ? `$${order.taxes.toFixed(2)}` : '';
      const formattedTotal = typeof order.orderTotal === 'number' ? `$${order.orderTotal.toFixed(2)}` : '';

      orderRow.appendChild(createCell(order.orderID));
      orderRow.appendChild(createCell(order.orderDate));
      orderRow.appendChild(createCell(order.itemName));
      orderRow.appendChild(createCell(formattedPrice));
      orderRow.appendChild(createCell(order.qtyBought));
      orderRow.appendChild(createCell(formattedShipping));
      orderRow.appendChild(createCell(formattedTaxes));
      orderRow.appendChild(createCell(formattedTotal, "order-total"));

      const statusCell = document.createElement("td");
      const statusElement = document.createElement("div");
      statusElement.className = `status ${statusMap[order.orderStatus]}`;
      const statusLabel = document.createElement("span");
      statusLabel.textContent = order.orderStatus;
      statusElement.appendChild(statusLabel);
      statusCell.appendChild(statusElement);
      orderRow.appendChild(statusCell);

      const actionCell = document.createElement("td");
      actionCell.className = "action";

      const editButton = createActionButton("Edit", "edit-icon fa-solid fa-pen-to-square", () => {
        editRow(order.orderID);
      });
      const deleteButton = createActionButton("Delete", "delete-icon fas fa-trash-alt", () => {
        deleteOrder(order.orderID);
      });

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
      orderRow.appendChild(actionCell);

      orderTableBody.appendChild(orderRow);
  });
  displayRevenue();
}

function displayRevenue() {
    const resultElement = document.getElementById("total-revenue");

    const totalRevenue = orders
        .reduce((total, order) => total + order.orderTotal, 0);

    resultElement.innerHTML = `
        <span>Total Revenue: $${totalRevenue.toFixed(2)}</span>
    `;
}

function editRow(orderID) {
    const orderForm = document.getElementById("order-form");
    const orderToEdit = orders.find(order => order.orderID === orderID);

    document.getElementById("order-id").value = orderToEdit.orderID;
    document.getElementById("order-date").value = orderToEdit.orderDate;
    document.getElementById("item-name").value = orderToEdit.itemName;
    document.getElementById("item-price").value = orderToEdit.itemPrice;
    document.getElementById("qty-bought").value = orderToEdit.qtyBought;
    document.getElementById("shipping").value = orderToEdit.shipping;
    document.getElementById("taxes").value = orderToEdit.taxes;
    document.getElementById("order-total").value = orderToEdit.orderTotal;
    document.getElementById("order-status").value = orderToEdit.orderStatus;

    orderForm.dataset.editingId = orderToEdit.orderID;
    document.getElementById("submitBtn").textContent = "Update";
    setOrderIdReadOnly(true);

    orderForm.style.display = "block";
}

function deleteOrder(orderID) {
  const indexToDelete = orders.findIndex(order => order.orderID === orderID);

  if (indexToDelete !== -1) {
      orders.splice(indexToDelete, 1);

      localStorage.setItem("bizTrackOrders", JSON.stringify(orders));

      renderOrders(orders);
      showFeedback(`Order ${orderID} deleted successfully.`);
  }
}

function updateOrder(orderID) {
    const indexToUpdate = orders.findIndex(order => order.orderID === orderID);

    if (indexToUpdate !== -1) {
        const updatedOrder = getValidatedOrderFormData();

        if (!updatedOrder) {
            return;
        }

        updatedOrder.orderID = orderID;

        orders[indexToUpdate] = updatedOrder;

        localStorage.setItem("bizTrackOrders", JSON.stringify(orders));

        renderOrders(orders);

        resetFormState();
        showFeedback(`Order ${updatedOrder.orderID} updated successfully.`);
    }
}

function isDuplicateID(orderID, currentID) {
    return orders.some(order => order.orderID === orderID && order.orderID !== currentID);
}

function sortTable(column) {
    const tbody = document.getElementById("tableBody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    const isNumeric = column === "itemPrice" || column === "qtyBought" || column === "shipping"|| column === "taxes"|| column === "orderTotal";

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
    const rows = document.querySelectorAll(".order-row");
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
        showFeedback("No matching orders found.", "info");
        return;
    }

    clearFeedback();
}


function exportToCSV() {
    const ordersToExport = orders.map(order => {
        return {
            orderID: order.orderID,
            orderDate: order.orderDate,
            itemName: order.itemName,
            itemPrice: order.itemPrice.toFixed(2),
            qtyBought: order.qtyBought,
            shipping: order.shipping.toFixed(2),
            taxes: order.taxes.toFixed(2),
            orderTotal: order.orderTotal.toFixed(2),
            orderStatus: order.orderStatus,
        };
    });
  
    const csvContent = generateCSV(ordersToExport);
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'biztrack_order_table.csv';
  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    showFeedback("Orders exported to CSV.");
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

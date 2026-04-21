
function openSidebar() {
  var side = document.getElementById('sidebar');
  side.style.display = (side.style.display === "block") ? "none" : "block";
}

function closeSidebar() {
  document.getElementById('sidebar').style.display = 'none';
}


function openForm() {
    resetFormState();
    document.getElementById("product-form").style.display = "block";
}

function closeForm() {
    resetFormState();
    document.getElementById("product-form").style.display = "none";
}


let products = [];

function resetFormState() {
  document.getElementById("product-form").reset();
  document.getElementById("submitBtn").textContent = "Add";
}

function getValidatedProductFormData() {
  const form = document.getElementById("product-form");

  if (!form.checkValidity()) {
    showFeedback("Please complete the required product fields before submitting.", "error");
    form.reportValidity();
    return null;
  }

  const product = {
    prodID: document.getElementById("product-id").value.trim(),
    prodName: document.getElementById("product-name").value.trim(),
    prodDesc: document.getElementById("product-desc").value.trim(),
    prodCat: document.getElementById("product-cat").value.trim(),
    prodPrice: Number(document.getElementById("product-price").value),
    prodSold: Number(document.getElementById("product-sold").value),
  };

  if (!product.prodID || !product.prodName || !product.prodDesc || !product.prodCat) {
    showFeedback("Please complete the required product fields before submitting.", "error");
    return null;
  }

  if (!Number.isFinite(product.prodPrice) || product.prodPrice < 0) {
    showFeedback("Product price must be a valid non-negative number.", "error");
    return null;
  }

  if (!Number.isInteger(product.prodSold) || product.prodSold < 0) {
    showFeedback("Units sold must be a valid non-negative whole number.", "error");
    return null;
  }

  return product;
}

function createCell(value) {
  const cell = document.createElement("td");
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

function init() {
  products = getStoredArray("bizTrackProducts", [
        {
          prodID: "PD001",
          prodName: "Baseball caps",
          prodDesc: "Peace embroidered cap",
          prodCat: "Hats",
          prodPrice: 25.00,
          prodSold: 20
        },
        {
          prodID: "PD002",
          prodName: "Water bottles",
          prodDesc: "Floral lotus printed bottle",
          prodCat: "Drinkware",
          prodPrice: 48.50,
          prodSold: 10
        },
        {
          prodID: "PD003",
          prodName: "Sweatshirts",
          prodDesc: "Palestine sweater",
          prodCat: "Clothing",
          prodPrice: 17.50,
          prodSold: 70
        },
        {
          prodID: "PD004",
          prodName: "Posters",
          prodDesc: "Vibes printed poster",
          prodCat: "Home decor",
          prodPrice: 12.00,
          prodSold: 60
        },
        {
          prodID: "PD005",
          prodName: "Pillow cases",
          prodDesc: "Morrocan print pillow case",
          prodCat: "Accessories",
          prodPrice: 17.00,
          prodSold: 40
        },
      ]);

    renderProducts(products);
}

function addOrUpdate(event) {
  let type = document.getElementById("submitBtn").textContent;
  if (type === 'Add') {
      newProduct(event);
  } else if (type === 'Update'){
      const prodID = document.getElementById("product-id").value;
      updateProduct(prodID);
  }
}

function newProduct(event) {
  event.preventDefault();
  clearFeedback();
  const product = getValidatedProductFormData();

  if (!product) {
    return;
  }

  if (isDuplicateID(product.prodID, null)) {
    showFeedback("Product ID already exists. Please use a unique ID.", "error");
    return;
  }

  products.push(product);

  renderProducts(products);
  localStorage.setItem("bizTrackProducts", JSON.stringify(products));

  resetFormState();
  showFeedback(`Product ${product.prodID} added successfully.`);
}


function renderProducts(products) {
  const prodTableBody = document.getElementById("tableBody");
  prodTableBody.innerHTML = "";

  const prodToRender = products;

  prodToRender.forEach(product => {
      const prodRow = document.createElement("tr");
      prodRow.className = "product-row";

      prodRow.dataset.prodID = product.prodID;
      prodRow.dataset.prodName = product.prodName;
      prodRow.dataset.prodDesc = product.prodDesc;
      prodRow.dataset.prodCat = product.prodCat;
      prodRow.dataset.prodPrice = product.prodPrice;
      prodRow.dataset.prodSold = product.prodSold;

      prodRow.appendChild(createCell(product.prodID));
      prodRow.appendChild(createCell(product.prodName));
      prodRow.appendChild(createCell(product.prodDesc));
      prodRow.appendChild(createCell(product.prodCat));
      prodRow.appendChild(createCell(`$${product.prodPrice.toFixed(2)}`));
      prodRow.appendChild(createCell(product.prodSold));

      const actionCell = document.createElement("td");
      actionCell.className = "action";

      const editButton = createActionButton("Edit", "edit-icon fa-solid fa-pen-to-square", () => {
        editRow(product.prodID);
      });
      const deleteButton = createActionButton("Delete", "delete-icon fas fa-trash-alt", () => {
        deleteProduct(product.prodID);
      });

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
      prodRow.appendChild(actionCell);

      prodTableBody.appendChild(prodRow);
  });
}

function editRow(prodID) {
  const productToEdit = products.find(product => product.prodID === prodID);

  document.getElementById("product-id").value = productToEdit.prodID;
  document.getElementById("product-name").value = productToEdit.prodName;
  document.getElementById("product-desc").value = productToEdit.prodDesc;
  document.getElementById("product-cat").value = productToEdit.prodCat;
  document.getElementById("product-price").value = productToEdit.prodPrice;
  document.getElementById("product-sold").value = productToEdit.prodSold;

  document.getElementById("submitBtn").textContent = "Update";

  document.getElementById("product-form").style.display = "block";
}

function deleteProduct(prodID) {
  const indexToDelete = products.findIndex(product => product.prodID === prodID);

  if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1);

      localStorage.setItem("bizTrackProducts", JSON.stringify(products));

      renderProducts(products);
      showFeedback(`Product ${prodID} deleted successfully.`);
  }
}

function updateProduct(prodID) {
    const indexToUpdate = products.findIndex(product => product.prodID === prodID);

    if (indexToUpdate !== -1) {
        const updatedProduct = getValidatedProductFormData();

        if (!updatedProduct) {
            return;
        }

        if (isDuplicateID(updatedProduct.prodID, prodID)) {
            showFeedback("Product ID already exists. Please use a unique ID.", "error");
            return;
        }

        products[indexToUpdate] = updatedProduct;

        localStorage.setItem("bizTrackProducts", JSON.stringify(products));

        renderProducts(products);

        resetFormState();
        showFeedback(`Product ${updatedProduct.prodID} updated successfully.`);
    }
}

function isDuplicateID(prodID, currentID) {
    return products.some(product => product.prodID === prodID && product.prodID !== currentID);
}

function sortTable(column) {
    const tbody = document.getElementById("tableBody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    const isNumeric = column === "prodPrice" || column === "prodSold";

    const sortedRows = rows.sort((a, b) => {
        const aValue = isNumeric ? parseFloat(a.dataset[column]) : a.dataset[column];
        const bValue = isNumeric ? parseFloat(b.dataset[column]) : b.dataset[column];

        if (typeof aValue === "string" && typeof bValue === "string") {
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
    const rows = document.querySelectorAll(".product-row");
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
        showFeedback("No matching products found.", "info");
        return;
    }

    clearFeedback();
}


function exportToCSV() {
  const productsToExport = products.map(product => {
      return {
        prodID: product.prodID,
        prodName: product.prodName,
        prodDesc: product.prodDesc,
        prodCategory: product.prodCat,
        prodPrice: product.prodPrice.toFixed(2),
        QtySold: product.prodSold,
      };
  });

  const csvContent = generateCSV(productsToExport);

  const blob = new Blob([csvContent], { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'biztrack_product_table.csv';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  showFeedback("Products exported to CSV.");
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

init();

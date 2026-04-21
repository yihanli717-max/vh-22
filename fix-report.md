id: 1
deficiency type: Security - DOM XSS
deficiency description: User-controlled values from products, orders, and expenses were interpolated directly into table-row `innerHTML`. That allowed malicious markup entered through fields such as product description or expense notes to be injected into the DOM during render. The fix switches those rows to safe DOM node creation with `textContent`, while preserving the existing edit/delete behavior through event listeners instead of inline handler strings.
original location: `products.js`, L120; `orders.js`, L141; `finances.js`, L117
improvement:
```diff
diff --git a/products.js b/products.js
@@
-      prodRow.innerHTML = `
-          <td>${product.prodID}</td>
-          <td>${product.prodName}</td>
-          <td>${product.prodDesc}</td>
-          <td>${product.prodCat}</td>
-          <td>$${product.prodPrice.toFixed(2)}</td>
-          <td>${product.prodSold}</td>
-          <td class="action">
-            <i title="Edit" onclick="editRow('${product.prodID}')" class="edit-icon fa-solid fa-pen-to-square"></i>
-            <i onclick="deleteProduct('${product.prodID}')" class="delete-icon fas fa-trash-alt"></i>
-          </td>
-      `;
+      prodRow.appendChild(createCell(product.prodID));
+      prodRow.appendChild(createCell(product.prodName));
+      prodRow.appendChild(createCell(product.prodDesc));
+      prodRow.appendChild(createCell(product.prodCat));
+      prodRow.appendChild(createCell(`$${product.prodPrice.toFixed(2)}`));
+      prodRow.appendChild(createCell(product.prodSold));
+      const actionCell = document.createElement("td");
+      const editButton = createActionButton("Edit", "edit-icon fa-solid fa-pen-to-square", () => editRow(product.prodID));
+      const deleteButton = createActionButton("Delete", "delete-icon fas fa-trash-alt", () => deleteProduct(product.prodID));
+
diff --git a/orders.js b/orders.js
@@
-      orderRow.innerHTML = `
-        <td>${order.orderID}</td>
-        <td>${order.orderDate}</td>
-        <td>${order.itemName}</td>
-        <td>${formattedPrice}</td>
-        <td>${order.qtyBought}</td>
-        <td>${formattedShipping}</td>
-        <td>${formattedTaxes}</td>
-        <td class="order-total">${formattedTotal}</td>
-        <td>
-            <div class="status ${statusMap[order.orderStatus]}"><span>${order.orderStatus}</span></div>
-        </td>
-        <td class="action">
-            <i title="Edit" onclick="editRow('${order.orderID}')" class="edit-icon fa-solid fa-pen-to-square"></i>
-            <i onclick="deleteOrder('${order.orderID}')" class="delete-icon fas fa-trash-alt"></i>
-          </td>
-      `;
+      orderRow.appendChild(createCell(order.orderID));
+      orderRow.appendChild(createCell(order.orderDate));
+      orderRow.appendChild(createCell(order.itemName));
+      orderRow.appendChild(createCell(formattedPrice));
+      orderRow.appendChild(createCell(order.qtyBought));
+      orderRow.appendChild(createCell(formattedShipping));
+      orderRow.appendChild(createCell(formattedTaxes));
+      orderRow.appendChild(createCell(formattedTotal, "order-total"));
+      statusLabel.textContent = order.orderStatus;
+
diff --git a/finances.js b/finances.js
@@
-        transactionRow.innerHTML = `
-            <td>${transaction.trID}</td>
-            <td>${transaction.trDate}</td>
-            <td>${transaction.trCategory}</td>
-            <td class="tr-amount">${formattedAmount}</td>
-            <td>${transaction.trNotes}</td>
-            <td class="action">
-                <i title="Edit" onclick="editRow('${transaction.trID}')" class="edit-icon fa-solid fa-pen-to-square"></i>
-                <i onclick="deleteTransaction('${transaction.trID}')" class="delete-icon fas fa-trash-alt"></i>
-            </td>
-        `;
+        transactionRow.appendChild(createCell(transaction.trID));
+        transactionRow.appendChild(createCell(transaction.trDate));
+        transactionRow.appendChild(createCell(transaction.trCategory));
+        transactionRow.appendChild(createCell(formattedAmount, "tr-amount"));
+        transactionRow.appendChild(createCell(transaction.trNotes));
+        const editButton = createActionButton("Edit", "edit-icon fa-solid fa-pen-to-square", () => editRow(transaction.trID));
+        const deleteButton = createActionButton("Delete", "delete-icon fas fa-trash-alt", () => deleteTransaction(transaction.trID));
```

id: 2
deficiency type: Data Integrity - Fragile localStorage Parsing
deficiency description: Multiple pages parsed `localStorage` directly with `JSON.parse(localStorage.getItem(...))` or equivalent branching logic. If stored data became malformed JSON or was overwritten with a non-array value, the page could crash before rendering. The fix adds a small safe-read helper that catches parse errors, validates the parsed type, and restores fallback seed data when the cache is missing or invalid.
original location: `products.js`, L24; `orders.js`, L23; `finances.js`, L25; `script.js`, L13
improvement:
```diff
diff --git a/products.js b/products.js
@@
-function init() {
-  const storedProducts = localStorage.getItem("bizTrackProducts");
-  if (storedProducts) {
-      products = JSON.parse(storedProducts);
-  } else {
-      products = [
+function persistFallback(key, fallbackData) {
+  try {
+    localStorage.setItem(key, JSON.stringify(fallbackData));
+  } catch (error) {
+    console.warn(`Unable to persist fallback data for ${key}.`, error);
+  }
+  return fallbackData;
+}
+
+function getStoredArray(key, fallbackData) {
+  try {
+    const storedValue = localStorage.getItem(key);
+    if (!storedValue) {
+      return persistFallback(key, fallbackData);
+    }
+    const parsedValue = JSON.parse(storedValue);
+    if (!Array.isArray(parsedValue)) {
+      throw new Error(`Invalid data format for ${key}`);
+    }
+    return parsedValue;
+  } catch (error) {
+    return persistFallback(key, fallbackData);
+  }
+}
+
+function init() {
+  products = getStoredArray("bizTrackProducts", [
         ...
-      ];
-      localStorage.setItem("bizTrackProducts", JSON.stringify(products));
-    }
+      ]);

diff --git a/orders.js b/orders.js
@@
-window.onload = function () {
-    const storedOrders = localStorage.getItem("bizTrackOrders");
-    if (storedOrders) {
-        orders = JSON.parse(storedOrders);
-    } else {
-        orders = [
+window.onload = function () {
+    orders = getStoredArray("bizTrackOrders", [
         ...
-        ];
-        localStorage.setItem("bizTrackOrders", JSON.stringify(orders));
-    }
+        ]);

diff --git a/finances.js b/finances.js
@@
-window.onload = function () {
-    const storedTransactions = localStorage.getItem("bizTrackTransactions");
-    if (storedTransactions) {
-        transactions = JSON.parse(storedTransactions);
-    } else {
-        transactions = [
+window.onload = function () {
+    transactions = getStoredArray("bizTrackTransactions", [
         ...
-        ];
-        localStorage.setItem("bizTrackTransactions", JSON.stringify(transactions));
-    }
+        ]);
+    serialNumberCounter = transactions.length + 1;

diff --git a/script.js b/script.js
@@
-  const expenses = JSON.parse(localStorage.getItem('bizTrackTransactions')) || [
+  const expenses = getStoredArray('bizTrackTransactions', [
     ...
-  ];
-  const revenues = JSON.parse(localStorage.getItem('bizTrackOrders')) || [
+  ]);
+  const revenues = getStoredArray('bizTrackOrders', [
     ...
-  ];
+  ]);
```

id: 3
deficiency type: Logic - Duplicate Expense IDs / Logic Collision
deficiency description: New expense records used `transactions.length + 1` as the next `trID`. After deleting a middle record, that logic could reuse an existing ID, which made future edit/delete operations ambiguous because multiple rows could point to the same identifier. The fix replaces length-based numbering with a max-ID scan so each new expense always receives a unique next identifier.
original location: `finances.js`, L87
improvement:
```diff
diff --git a/finances.js b/finances.js
@@
-let transactions = [];
-let serialNumberCounter;
+let transactions = [];
+
+function getNextTransactionId() {
+    const highestId = transactions.reduce((maxId, transaction) => {
+        const numericId = Number(transaction.trID);
+        if (!Number.isFinite(numericId)) {
+            return maxId;
+        }
+        return Math.max(maxId, numericId);
+    }, 0);
+
+    return highestId + 1;
+}

@@
-    serialNumberCounter = transactions.length + 1;
-    let trID = serialNumberCounter;
+    const trID = getNextTransactionId();
     
     const transaction = {
       trID,
@@
-    serialNumberCounter++;
     displayExpenses();
```

id: 4
deficiency type: Accessibility - Keyboard Inaccessible Controls
deficiency description: Several important controls were only clickable with a mouse because they were implemented as `div` or `i` elements with `onclick`, and sortable table headers were attached directly to `<th>` cells. Keyboard users could not reliably tab to or activate the navigation toggle, close button, or sort controls. The fix replaces those interactions with semantic `button` elements while keeping the existing JavaScript handlers unchanged.
original location: `index.html`, L22 and L66; `products.html`, L22, L66, L160; `orders.html`, L22, L66, L174; `finances.html`, L22, L66, L126; `help.html`, L22 and L66; `about.html`, L22 and L66
improvement:
```diff
diff --git a/index.html b/index.html
@@
-            <i class="fa-solid fa-xmark" title="Close" onclick="closeSidebar()"></i>
+            <button type="button" class="icon-button" aria-label="Close navigation" onclick="closeSidebar()">
+                <i class="fa-solid fa-xmark" title="Close" aria-hidden="true"></i>
+            </button>
@@
-            <div class="menu-icon" onclick="openSidebar()">
+            <button type="button" class="menu-icon" aria-label="Open navigation" onclick="openSidebar()">
                 <i class="fa-solid fa-bars"></i>
-            </div>
+            </button>

diff --git a/products.html b/products.html
@@
-                            <th onclick="sortTable('prodID')">Product ID</th>
-                            <th onclick="sortTable('prodName')">Product Name</th>
+                            <th><button type="button" class="sort-button" onclick="sortTable('prodID')">Product ID</button></th>
+                            <th><button type="button" class="sort-button" onclick="sortTable('prodName')">Product Name</button></th>
                             ...

diff --git a/orders.html b/orders.html
@@
-                            <th onclick="sortTable('orderID')">Order ID</th>
-                            <th onclick="sortTable('orderDate')">Order Date</th>
+                            <th><button type="button" class="sort-button" onclick="sortTable('orderID')">Order ID</button></th>
+                            <th><button type="button" class="sort-button" onclick="sortTable('orderDate')">Order Date</button></th>
                             ...

diff --git a/finances.html b/finances.html
@@
-                            <th onclick="sortTable('trID')">S/N</th>
-                            <th onclick="sortTable('trDate')">Date</th>
+                            <th><button type="button" class="sort-button" onclick="sortTable('trID')">S/N</button></th>
+                            <th><button type="button" class="sort-button" onclick="sortTable('trDate')">Date</button></th>
                             ...

diff --git a/styles.css b/styles.css
@@
+.icon-button,
+.menu-icon,
+.sort-button {
+    background: none;
+    border: none;
+    color: inherit;
+    font: inherit;
+}
```

id: 5
deficiency type: Accessibility - Focus Indicator Removed
deficiency description: The shared stylesheet globally removed outlines and also suppressed focus outlines on form fields, which meant keyboard users had little or no visual indication of where focus currently was. The fix removes the blanket outline reset and adds a small set of visible `:focus-visible` and `:focus-within` styles for links, buttons, inputs, selects, and grouped controls.
original location: `styles.css`, L13 and L277
improvement:
```diff
diff --git a/styles.css b/styles.css
@@
 * {
     margin: 0;
     padding: 0;
     border: none;
-    outline: none;
     box-sizing: border-box;
     font-family: "Lato", sans-serif;
 }

@@
-.form-container input[type=text]:focus, 
-.form-container input[type=date]:focus,
-.form-container input[type=number]:focus {
+.form-container input[type=text]:focus, 
+.form-container input[type=date]:focus,
+.form-container input[type=number]:focus,
+.form-container select:focus {
     background-color: #ddd;
-    outline: none;
 }
+
+.menu a:focus-visible,
+button:focus-visible,
+input:focus-visible,
+select:focus-visible,
+textarea:focus-visible {
+    outline: 3px solid var(--blue-color);
+    outline-offset: 3px;
+    border-radius: 6px;
+}
+
+.search-box:focus-within {
+    box-shadow: 0 0 0 3px rgba(36, 123, 160, 0.35);
+}
```

id: 6
deficiency type: UX - Missing Inline Feedback
deficiency description: Product, order, and expense actions gave little or no page-level feedback. Success states such as add, update, delete, and CSV export completed silently, while duplicate-ID failures relied on blocking `alert()` dialogs. The fix adds a lightweight inline feedback region to each CRUD page and routes both success and error messages through it, so users can immediately see what happened without disruptive popups.
original location: `products.html`, L90; `orders.html`, L90; `finances.html`, L90; `products.js`, L88; `orders.js`, L103; `finances.js`, L146
improvement:
```diff
diff --git a/products.html b/products.html
@@
             <div class="product-title">
                 ...
             </div>
+            <p id="page-feedback" class="page-feedback" role="status" aria-live="polite"></p>

diff --git a/products.js b/products.js
@@
+function showFeedback(message, type = "success") {
+  const feedbackElement = document.getElementById("page-feedback");
+  feedbackElement.textContent = message;
+  feedbackElement.className = `page-feedback is-${type}`;
+}
+
+function clearFeedback() {
+  const feedbackElement = document.getElementById("page-feedback");
+  feedbackElement.textContent = "";
+  feedbackElement.className = "page-feedback";
+}
@@
-  if (isDuplicateID(prodID, null)) {
-    alert("Product ID already exists. Please use a unique ID.");
+  if (isDuplicateID(prodID, null)) {
+    showFeedback("Product ID already exists. Please use a unique ID.", "error");
     return;
   }
@@
+  showFeedback(`Product ${prodID} added successfully.`);
+  showFeedback(`Product ${prodID} deleted successfully.`);
+  showFeedback(`Product ${updatedProduct.prodID} updated successfully.`);
+  showFeedback("Products exported to CSV.");

diff --git a/orders.js b/orders.js
@@
-    alert("Order ID already exists. Please use a unique ID.");
+    showFeedback("Order ID already exists. Please use a unique ID.", "error");
@@
+  showFeedback(`Order ${orderID} added successfully.`);
+  showFeedback(`Order ${orderID} deleted successfully.`);
+  showFeedback(`Order ${updatedOrder.orderID} updated successfully.`);
+  showFeedback("Orders exported to CSV.");

diff --git a/finances.js b/finances.js
@@
+    showFeedback(`Expense ${trID} added successfully.`);
+    showFeedback(`Expense ${trID} deleted successfully.`);
+    showFeedback(`Expense ${trID} updated successfully.`);
+    showFeedback("Expenses exported to CSV.");

diff --git a/styles.css b/styles.css
@@
+.page-feedback {
+    min-height: 1.5rem;
+    margin: 0.5rem 0 0.75rem;
+    font-size: 0.95rem;
+    font-weight: 600;
+}
+.page-feedback.is-success {
+    color: var(--green-color);
+}
+.page-feedback.is-error {
+    color: #c44b4b;
+}
```

id: 7
deficiency type: Security - CSV Injection / Export Safety
deficiency description: CSV export previously joined raw values with commas, which meant user-controlled fields containing commas, quotes, or line breaks could corrupt the exported file structure. It also allowed values starting with spreadsheet formula prefixes such as `=`, `+`, `-`, or `@` to be interpreted as executable formulas by spreadsheet software. The fix adds a small escaping helper that neutralizes formula-like prefixes, escapes embedded quotes, and safely wraps special-character fields before export.
original location: `products.js`, L350; `orders.js`, L425; `finances.js`, L358
improvement:
```diff
diff --git a/products.js b/products.js
@@
+function escapeCSVValue(value) {
+  const stringValue = String(value ?? '');
+  const formulaSafeValue = /^[\t\r ]*[=+\-@]/.test(stringValue)
+    ? `'${stringValue}`
+    : stringValue;
+  const escapedValue = formulaSafeValue.replace(/"/g, '""');
+  return /[",\n\r]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
+}
+
 function generateCSV(data) {
-  const headers = Object.keys(data[0]).join(',');
-  const rows = data.map(order => Object.values(order).join(','));
+  const headers = Object.keys(data[0]).map(escapeCSVValue).join(',');
+  const rows = data.map(order => Object.values(order).map(escapeCSVValue).join(','));
   return [headers, ...rows].join('\n');
 }

diff --git a/orders.js b/orders.js
@@
+function escapeCSVValue(value) {
+    const stringValue = String(value ?? '');
+    const formulaSafeValue = /^[\t\r ]*[=+\-@]/.test(stringValue)
+        ? `'${stringValue}`
+        : stringValue;
+    const escapedValue = formulaSafeValue.replace(/"/g, '""');
+    return /[",\n\r]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
+}
+
 function generateCSV(data) {
-    const headers = Object.keys(data[0]).join(',');
-    const rows = data.map(order => Object.values(order).join(','));
+    const headers = Object.keys(data[0]).map(escapeCSVValue).join(',');
+    const rows = data.map(order => Object.values(order).map(escapeCSVValue).join(','));
     return [headers, ...rows].join('\n');
 }

diff --git a/finances.js b/finances.js
@@
+function escapeCSVValue(value) {
+    const stringValue = String(value ?? '');
+    const formulaSafeValue = /^[\t\r ]*[=+\-@]/.test(stringValue)
+        ? `'${stringValue}`
+        : stringValue;
+    const escapedValue = formulaSafeValue.replace(/"/g, '""');
+    return /[",\n\r]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
+}
+
 function generateCSV(data) {
-    const headers = Object.keys(data[0]).join(',');
-    const rows = data.map(order => Object.values(order).join(','));
+    const headers = Object.keys(data[0]).map(escapeCSVValue).join(',');
+    const rows = data.map(order => Object.values(order).map(escapeCSVValue).join(','));
     return [headers, ...rows].join('\n');
 }
```

id: 8
deficiency type: UX / Logic - Stale Form State
deficiency description: Closing an edit form only hid it, so previously entered values and the `Update` submit state could linger into the next interaction. That made it easy for users to reopen the form and accidentally continue editing stale data instead of starting a clean add flow. The fix adds a small shared reset helper on each CRUD page and uses it whenever forms are opened for a new entry, closed, or successfully submitted.
original location: `products.js`, L12; `orders.js`, L12; `finances.js`, L12
improvement:
```diff
diff --git a/products.js b/products.js
@@
 function openForm() {
-    var form = document.getElementById("product-form")
-    form.style.display = (form.style.display === "block") ? "none" : "block";
+    resetFormState();
+    document.getElementById("product-form").style.display = "block";
 }
 
 function closeForm() {
-    document.getElementById("product-form").style.display = "none";
+    resetFormState();
+    document.getElementById("product-form").style.display = "none";
 }
+
+function resetFormState() {
+  document.getElementById("product-form").reset();
+  document.getElementById("submitBtn").textContent = "Add";
+}
@@
-  document.getElementById("product-form").reset();
+  resetFormState();

diff --git a/orders.js b/orders.js
@@
 function openForm() {
-    var form = document.getElementById("order-form")
-    form.style.display = (form.style.display === "block") ? "none" : "block";
+    resetFormState();
+    document.getElementById("order-form").style.display = "block";
 }
 
 function closeForm() {
-    document.getElementById("order-form").style.display = "none";
+    resetFormState();
+    document.getElementById("order-form").style.display = "none";
 }
+
+function resetFormState() {
+    document.getElementById("order-form").reset();
+    document.getElementById("submitBtn").textContent = "Add";
+}
@@
-  document.getElementById("order-form").reset();
+  resetFormState();

diff --git a/finances.js b/finances.js
@@
 function openForm() {
-    var form = document.getElementById("transaction-form")
-    form.style.display = (form.style.display === "block") ? "none" : "block";
+    resetFormState();
+    document.getElementById("transaction-form").style.display = "block";
 }
 
 function closeForm() {
-    document.getElementById("transaction-form").style.display = "none";
+    resetFormState();
+    document.getElementById("transaction-form").style.display = "none";
 }
+
+function resetFormState() {
+    document.getElementById("transaction-form").reset();
+    document.getElementById("submitBtn").textContent = "Add";
+}
@@
-    document.getElementById("transaction-form").reset();
+    resetFormState();
```

id: 9
deficiency type: Input Validation - JS Layer Too Trusting
deficiency description: The forms relied mostly on HTML attributes like `required`, `min`, and `type=\"number\"`, but the JavaScript layer still converted values directly and wrote them into storage without verifying that the parsed result was valid. That meant empty strings, malformed numbers, negative values, or non-integer quantities could still become `NaN` or invalid business data if the form was submitted programmatically or browser validation was bypassed. The fix adds small validation helpers for each CRUD form that run `checkValidity()`, trim required text fields, verify numeric ranges and integer fields, and only return normalized data when the payload is safe to persist.
original location: `products.js`, L30 and L187; `orders.js`, L29 and L220; `finances.js`, L30 and L193
improvement:
```diff
diff --git a/products.js b/products.js
@@
+function getValidatedProductFormData() {
+  const form = document.getElementById("product-form");
+  if (!form.checkValidity()) {
+    showFeedback("Please complete the required product fields before submitting.", "error");
+    form.reportValidity();
+    return null;
+  }
+  const product = {
+    prodID: document.getElementById("product-id").value.trim(),
+    prodPrice: Number(document.getElementById("product-price").value),
+    prodSold: Number(document.getElementById("product-sold").value),
+    ...
+  };
+  if (!Number.isFinite(product.prodPrice) || product.prodPrice < 0) return null;
+  if (!Number.isInteger(product.prodSold) || product.prodSold < 0) return null;
+  return product;
+}
@@
-  const prodPrice = parseFloat(document.getElementById("product-price").value);
-  const prodSold = parseInt(document.getElementById("product-sold").value);
+  const product = getValidatedProductFormData();
+  if (!product) {
+    return;
+  }

diff --git a/orders.js b/orders.js
@@
+function getValidatedOrderFormData() {
+    const form = document.getElementById("order-form");
+    if (!form.checkValidity()) {
+        showFeedback("Please complete the required order fields before submitting.", "error");
+        form.reportValidity();
+        return null;
+    }
+    const itemPrice = Number(document.getElementById("item-price").value);
+    const qtyBought = Number(document.getElementById("qty-bought").value);
+    ...
+    if (!Number.isInteger(qtyBought) || qtyBought <= 0) return null;
+    if (!Number.isFinite(itemPrice) || itemPrice < 0) return null;
+    return { ...order, orderTotal: ((itemPrice * qtyBought) + shipping + taxes) };
+}
@@
-  const itemPrice = parseFloat(document.getElementById("item-price").value);
-  const qtyBought = parseInt(document.getElementById("qty-bought").value);
-  const shipping = parseFloat(document.getElementById("shipping").value);
-  const taxes = parseFloat(document.getElementById("taxes").value);
+  const order = getValidatedOrderFormData();
+  if (!order) {
+    return;
+  }

diff --git a/finances.js b/finances.js
@@
+function getValidatedTransactionFormData() {
+    const form = document.getElementById("transaction-form");
+    if (!form.checkValidity()) {
+        showFeedback("Please complete the required expense fields before submitting.", "error");
+        form.reportValidity();
+        return null;
+    }
+    const transaction = {
+        trAmount: Number(document.getElementById("tr-amount").value),
+        ...
+    };
+    if (!Number.isFinite(transaction.trAmount) || transaction.trAmount < 0) return null;
+    return transaction;
+}
@@
-    const trAmount = parseFloat(document.getElementById("tr-amount").value);
+    const transactionData = getValidatedTransactionFormData();
+    if (!transactionData) {
+        return;
+    }
```

id: 10
deficiency type: Security / HTML Validity - target Blank Markup Issues
deficiency description: Several external links in the Help and About pages used malformed `target` attributes with curly quotes, which made the markup invalid and could cause browsers to ignore the intended new-tab behavior. The valid `_blank` links also omitted `rel="noopener noreferrer"`, which leaves the opened page with access to `window.opener`. The fix normalizes the link markup, adds the missing `rel` protection to true external links, and removes unnecessary `target` usage from the email links.
original location: `help.html`, L127; `about.html`, L83 and L98
improvement:
```diff
diff --git a/help.html b/help.html
@@
-                        <a href="https://www.linkedin.com/in/sumayyahmusa/" target=”_blank”
+                        <a href="https://www.linkedin.com/in/sumayyahmusa/" target="_blank" rel="noopener noreferrer">
@@
-                        <a href="https://github.com/sumusa/"target=”_blank”
+                        <a href="https://github.com/sumusa/" target="_blank" rel="noopener noreferrer">
@@
-                        <a href="mailto:info@summeesarts.com" target=”_blank”
+                        <a href="mailto:info@summeesarts.com">

diff --git a/about.html b/about.html
@@
-<a href="https://www.getcoding.ca/coaching-program-nl" target="_blank">GetCoding NL</a>
+<a href="https://www.getcoding.ca/coaching-program-nl" target="_blank" rel="noopener noreferrer">GetCoding NL</a>
@@
-<a href="https://github.com/samwise-nl" target="_blank">Sam Russell</a>
+<a href="https://github.com/samwise-nl" target="_blank" rel="noopener noreferrer">Sam Russell</a>
@@
-                            <a href="https://www.linkedin.com/in/sumayyahmusa/" target=”_blank”
+                            <a href="https://www.linkedin.com/in/sumayyahmusa/" target="_blank" rel="noopener noreferrer">
```

id: 11
deficiency type: UX - Search Interaction Is Weak
deficiency description: Search only ran when the user pressed `Enter`, so filtering felt unresponsive and the built-in clear behavior of search inputs did not reliably restore the table state. There was also no visible feedback when a query returned zero matches. The fix keeps the existing filtering logic but adds live `input` and `search` listeners, restores all rows when the query is cleared, and shows a lightweight informational message when no matching records are found.
original location: `products.js`, L333; `orders.js`, L407; `finances.js`, L350; `styles.css`, L232
improvement:
```diff
diff --git a/products.js b/products.js
@@
 document.getElementById("searchInput").addEventListener("keyup", function(event) {
     if (event.key === "Enter") {
         performSearch();
     }
 });
+document.getElementById("searchInput").addEventListener("input", performSearch);
+document.getElementById("searchInput").addEventListener("search", performSearch);
 
 function performSearch() {
-    const searchInput = document.getElementById("searchInput").value.toLowerCase();
+    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
+    let visibleCount = 0;
     ...
+    if (!searchInput) {
+        clearFeedback();
+        return;
+    }
+    if (visibleCount === 0) {
+        showFeedback("No matching products found.", "info");
+        return;
+    }
 }

diff --git a/orders.js b/orders.js
@@
+document.getElementById("searchInput").addEventListener("input", performSearch);
+document.getElementById("searchInput").addEventListener("search", performSearch);
@@
+        showFeedback("No matching orders found.", "info");

diff --git a/finances.js b/finances.js
@@
+document.getElementById("searchInput").addEventListener("input", performSearch);
+document.getElementById("searchInput").addEventListener("search", performSearch);
@@
+        showFeedback("No matching expenses found.", "info");

diff --git a/styles.css b/styles.css
@@
+.page-feedback.is-info {
+    color: var(--blue-color);
+}
```

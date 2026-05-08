const I18N_STORAGE_KEY = "bizTrackLanguage";

const translations = {
  en: {
    "language.label": "Language",
    "language.english": "English",
    "language.chinese": "中文",
    "nav.dashboard": "Dashboard",
    "nav.products": "Products",
    "nav.orders": "Orders",
    "nav.expenses": "Expenses",
    "nav.help": "Help",
    "nav.developer": "Meet the Developer",
    "action.closeNav": "Close navigation",
    "action.openNav": "Open navigation",
    "action.search": "Search",
    "action.add": "Add",
    "action.update": "Update",
    "action.cancel": "Cancel",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.downloadCsv": "Download CSV",
    "action.exportCsv": "Export to CSV",
    "dashboard.title": "Dashboard",
    "dashboard.summary": "Summary",
    "dashboard.analytics": "Analytics",
    "dashboard.revenue": "Revenue",
    "dashboard.expenses": "Expenses",
    "dashboard.balance": "Balance",
    "dashboard.orders": "Orders",
    "dashboard.salesByCategory": "Sales by Product Category",
    "products.title": "Products",
    "products.addProduct": "Add Product",
    "products.productId": "Product ID",
    "products.productName": "Product Name",
    "products.description": "Description",
    "products.productDescription": "Product Description:",
    "products.category": "Category",
    "products.productCategory": "Product Category:",
    "products.productPrice": "Product Price:",
    "products.unitsSold": "Units Sold",
    "products.unitsSoldLabel": "Number of Units Sold:",
    "products.chooseProduct": "Choose a product",
    "products.chooseCategory": "Choose a category",
    "products.price": "Price",
    "orders.title": "Orders",
    "orders.addOrder": "Add Order",
    "orders.orderId": "Order ID",
    "orders.orderDate": "Order Date",
    "orders.itemName": "Item Name",
    "orders.itemPrice": "Item Price",
    "orders.quantity": "Qty",
    "orders.quantityBought": "Quantity Bought:",
    "orders.shippingFee": "Shipping Fee",
    "orders.shippingFeeLabel": "Shipping fee:",
    "orders.taxes": "Taxes",
    "orders.taxesLabel": "Taxes (VAT/GST/HST):",
    "orders.orderTotal": "Order Total",
    "orders.totalOrderAmount": "Total Order Amount:",
    "orders.calculated": "(Calculated)",
    "orders.orderStatus": "Order Status",
    "orders.chooseItem": "Choose an item",
    "orders.chooseStatus": "Choose a status",
    "orders.totalRevenue": "Total Revenue",
    "finances.title": "Expenses",
    "finances.addExpense": "Add Expense",
    "finances.date": "Date",
    "finances.expenseCategory": "Expense Category",
    "finances.category": "Category",
    "finances.chooseExpenseCategory": "Choose an expense category",
    "finances.amount": "Amount",
    "finances.notes": "Notes",
    "finances.serial": "S/N",
    "finances.totalExpenses": "Total Expenses",
    "table.action": "Action",
    "help.title": "Using BizTrack: A Quick Guide",
    "help.whatIs": "What is BizTrack?",
    "help.whatIsBody": "BizTrack is your go-to business management tool designed with small business owners in mind. It's an all-in-one platform that helps you effortlessly manage your products, track orders, and stay on top of your finances. Let me walk you through the basics:",
    "help.dashboard": "Navigating the Dashboard",
    "help.dashboardBody": "The Dashboard is your central hub, giving you a snapshot of your business's overall performance. Here, you'll find key metrics like total expenses, revenues, profits and the number of orders. It's your command center for a quick overview.",
    "help.expensesPage": "Expenses Page",
    "help.ordersPage": "Orders Page",
    "help.adding": "Adding a New Expense, Order or Product",
    "help.sorting": "Sorting and Searching Entries/Tables",
    "help.export": "Export to CSV",
    "help.contact": "Have questions, feedback, or just want to connect? Feel free to reach out!",
    "about.title": "My Coding Journey",
    "about.heading": "Hey, I'm Sumayyah!",
    "feedback.requiredProduct": "Please complete the required product fields before submitting.",
    "feedback.productPrice": "Product price must be a valid non-negative number.",
    "feedback.productSold": "Units sold must be a valid non-negative whole number.",
    "feedback.productDuplicate": "Product ID already exists. Please use a unique ID.",
    "feedback.productAdded": "Product {id} added successfully.",
    "feedback.productDeleted": "Product {id} deleted successfully.",
    "feedback.productUpdated": "Product {id} updated successfully.",
    "feedback.noProducts": "No matching products found.",
    "feedback.productsExported": "Products exported to CSV.",
    "feedback.requiredOrder": "Please complete the required order fields before submitting.",
    "feedback.itemPrice": "Item price must be a valid non-negative number.",
    "feedback.quantity": "Quantity bought must be a valid whole number greater than zero.",
    "feedback.shippingTaxes": "Shipping and taxes must be valid non-negative numbers.",
    "feedback.orderDuplicate": "Order ID already exists. Please use a unique ID.",
    "feedback.orderAdded": "Order {id} added successfully.",
    "feedback.orderDeleted": "Order {id} deleted successfully.",
    "feedback.orderUpdated": "Order {id} updated successfully.",
    "feedback.noOrders": "No matching orders found.",
    "feedback.ordersExported": "Orders exported to CSV.",
    "feedback.requiredExpense": "Please complete the required expense fields before submitting.",
    "feedback.expenseAmount": "Expense amount must be a valid non-negative number.",
    "feedback.expenseAdded": "Expense {id} added successfully.",
    "feedback.expenseDeleted": "Expense {id} deleted successfully.",
    "feedback.expenseUpdated": "Expense {id} updated successfully.",
    "feedback.noExpenses": "No matching expenses found.",
    "feedback.expensesExported": "Expenses exported to CSV."
  },
  zh: {
    "language.label": "语言",
    "language.english": "English",
    "language.chinese": "中文",
    "nav.dashboard": "仪表盘",
    "nav.products": "产品",
    "nav.orders": "订单",
    "nav.expenses": "支出",
    "nav.help": "帮助",
    "nav.developer": "开发者介绍",
    "action.closeNav": "关闭导航",
    "action.openNav": "打开导航",
    "action.search": "搜索",
    "action.add": "添加",
    "action.update": "更新",
    "action.cancel": "取消",
    "action.edit": "编辑",
    "action.delete": "删除",
    "action.downloadCsv": "下载 CSV",
    "action.exportCsv": "导出 CSV",
    "dashboard.title": "仪表盘",
    "dashboard.summary": "概览",
    "dashboard.analytics": "分析",
    "dashboard.revenue": "收入",
    "dashboard.expenses": "支出",
    "dashboard.balance": "余额",
    "dashboard.orders": "订单",
    "dashboard.salesByCategory": "按产品类别统计销售额",
    "products.title": "产品",
    "products.addProduct": "添加产品",
    "products.productId": "产品 ID",
    "products.productName": "产品名称",
    "products.description": "描述",
    "products.productDescription": "产品描述：",
    "products.category": "类别",
    "products.productCategory": "产品类别：",
    "products.productPrice": "产品价格：",
    "products.unitsSold": "售出数量",
    "products.unitsSoldLabel": "售出数量：",
    "products.chooseProduct": "选择产品",
    "products.chooseCategory": "选择类别",
    "products.price": "价格",
    "orders.title": "订单",
    "orders.addOrder": "添加订单",
    "orders.orderId": "订单 ID",
    "orders.orderDate": "订单日期",
    "orders.itemName": "商品名称",
    "orders.itemPrice": "商品价格",
    "orders.quantity": "数量",
    "orders.quantityBought": "购买数量：",
    "orders.shippingFee": "运费",
    "orders.shippingFeeLabel": "运费：",
    "orders.taxes": "税费",
    "orders.taxesLabel": "税费 (VAT/GST/HST)：",
    "orders.orderTotal": "订单总额",
    "orders.totalOrderAmount": "订单总额：",
    "orders.calculated": "（自动计算）",
    "orders.orderStatus": "订单状态",
    "orders.chooseItem": "选择商品",
    "orders.chooseStatus": "选择状态",
    "orders.totalRevenue": "总收入",
    "finances.title": "支出",
    "finances.addExpense": "添加支出",
    "finances.date": "日期",
    "finances.expenseCategory": "支出类别",
    "finances.category": "类别",
    "finances.chooseExpenseCategory": "选择支出类别",
    "finances.amount": "金额",
    "finances.notes": "备注",
    "finances.serial": "序号",
    "finances.totalExpenses": "总支出",
    "table.action": "操作",
    "help.title": "BizTrack 快速使用指南",
    "help.whatIs": "什么是 BizTrack？",
    "help.whatIsBody": "BizTrack 是为小企业主设计的业务管理工具。它可以帮助你管理产品、追踪订单，并掌握财务状况。下面是基本用法：",
    "help.dashboard": "查看仪表盘",
    "help.dashboardBody": "仪表盘是业务概览中心，会展示总支出、收入、利润和订单数量等关键指标，方便你快速了解经营情况。",
    "help.expensesPage": "支出页面",
    "help.ordersPage": "订单页面",
    "help.adding": "新增支出、订单或产品",
    "help.sorting": "排序和搜索表格记录",
    "help.export": "导出 CSV",
    "help.contact": "有问题、反馈或想联系？欢迎随时联系！",
    "about.title": "我的编程旅程",
    "about.heading": "你好，我是 Sumayyah！",
    "feedback.requiredProduct": "请先填写必填的产品字段。",
    "feedback.productPrice": "产品价格必须是有效的非负数字。",
    "feedback.productSold": "售出数量必须是有效的非负整数。",
    "feedback.productDuplicate": "产品 ID 已存在，请使用唯一 ID。",
    "feedback.productAdded": "产品 {id} 已成功添加。",
    "feedback.productDeleted": "产品 {id} 已成功删除。",
    "feedback.productUpdated": "产品 {id} 已成功更新。",
    "feedback.noProducts": "没有找到匹配的产品。",
    "feedback.productsExported": "产品已导出为 CSV。",
    "feedback.requiredOrder": "请先填写必填的订单字段。",
    "feedback.itemPrice": "商品价格必须是有效的非负数字。",
    "feedback.quantity": "购买数量必须是大于零的整数。",
    "feedback.shippingTaxes": "运费和税费必须是有效的非负数字。",
    "feedback.orderDuplicate": "订单 ID 已存在，请使用唯一 ID。",
    "feedback.orderAdded": "订单 {id} 已成功添加。",
    "feedback.orderDeleted": "订单 {id} 已成功删除。",
    "feedback.orderUpdated": "订单 {id} 已成功更新。",
    "feedback.noOrders": "没有找到匹配的订单。",
    "feedback.ordersExported": "订单已导出为 CSV。",
    "feedback.requiredExpense": "请先填写必填的支出字段。",
    "feedback.expenseAmount": "支出金额必须是有效的非负数字。",
    "feedback.expenseAdded": "支出 {id} 已成功添加。",
    "feedback.expenseDeleted": "支出 {id} 已成功删除。",
    "feedback.expenseUpdated": "支出 {id} 已成功更新。",
    "feedback.noExpenses": "没有找到匹配的支出。",
    "feedback.expensesExported": "支出已导出为 CSV。"
  }
};

function getCurrentLanguage() {
  return localStorage.getItem(I18N_STORAGE_KEY) || "en";
}

function formatTranslation(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? "");
}

function t(key, params = {}) {
  const language = getCurrentLanguage();
  const template = translations[language]?.[key] || translations.en[key] || key;
  return formatTranslation(template, params);
}

function applyTranslations() {
  const language = getCurrentLanguage();
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });

  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = language;
  });
}

function setLanguage(language) {
  const nextLanguage = translations[language] ? language : "en";
  localStorage.setItem(I18N_STORAGE_KEY, nextLanguage);
  applyTranslations();

  if (typeof window.renderDashboardSummary === "function") {
    window.renderDashboardSummary();
  }

  if (typeof window.displayRevenue === "function") {
    window.displayRevenue();
  }

  if (typeof window.displayExpenses === "function") {
    window.displayExpenses();
  }
}

function initLanguageSwitchers() {
  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = getCurrentLanguage();
    select.addEventListener("change", (event) => {
      setLanguage(event.target.value);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitchers();
  applyTranslations();
});

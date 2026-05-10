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
    "about.p1": "Welcome to my little corner of the internet, where I'm rolling up my sleeves and diving into the coding world. I’m not your typical tech guru – I’m just a small business owner navigating the hustle and bustle of entrepreneurship. Oh, and did I mention I’m also part of the {program} program? Yeah, it's been quite the journey, and I owe a huge shoutout to my coding coach, {coach}.",
    "about.p2": "Let me spill the tea on BizTrack, my brainchild. So, picture this: I'm running a small business, trying to keep tabs on products, orders, and the never-ending finances - It’s a lot. That's when the light bulb moment happened, and BizTrack was born. It's not just a project; it's my answer to the chaos that comes with managing a business.",
    "about.p3": "BizTrack is my attempt at making life a bit more straightforward for small business owners like me. You know, the ones who are constantly multitasking and could use a break. It's a manifestation of my passion for leveraging technology to enhance the efficiency and effectiveness of business operations. It's not polished; it's not perfect, it's just a real solution for real-world challenges.",
    "about.p4": " I'm a student at {program}, a software development program that's turning me from someone who googles how websites work into someone who actually understands and builds them. And guess what? BizTrack is my first module project, allowing me to practically apply the skills and knowledge gained in the program. Learning by doing, they say, and that’s exactly what I'm doing.",
    "about.p5": "But none of this would be possible without the guidance of my amazing coach, {coach}. {coach} has been the compass in my coding journey. Patient, encouraging, and always ready with a helpful tip – he has made navigating the coding seas a whole lot less daunting.",
    "about.invite": "So, why spill all this in an about me section? Well, I’m not just sharing my story; I’m inviting you to join me on my journey. Whether you're into the chaos of small business life, curious about coding escapades, or just want to see where the two collide – you're welcome here.",
    "about.contactNote": "Here's to coding, chaos, everything in between and heartfelt thanks to {coach}!",
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
    "about.p1": "欢迎来到我的小小网络角落，这里我亲自动手深入学习编程。我并非典型的技术专家——我是一个在创业中打拼的小企业主。同时，我也参与了 {program} 项目。这段旅程很特别，我非常感谢我的编码教练 {coach}。",
    "about.p2": "让我来介绍一下 BizTrack，这是我的创意结晶。想象一下：经营小生意时要同时跟踪产品、订单和账务——非常繁忙。在那时，我有了灵感，BizTrack 因而诞生。它不仅是一个项目，更是我应对管理混乱的解决方案。",
    "about.p3": "BizTrack 是我为像我这样的微型企业主简化流程的一次尝试。那些需要同时处理多项任务、希望获得帮助的人就是我的目标用户。它体现了我用技术提升业务效率的热情。它不完美，也不华丽，但为现实问题提供了实际可用的解决方案。",
    "about.p4": "我是 {program} 的一名学员，这个软件开发课程把我从只会 \"谷歌\" 网站工作原理的人，变成能够理解并构建网站的人。BizTrack 是我的第一个模块项目，让我把课程中学到的技能付诸实践。实践出真知，这正是我的学习方式。",
    "about.p5": "但如果没有我出色的教练 {coach} 的指导，这一切都不会实现。{coach} 在我的编码旅程中起到了指引作用：耐心、鼓励，并且总是能提供有用的建议——让编程之路不再那么艰难。",
    "about.invite": "所以，为什么在关于页面讲这么多？我不仅在分享我的故事，也在邀请你一同参与。不论你是小生意经营者、对编程感兴趣，还是想看看两者如何结合——这里欢迎你。",
    "about.contactNote": "致敬编程、致敬混乱、致敬一切中间的时刻，并由衷感谢 {coach}！",
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
    let params = {};
    if (element.dataset.i18nParams) {
      try {
        params = JSON.parse(element.dataset.i18nParams);
      } catch (e) {
        params = {};
      }
    }
    element.textContent = t(element.dataset.i18n, params);
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

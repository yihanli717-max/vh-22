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
    "help.expensesPage.li1Title": "Record Your Expenses:",
    "help.expensesPage.li1": "Head to the Expenses page to add your business expenses. Fill in the date, choose a category, enter the amount, and jot down any notes. It's that simple.",
    "help.expensesPage.li2Title": "Edit or Delete Expenses:",
    "help.expensesPage.li2": "Made a mistake? No worries! You can easily edit or delete expense records right from the Expenses page.",
    "help.ordersPage": "Orders Page",
    "help.ordersPage.li1Title": "Track Your Orders:",
    "help.ordersPage.li1": "On the Orders page, you can keep tabs on all your orders. Each entry details the product, quantity, and order status.",
    "help.ordersPage.li2Title": "Effortless Editing:",
    "help.ordersPage.li2": "Need to update an order status? Click the \"Edit\" button and make your changes. It's hassle-free.",
    "help.adding": "Adding a New Expense, Order or Product",
    "help.adding.step1": "Click on \"Add Expense\" or the equivalent button on the order or product page.",
    "help.adding.step2": "Fill in the product details or order details or transaction date, category, amount, and any notes.",
    "help.adding.step3": "Hit \"Done,\" and you're all set. Your order, product or transaction will now appear in the respective page and on the Dashboard.",
    "help.sorting": "Sorting and Searching Entries/Tables",
    "help.sorting.li1": "Click on any column heading (headers) to sort the entries in the table by that column in either ascending order or alphabetical order.",
    "help.sorting.li2": "You can also search for a particular product, order or expense by entering the value in the search box at the top of the respective page.",
    "help.export": "Export to CSV",
    "help.export.body": "Want to keep a backup or analyze your data elsewhere? Simply click on \"Export to CSV\" to download a CSV file with all your business data.",
    "help.summary": "BizTrack is designed to be intuitive, user-friendly, and adaptable to your business needs. Explore the different pages, try out the features, and let BizTrack simplify your small business management.",
    "help.contact": "Have questions, feedback, or just want to connect? Feel free to reach out!",
    "about.title": "My Coding Journey",
    "about.heading": "Hey, I'm Sumayyah!",
    "about.p1": 'Welcome to my little corner of the internet, where I\'m rolling up my sleeves and diving into the coding world. I’m not your typical tech guru – I’m just a small business owner navigating the hustle and bustle of entrepreneurship. Oh, and did I mention I’m also part of the <a href="https://www.getcoding.ca/coaching-program-nl" target="_blank" rel="noopener noreferrer">GetCoding NL</a> program? Yeah, it\'s been quite the journey, and I owe a huge shoutout to my coding coach, <a href="https://github.com/samwise-nl" target="_blank" rel="noopener noreferrer">Sam Russell</a>.',
    "about.p2": "Let me spill the tea on BizTrack, my brainchild. So, picture this: I'm running a small business, trying to keep tabs on products, orders, and the never-ending finances - It’s a lot. That's when the light bulb moment happened, and BizTrack was born. It's not just a project; it's my answer to the chaos that comes with managing a business.",
    "about.p3": "BizTrack is my attempt at making life a bit more straightforward for small business owners like me. You know, the ones who are constantly multitasking and could use a break. It's a manifestation of my passion for leveraging technology to enhance the efficiency and effectiveness of business operations. It's not polished; it's not perfect, it's just a real solution for real-world challenges.",
    "about.p4": 'I\'m a student at <a href="https://www.getcoding.ca/coaching-program-nl" target="_blank" rel="noopener noreferrer">GetCoding NL</a>, a software development program that\'s turning me from someone who googles how websites work into someone who actually understands and builds them. BizTrack is my first module project, allowing me to practically apply the skills and knowledge gained in the program.',
    "about.p5": 'But none of this would be possible without the guidance of my amazing coach, <a href="https://github.com/samwise-nl" target="_blank" rel="noopener noreferrer">Sam Russell</a>. He has been the compass in my coding journey.',
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
    "feedback.expensesExported": "Expenses exported to CSV.",
    "privacy.title": "Privacy Policy",
    "privacy.introduction.title": "Introduction",
    "privacy.introduction.body": "This Privacy Policy explains how BizTrack collects, uses, discloses and safeguards your information when you visit our website.",
    "privacy.information.title": "Information We Collect",
    "privacy.information.item1": "Information you provide directly (e.g., contact form, email).",
    "privacy.information.item2": "Usage data collected automatically (e.g., pages visited, IP address, device and browser information).",
    "privacy.information.item3": "Cookies and similar technologies to improve site functionality and analytics.",
    "privacy.use.title": "How We Use Your Information",
    "privacy.use.body": "We use collected information to operate and improve the website, respond to inquiries, provide features, analyze usage patterns, and comply with legal obligations.",
    "privacy.cookies.title": "Cookies",
    "privacy.cookies.body": "Cookies are small text files stored on your device. We use cookies for essential site functionality, to remember preferences (such as language), and to collect anonymous analytics. You can disable cookies in your browser settings, but some features may not work properly.",
    "privacy.thirdparty.title": "Third-party Services",
    "privacy.thirdparty.body": "We may use third-party services (e.g., analytics providers). These providers have their own privacy practices — please refer to their policies for details.",
    "privacy.retention.title": "Data Retention",
    "privacy.retention.body": "We retain personal data only as long as necessary to fulfill the purposes described in this policy or to comply with legal obligations.",
    "privacy.rights.title": "Your Rights",
    "privacy.rights.body": "Depending on your jurisdiction, you may have rights to access, correct, delete or restrict the processing of your personal data. To exercise these rights, contact us using the information below.",
    "privacy.security.title": "Security",
    "privacy.security.body": "We implement reasonable technical and organizational measures to protect data. However, no method of transmission over the internet or electronic storage is 100% secure.",
    "privacy.contact.title": "Contact",
    "privacy.contact.body": "If you have questions about this policy, contact us at:",
    "privacy.footer": "© 2026 BizTrack. All rights reserved.",
    "cookie.text": "This website uses cookies to ensure you get the best experience.",
    "cookie.accept": "Accept",
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
    "help.expensesPage.li1Title": "记录支出：",
    "help.expensesPage.li1": "前往“支出”页面添加业务支出。填写日期、选择分类、输入金额并备注说明，就完成了。",
    "help.expensesPage.li2Title": "编辑或删除支出：",
    "help.expensesPage.li2": "填写错误？别担心！您可以在“支出”页面直接编辑或删除记录。",
    "help.ordersPage": "订单页面",
    "help.ordersPage.li1Title": "跟踪订单：",
    "help.ordersPage.li1": "在“订单”页面可以查看所有订单，每条记录包含产品、数量和订单状态等信息。",
    "help.ordersPage.li2Title": "轻松编辑：",
    "help.ordersPage.li2": "需要更新订单状态？点击“编辑”按钮并保存更改即可，操作简便。",
    "help.adding": "添加新支出、订单或产品",
    "help.adding.step1": "点击“添加支出”或订单/产品页面上的相应按钮。",
    "help.adding.step2": "填写产品或订单详情，或交易日期、分类、金额及备注。",
    "help.adding.step3": "点击“完成”，您的订单、产品或交易将出现在相应页面和仪表盘上。",
    "help.sorting": "排序与搜索表格条目",
    "help.sorting.li1": "点击任意列标题以按该列对表格条目进行升序或字母顺序排序。",
    "help.sorting.li2": "您也可以在相应页面顶部的搜索框中输入值来查找特定产品、订单或支出。",
    "help.export": "导出为 CSV",
    "help.export.body": "想备份或在其它地方分析数据？点击“导出为 CSV”即可下载包含所有业务数据的 CSV 文件。",
    "help.summary": "BizTrack 旨在直观、易用并适应您的业务需求。探索不同页面，试用功能，让 BizTrack 简化您的小型企业管理工作。",
    "help.contact": "有问题、反馈或想交流？欢迎随时联系！",
    "about.title": "我的编程旅程",
    "about.heading": "你好，我是 Sumayyah！",
    "about.p1": "欢迎来到我的小小网络角落，这里我亲自动手深入学习编程。我并非典型的技术专家——我是一个在创业中打拼的小企业主。同时，我也参与了 <a href=\"https://www.getcoding.ca/coaching-program-nl\" target=\"_blank\" rel=\"noopener noreferrer\">GetCoding NL</a> 项目。这段旅程很特别，我非常感谢我的编码教练 <a href=\"https://github.com/samwise-nl\" target=\"_blank\" rel=\"noopener noreferrer\">Sam Russell</a>。",
    "about.p2": "让我来介绍一下 BizTrack，这是我的创意结晶。想象一下：经营小生意时要同时跟踪产品、订单和账务——非常繁忙。在那时，我有了灵感，BizTrack 因而诞生。它不仅是一个项目，更是我应对管理混乱的解决方案。",
    "about.p3": "BizTrack 是我为像我这样的微型企业主简化流程的一次尝试。那些需要同时处理多项任务、希望获得帮助的人就是我的目标用户。它体现了我用技术提升业务效率的热情。它不完美，也不华丽，但为现实问题提供了实际可用的解决方案。",
    "about.p4": "我是 <a href=\"https://www.getcoding.ca/coaching-program-nl\" target=\"_blank\" rel=\"noopener noreferrer\">GetCoding NL</a> 的一名学员，这个软件开发课程把我从只会“谷歌”网站工作原理的人，变成能够理解并构建网站的人。BizTrack 是我的第一个模块项目，让我把课程中学到的技能付诸实践。",
    "about.p5": "但如果没有我出色的教练 <a href=\"https://github.com/samwise-nl\" target=\"_blank\" rel=\"noopener noreferrer\">Sam Russell</a> 的指导，这一切都不会实现。他在我的编码旅程中起到了指引作用。",
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
    "feedback.expensesExported": "支出已导出为 CSV。",
    "privacy.title": "隐私政策",
    "privacy.introduction.title": "介绍",
    "privacy.introduction.body": "本隐私政策说明当您访问我们的网站时，BizTrack 如何收集、使用、披露和保护您的信息。",
    "privacy.information.title": "我们收集的信息",
    "privacy.information.item1": "您直接提供的信息（例如：联系表单、电子邮件）。",
    "privacy.information.item2": "自动收集的使用数据（例如：访问的页面、IP 地址、设备和浏览器信息）。",
    "privacy.information.item3": "用于改进站点功能和分析的 Cookie 和类似技术。",
    "privacy.use.title": "我们如何使用您的信息",
    "privacy.use.body": "我们使用收集的信息来运营和改进网站、回复咨询、提供功能、分析使用模式并遵守法律义务。",
    "privacy.cookies.title": "Cookie",
    "privacy.cookies.body": "Cookie 是存储在您设备上的小型文本文件。我们使用 Cookie 来实现基本站点功能、记住偏好（例如语言）并收集匿名分析数据。您可以在浏览器设置中禁用 Cookie，但某些功能可能无法正常工作。",
    "privacy.thirdparty.title": "第三方服务",
    "privacy.thirdparty.body": "我们可能使用第三方服务（例如分析提供商）。这些提供商有自己的隐私实践 — 请参阅其政策以了解详情。",
    "privacy.retention.title": "数据保留",
    "privacy.retention.body": "我们仅在实现本政策中所述目的或遵守法律义务所必需的期间内保留个人数据。",
    "privacy.rights.title": "您的权利",
    "privacy.rights.body": "根据您所在辖区，您可能有权访问、更正、删除或限制对您个人数据的处理。要行使这些权利，请使用下方信息与我们联系。",
    "privacy.security.title": "安全",
    "privacy.security.body": "我们实施合理的技术和组织措施来保护数据。但应当注意，任何通过互联网传输或电子存储的方法都不是 100% 安全的。",
    "privacy.contact.title": "联系方式",
    "privacy.contact.body": "如对本政策有疑问，请通过以下方式与我们联系：",
    "privacy.footer": "© 2026 BizTrack。版权所有。",
    "cookie.text": "本网站使用 Cookie，以确保您获得最佳体验。",
    "cookie.accept": "接受",
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

    // 支持带 HTML 的翻译（仅对已标记 data-i18n-html 的元素使用 innerHTML）
    if (element.hasAttribute("data-i18n-html")) {
      element.innerHTML = t(element.dataset.i18n, params);
    } else {
      element.textContent = t(element.dataset.i18n, params);
    }
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

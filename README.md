# 📋 BizTrack Project

[![codecov](https://codecov.io/gh/yihanli717-max/vh-22/branch/main/graph/badge.svg)](https://codecov.io/gh/yihanli717-max/vh-22)
[![Lighthouse CI](https://github.com/yihanli717-max/vh-22/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/yihanli717-max/vh-22/actions/workflows/lighthouse.yml)

BizTrack is a web app born from my experience running a small business. It’s a tool designed to simplify managing products, orders, and expenses seamlessly. As a small business owner, I created BizTrack to simplify the complexities of managing products, orders, and expenses. The inspiration for this project came from the challenges I faced in my own business. I wanted to develop a solution that could benefit “myself” and others in a similar situation.

## 📝 DEMO

Please refer to --- https://sumusa.github.io/biztrack/.

## 📷 Screenshots

![Biztrack Home page](assets/biztrack-home.png)

## 📌 Features

- **Product Management**: Add, edit, or remove products with a user-friendly interface.
- **Order Tracking**: View order details and status and manage the entire order fulfillment process from processing to delivery.
- **Expenses Management**: Log expenses, categorize them and maintain a clear overview of all financial transactions.
- **Insightful Dashboard**: Gives a quick snapshot of the business with a dashboard that displays summary stats such as revenue, expenses, the number of orders, and current balance.
- **Search and Sort Entries**: Sort through the product, order and expense tables using the column headers.
- **Analytics**: Explore sales by product category and track expenses with visually appealing charts
- **Export to CSV**: Download all data tables into CSV seamlessly.

## 💪🏾 Motivation

Why this project? 😼 It all started with my eagerness to learn more about web development. This project marks the end of my first module in the Get Coding program, and boy, have I learned a lot!

From understanding how JavaScript functions work to making web pages interactive, it's been quite the journey. One of the coolest parts was learning how to visualize data using ApexCharts library, which made everything more interesting. Through experimenting with different techniques like loops and if statements, I've not only improved my coding skills but also learned how to make websites easier to use for everyone.

This project represents my growth, determination, and love for coding. I hope you enjoy checking it out as much as I enjoyed making it!

## Improvement

Since the original fork (starting at commit c56355fb and onward), a sequence of maintenance, security, accessibility, and UX improvements were applied. Key highlights:

- Security
  - Fixed DOM XSS by avoiding unsafe innerHTML and using textContent-based DOM construction.
  - Mitigated CSV injection by escaping values and neutralizing formula-like prefixes in exports.
- Data integrity & robustness
  - Added a safe localStorage reader that validates parsed data and restores fallback seed data when storage is missing or malformed.
  - Hardened parsing and error handling to avoid crashes on corrupted cached data.
- Logic & correctness
  - Ensured new transaction IDs are unique using a max-id scan to avoid ID reuse after deletions.
  - Prevented unintended primary-key edits during update flows.
- Accessibility & keyboard support
  - Replaced non-interactive clickable elements with semantic buttons and added focus-visible styles for keyboard users.
- UX & feedback
  - Added inline, non-modal feedback messages for add/update/delete/export actions instead of blocking alerts.
  - Reset stale form state when opening/closing forms to avoid accidental edits.
- Input validation & reliability
  - Strengthened client-side validation: trimmed inputs, checked numeric ranges and integer constraints, and used form checkValidity where appropriate.
- Testing & CI
  - Added unit tests and CI checks to prevent regressions and ensure key behaviors remain stable across changes.
- Internationalization & language switch
  - Implemented a language switch control allowing switching UI text; language preference persists (e.g., via localStorage) so the app can present localized labels and messages.
- Privacy & consent
  - Added a cookie/consent banner to inform users about local storage usage and to capture consent for analytics or persisted preferences.

These changes aim to improve security, accessibility, reliability, and maintainability while preserving the original app flows.

## 💻 Tech Stack Used

- HTML
- CSS
- JavaScript

## 🤝 Acknowledgments

A special thanks to my coach, [Sam](https://github.com/samwise-nl), for the invaluable guidance and support provided throughout the development of this project, and the [GetCoding NL](https://www.getcoding.ca/coaching-program-nl) software development program team for their continuous check-ins.

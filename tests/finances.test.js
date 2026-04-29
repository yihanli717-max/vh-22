import { afterEach, describe, expect, it, vi } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

let page;

async function loadFinancesPage() {
  page = await loadPage({
    htmlFile: "finances.html",
    scripts: ["finances.js"]
  });

  return page;
}

function getStoredTransactions() {
  return JSON.parse(page.window.localStorage.getItem("bizTrackTransactions"));
}

function transactionRows() {
  return [...page.document.querySelectorAll(".transaction-row")];
}

function setField(id, value) {
  page.document.getElementById(id).value = value;
}

function fillTransactionForm(overrides = {}) {
  const transaction = {
    date: "2024-04-20",
    category: "Supplies",
    amount: "42.5",
    notes: "Printer paper",
    ...overrides
  };

  setField("tr-date", transaction.date);
  setField("tr-category", transaction.category);
  setField("tr-amount", transaction.amount);
  setField("tr-notes", transaction.notes);
}

function submitForm() {
  const event = { preventDefault: vi.fn() };
  page.window.addOrUpdate(event);
  return event;
}

afterEach(() => {
  page?.cleanup();
  page = undefined;
});

describe("finances page", () => {
  it("renders default transactions and total expenses from fallback data", async () => {
    await loadFinancesPage();

    expect(transactionRows()).toHaveLength(5);
    expect(transactionRows()[0].textContent).toContain("January Rent");
    expect(getStoredTransactions()).toHaveLength(5);
    expect(page.document.getElementById("total-expenses").textContent).toContain("Total Expenses: $455.00");
  });

  it("adds a validated expense with the next available transaction ID", async () => {
    await loadFinancesPage();

    page.window.openForm();
    fillTransactionForm();
    const event = submitForm();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(transactionRows()).toHaveLength(6);
    expect(getStoredTransactions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          trID: 6,
          trDate: "2024-04-20",
          trCategory: "Supplies",
          trAmount: 42.5,
          trNotes: "Printer paper"
        })
      ])
    );
    expect(page.document.getElementById("page-feedback").textContent).toBe("Expense 6 added successfully.");
  });

  it("does not reuse transaction IDs after deleting a row", async () => {
    await loadFinancesPage();

    page.window.deleteTransaction(3);
    page.window.openForm();
    fillTransactionForm({ notes: "Replacement purchase" });
    submitForm();

    const storedTransactions = getStoredTransactions();
    expect(storedTransactions.some((transaction) => transaction.trID === 3)).toBe(false);
    expect(storedTransactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          trID: 6,
          trNotes: "Replacement purchase"
        })
      ])
    );
  });

  it("edits an expense while preserving its transaction ID", async () => {
    await loadFinancesPage();

    page.window.editRow(2);

    expect(page.document.getElementById("tr-id").value).toBe("2");
    expect(page.document.getElementById("submitBtn").textContent).toBe("Update");

    fillTransactionForm({
      date: "2024-04-25",
      category: "Utilities",
      amount: "88.75",
      notes: "Updated internet bill"
    });
    submitForm();

    expect(getStoredTransactions().find((transaction) => transaction.trID === 2)).toEqual(
      expect.objectContaining({
        trID: 2,
        trDate: "2024-04-25",
        trCategory: "Utilities",
        trAmount: 88.75,
        trNotes: "Updated internet bill"
      })
    );
    expect(page.document.getElementById("page-feedback").textContent).toBe("Expense 2 updated successfully.");
  });

  it("deletes an expense from the table and persisted data", async () => {
    await loadFinancesPage();

    page.window.deleteTransaction(4);

    expect(transactionRows()).toHaveLength(4);
    expect(getStoredTransactions().some((transaction) => transaction.trID === 4)).toBe(false);
    expect(page.document.getElementById("page-feedback").textContent).toBe("Expense 4 deleted successfully.");
  });

  it("rejects invalid JavaScript-layer expense data", async () => {
    await loadFinancesPage();

    page.window.openForm();
    page.document.getElementById("transaction-form").checkValidity = vi.fn(() => true);
    fillTransactionForm({ amount: "-1" });
    submitForm();

    expect(transactionRows()).toHaveLength(5);
    expect(getStoredTransactions().some((transaction) => transaction.trNotes === "Printer paper")).toBe(false);
    expect(page.document.getElementById("page-feedback").textContent).toBe(
      "Expense amount must be a valid non-negative number."
    );
  });

  it("filters expenses as the user types and reports empty results", async () => {
    await loadFinancesPage();

    const searchInput = page.document.getElementById("searchInput");
    searchInput.value = "internet";
    searchInput.dispatchEvent(new page.window.Event("input", { bubbles: true }));

    expect(transactionRows().filter((row) => row.style.display !== "none")).toHaveLength(1);
    expect(transactionRows().find((row) => row.style.display !== "none").textContent).toContain("Internet");

    searchInput.value = "no-expense-match";
    searchInput.dispatchEvent(new page.window.Event("input", { bubbles: true }));

    expect(transactionRows().filter((row) => row.style.display !== "none")).toHaveLength(0);
    expect(page.document.getElementById("page-feedback").textContent).toBe("No matching expenses found.");

    searchInput.value = "";
    searchInput.dispatchEvent(new page.window.Event("search", { bubbles: true }));

    expect(transactionRows().filter((row) => row.style.display !== "none")).toHaveLength(5);
    expect(page.document.getElementById("page-feedback").textContent).toBe("");
  });

  it("sorts expense rows by text and numeric columns", async () => {
    await loadFinancesPage();

    page.window.sortTable("trAmount");
    expect(transactionRows()[0].children[0].textContent).toBe("5");

    page.window.sortTable("trCategory");
    expect(transactionRows()[0].children[0].textContent).toBe("5");
    expect(transactionRows()[1].children[0].textContent).toBe("2");
  });

  it("exports expenses to CSV through a generated download link", async () => {
    await loadFinancesPage();

    page.window.exportToCSV();

    expect(page.window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(page.window.Blob));
    expect(page.document.getElementById("page-feedback").textContent).toBe("Expenses exported to CSV.");
  });

  it("escapes exported CSV values including formulas, commas, quotes, and newlines", async () => {
    await loadFinancesPage();

    const csv = page.window.generateCSV([
      {
        trID: 7,
        trDate: "2024-04-20",
        trCategory: "-Supplies",
        trAmount: "42.50",
        trNotes: "Paper, quote \"ok\"\nnext"
      }
    ]);

    expect(csv).toBe(
      "trID,trDate,trCategory,trAmount,trNotes\n7,2024-04-20,'-Supplies,42.50,\"Paper, quote \"\"ok\"\"\nnext\""
    );
  });
});

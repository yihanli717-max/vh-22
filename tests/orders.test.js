import { afterEach, describe, expect, it, vi } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

let page;

async function loadOrdersPage() {
  page = await loadPage({
    htmlFile: "orders.html",
    scripts: ["orders.js"]
  });

  return page;
}

function getStoredOrders() {
  return JSON.parse(page.window.localStorage.getItem("bizTrackOrders"));
}

function orderRows() {
  return [...page.document.querySelectorAll(".order-row")];
}

function setField(id, value) {
  page.document.getElementById(id).value = value;
}

function fillOrderForm(overrides = {}) {
  const order = {
    id: "2001",
    date: "2024-04-10",
    itemName: "Mugs",
    itemPrice: "12.5",
    quantity: "3",
    shipping: "4.25",
    taxes: "2.75",
    status: "Processing",
    ...overrides
  };

  setField("order-id", order.id);
  setField("order-date", order.date);
  setField("item-name", order.itemName);
  setField("item-price", order.itemPrice);
  setField("qty-bought", order.quantity);
  setField("shipping", order.shipping);
  setField("taxes", order.taxes);
  setField("order-status", order.status);
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

describe("orders page", () => {
  it("renders default orders and revenue from fallback data", async () => {
    await loadOrdersPage();

    expect(orderRows()).toHaveLength(5);
    expect(orderRows()[0].textContent).toContain("1001");
    expect(getStoredOrders()).toHaveLength(5);
    expect(page.document.getElementById("total-revenue").textContent).toContain("Total Revenue: $320.90");
  });

  it("adds a validated order, calculates total, and persists it", async () => {
    await loadOrdersPage();

    page.window.openForm();
    fillOrderForm();
    const event = submitForm();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(orderRows()).toHaveLength(6);
    expect(getStoredOrders()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          orderID: "2001",
          itemName: "Mugs",
          itemPrice: 12.5,
          qtyBought: 3,
          shipping: 4.25,
          taxes: 2.75,
          orderTotal: 44.5,
          orderStatus: "Processing"
        })
      ])
    );
    expect(page.document.getElementById("page-feedback").textContent).toBe("Order 2001 added successfully.");
  });

  it("renders order statuses with their mapped status classes", async () => {
    await loadOrdersPage();

    const firstStatus = orderRows()[0].querySelector(".status");
    const deliveredStatus = orderRows()[3].querySelector(".status");

    expect(firstStatus.className).toContain("pending");
    expect(firstStatus.textContent).toBe("Pending");
    expect(deliveredStatus.className).toContain("delivered");
    expect(deliveredStatus.textContent).toBe("Delivered");
  });

  it("keeps order IDs read-only and immutable during edits", async () => {
    await loadOrdersPage();

    page.window.editRow("1001");
    const idInput = page.document.getElementById("order-id");

    expect(idInput.readOnly).toBe(true);
    expect(idInput.getAttribute("aria-readonly")).toBe("true");

    setField("order-id", "9999");
    setField("qty-bought", "4");
    setField("shipping", "3");
    setField("taxes", "1");
    setField("order-status", "Delivered");
    submitForm();

    const updatedOrder = getStoredOrders().find((order) => order.orderID === "1001");
    expect(updatedOrder).toEqual(
      expect.objectContaining({
        qtyBought: 4,
        shipping: 3,
        taxes: 1,
        orderTotal: 104,
        orderStatus: "Delivered"
      })
    );
    expect(getStoredOrders().some((order) => order.orderID === "9999")).toBe(false);
    expect(idInput.readOnly).toBe(false);
  });

  it("deletes an order from the table and persisted data", async () => {
    await loadOrdersPage();

    page.window.deleteOrder("1002");

    expect(orderRows()).toHaveLength(4);
    expect(getStoredOrders().some((order) => order.orderID === "1002")).toBe(false);
    expect(page.document.getElementById("page-feedback").textContent).toBe("Order 1002 deleted successfully.");
  });

  it("rejects invalid JavaScript-layer order data", async () => {
    await loadOrdersPage();

    page.window.openForm();
    page.document.getElementById("order-form").checkValidity = vi.fn(() => true);
    fillOrderForm({ id: "2002", quantity: "2.5" });
    submitForm();

    expect(orderRows()).toHaveLength(5);
    expect(getStoredOrders().some((order) => order.orderID === "2002")).toBe(false);
    expect(page.document.getElementById("page-feedback").textContent).toBe(
      "Quantity bought must be a valid whole number greater than zero."
    );
  });

  it("filters orders as the user types and reports empty results", async () => {
    await loadOrdersPage();

    const searchInput = page.document.getElementById("searchInput");
    searchInput.value = "water";
    searchInput.dispatchEvent(new page.window.Event("input", { bubbles: true }));

    expect(orderRows().filter((row) => row.style.display !== "none")).toHaveLength(1);
    expect(orderRows().find((row) => row.style.display !== "none").textContent).toContain("Water bottles");

    searchInput.value = "no-order-match";
    searchInput.dispatchEvent(new page.window.Event("input", { bubbles: true }));

    expect(orderRows().filter((row) => row.style.display !== "none")).toHaveLength(0);
    expect(page.document.getElementById("page-feedback").textContent).toBe("No matching orders found.");

    searchInput.value = "";
    searchInput.dispatchEvent(new page.window.Event("search", { bubbles: true }));

    expect(orderRows().filter((row) => row.style.display !== "none")).toHaveLength(5);
    expect(page.document.getElementById("page-feedback").textContent).toBe("");
  });

  it("sorts order rows by text and numeric columns", async () => {
    await loadOrdersPage();

    page.window.sortTable("orderTotal");
    expect(orderRows()[0].children[0].textContent).toBe("1005");

    page.window.sortTable("itemName");
    expect(orderRows()[0].children[0].textContent).toBe("1001");
  });

  it("exports orders to CSV through a generated download link", async () => {
    await loadOrdersPage();

    page.window.exportToCSV();

    expect(page.window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(page.window.Blob));
    expect(page.document.getElementById("page-feedback").textContent).toBe("Orders exported to CSV.");
  });

  it("escapes exported CSV values including formulas, commas, quotes, and newlines", async () => {
    await loadOrdersPage();

    const csv = page.window.generateCSV([
      {
        orderID: "+2001",
        orderDate: "2024-04-10",
        itemName: "Travel, Mug",
        itemPrice: "12.50",
        qtyBought: 3,
        shipping: "4.25",
        taxes: "2.75",
        orderTotal: "44.50",
        orderStatus: "Quote \"ok\"\nnext"
      }
    ]);

    expect(csv).toBe(
      "orderID,orderDate,itemName,itemPrice,qtyBought,shipping,taxes,orderTotal,orderStatus\n'+2001,2024-04-10,\"Travel, Mug\",12.50,3,4.25,2.75,44.50,\"Quote \"\"ok\"\"\nnext\""
    );
  });
});

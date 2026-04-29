import { afterEach, describe, expect, it, vi } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

let page;

async function loadProductsPage() {
  page = await loadPage({
    htmlFile: "products.html",
    scripts: ["products.js"]
  });

  return page;
}

function getStoredProducts() {
  return JSON.parse(page.window.localStorage.getItem("bizTrackProducts"));
}

function productRows() {
  return [...page.document.querySelectorAll(".product-row")];
}

function setField(id, value) {
  page.document.getElementById(id).value = value;
}

function fillProductForm(overrides = {}) {
  const product = {
    id: "PD999",
    name: "Mugs",
    desc: "Ceramic desk mug",
    category: "Drinkware",
    price: "19.99",
    sold: "7",
    ...overrides
  };

  setField("product-id", product.id);
  setField("product-name", product.name);
  setField("product-desc", product.desc);
  setField("product-cat", product.category);
  setField("product-price", product.price);
  setField("product-sold", product.sold);
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

describe("products page", () => {
  it("renders the default product records from localStorage fallback data", async () => {
    await loadProductsPage();

    expect(productRows()).toHaveLength(5);
    expect(productRows()[0].textContent).toContain("PD001");
    expect(getStoredProducts()).toHaveLength(5);
  });

  it("adds a validated product and persists it", async () => {
    await loadProductsPage();

    page.window.openForm();
    fillProductForm();
    const event = submitForm();

    expect(event.preventDefault).toHaveBeenCalled();
    expect(productRows()).toHaveLength(6);
    expect(getStoredProducts()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          prodID: "PD999",
          prodName: "Mugs",
          prodPrice: 19.99,
          prodSold: 7
        })
      ])
    );
    expect(page.document.getElementById("page-feedback").textContent).toBe("Product PD999 added successfully.");
  });

  it("rejects duplicate product IDs before persisting", async () => {
    await loadProductsPage();

    page.window.openForm();
    fillProductForm({ id: "PD001" });
    submitForm();

    expect(productRows()).toHaveLength(5);
    expect(getStoredProducts().filter((product) => product.prodID === "PD001")).toHaveLength(1);
    expect(page.document.getElementById("page-feedback").textContent).toBe(
      "Product ID already exists. Please use a unique ID."
    );
  });

  it("renders script payloads as text without creating executable script nodes", async () => {
    await loadProductsPage();

    const payload = "<script>window.__productXssExecuted()</script>";
    page.window.__productXssExecuted = vi.fn();

    page.window.openForm();
    fillProductForm({
      id: "PD777",
      desc: payload
    });
    submitForm();

    const addedRow = productRows().find((row) => row.dataset.prodID === "PD777");
    expect(addedRow.children[2].textContent).toBe(payload);
    expect(addedRow.querySelector("script")).toBeNull();
    expect(page.window.__productXssExecuted).not.toHaveBeenCalled();
  });

  it("keeps product IDs read-only and immutable during edits", async () => {
    await loadProductsPage();

    page.window.editRow("PD001");
    const idInput = page.document.getElementById("product-id");

    expect(idInput.readOnly).toBe(true);
    expect(idInput.getAttribute("aria-readonly")).toBe("true");

    setField("product-id", "PD999");
    setField("product-desc", "Updated safe description");
    setField("product-price", "26.5");
    setField("product-sold", "21");
    submitForm();

    const storedProducts = getStoredProducts();
    expect(storedProducts.find((product) => product.prodID === "PD001")).toEqual(
      expect.objectContaining({
        prodDesc: "Updated safe description",
        prodPrice: 26.5,
        prodSold: 21
      })
    );
    expect(storedProducts.some((product) => product.prodID === "PD999")).toBe(false);
    expect(idInput.readOnly).toBe(false);
  });

  it("deletes a product from the table and persisted data", async () => {
    await loadProductsPage();

    page.window.deleteProduct("PD002");

    expect(productRows()).toHaveLength(4);
    expect(getStoredProducts().some((product) => product.prodID === "PD002")).toBe(false);
    expect(page.document.getElementById("page-feedback").textContent).toBe("Product PD002 deleted successfully.");
  });

  it("rejects invalid JavaScript-layer product data", async () => {
    await loadProductsPage();

    page.window.openForm();
    page.document.getElementById("product-form").checkValidity = vi.fn(() => true);
    fillProductForm({ id: "PD777", sold: "2.5" });
    submitForm();

    expect(productRows()).toHaveLength(5);
    expect(getStoredProducts().some((product) => product.prodID === "PD777")).toBe(false);
    expect(page.document.getElementById("page-feedback").textContent).toBe(
      "Units sold must be a valid non-negative whole number."
    );
  });

  it("filters products as the user types and reports empty results", async () => {
    await loadProductsPage();

    const searchInput = page.document.getElementById("searchInput");
    searchInput.value = "water";
    searchInput.dispatchEvent(new page.window.Event("input", { bubbles: true }));

    expect(productRows().filter((row) => row.style.display !== "none")).toHaveLength(1);
    expect(productRows().find((row) => row.style.display !== "none").textContent).toContain("Water bottles");

    searchInput.value = "does-not-exist";
    searchInput.dispatchEvent(new page.window.Event("input", { bubbles: true }));

    expect(productRows().filter((row) => row.style.display !== "none")).toHaveLength(0);
    expect(page.document.getElementById("page-feedback").textContent).toBe("No matching products found.");

    searchInput.value = "";
    searchInput.dispatchEvent(new page.window.Event("search", { bubbles: true }));

    expect(productRows().filter((row) => row.style.display !== "none")).toHaveLength(5);
    expect(page.document.getElementById("page-feedback").textContent).toBe("");
  });

  it("sorts product rows by text and numeric columns", async () => {
    await loadProductsPage();

    page.window.sortTable("prodSold");
    expect(productRows()[0].children[0].textContent).toBe("PD002");

    page.window.sortTable("prodName");
    expect(productRows()[0].children[0].textContent).toBe("PD001");
  });

  it("exports products to CSV through a generated download link", async () => {
    await loadProductsPage();

    page.window.exportToCSV();

    expect(page.window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(page.window.Blob));
    expect(page.document.getElementById("page-feedback").textContent).toBe("Products exported to CSV.");
  });

  it("escapes exported CSV values including formulas, commas, quotes, and newlines", async () => {
    await loadProductsPage();

    const csv = page.window.generateCSV([
      {
        prodID: "=PD777",
        prodName: "Travel, Mug",
        prodDesc: "Quote \"ok\"\nnext",
        prodCategory: "Drinkware",
        prodPrice: "12.50",
        QtySold: 3
      }
    ]);

    expect(csv).toBe(
      "prodID,prodName,prodDesc,prodCategory,prodPrice,QtySold\n'=PD777,\"Travel, Mug\",\"Quote \"\"ok\"\"\nnext\",Drinkware,12.50,3"
    );
  });
});

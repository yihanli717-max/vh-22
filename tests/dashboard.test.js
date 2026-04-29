import { afterEach, describe, expect, it, vi } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

let page;

async function loadDashboard(options = {}) {
  page = await loadPage({
    htmlFile: "index.html",
    scripts: ["script.js"],
    ...options
  });

  return page;
}

function amountText(id) {
  return page.document.getElementById(id).textContent.replace(/\s+/g, " ").trim();
}

afterEach(() => {
  page?.cleanup();
  page = undefined;
});

describe("dashboard page", () => {
  it("renders summary metrics from stored orders and expenses", async () => {
    await loadDashboard({
      storage: {
        bizTrackTransactions: [
          { trAmount: 100 },
          { trAmount: 50.25 }
        ],
        bizTrackOrders: [
          { orderTotal: 200.1 },
          { orderTotal: 99.9 }
        ]
      }
    });

    expect(amountText("rev-amount")).toBe("Revenue $300.00");
    expect(amountText("exp-amount")).toBe("Expenses $150.25");
    expect(amountText("balance")).toBe("Balance $149.75");
    expect(amountText("num-orders")).toBe("Orders 2");
  });

  it("falls back to seed data when dashboard storage is malformed", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    await loadDashboard({
      rawStorage: {
        bizTrackTransactions: "{bad-json",
        bizTrackOrders: "{}"
      }
    });

    expect(amountText("rev-amount")).toBe("Revenue $320.90");
    expect(amountText("exp-amount")).toBe("Expenses $455.00");
    expect(amountText("balance")).toBe("Balance $-134.10");
    expect(amountText("num-orders")).toBe("Orders 5");
    expect(JSON.parse(page.window.localStorage.getItem("bizTrackTransactions"))).toHaveLength(5);
    expect(JSON.parse(page.window.localStorage.getItem("bizTrackOrders"))).toHaveLength(5);
  });

  it("exposes calculation helpers for dashboard totals and category sales", async () => {
    await loadDashboard({ runLoad: false });

    expect(page.window.calculateExpTotal([{ trAmount: 10 }, { trAmount: 2.5 }])).toBe(12.5);
    expect(page.window.calculateRevTotal([{ orderTotal: 20 }, { orderTotal: 7.75 }])).toBe(27.75);
    expect(
      page.window.calculateCategorySales([
        { prodCat: "Hats", prodPrice: 10, prodSold: 2 },
        { prodCat: "Hats", prodPrice: 5, prodSold: 3 },
        { prodCat: "Drinkware", prodPrice: 8, prodSold: 4 }
      ])
    ).toEqual({
      Hats: 35,
      Drinkware: 32
    });
  });

  it("opens and closes the dashboard sidebar", async () => {
    await loadDashboard({ runLoad: false });

    page.window.openSidebar();
    expect(page.document.getElementById("sidebar").style.display).toBe("block");

    page.window.openSidebar();
    expect(page.document.getElementById("sidebar").style.display).toBe("none");

    page.window.closeSidebar();
    expect(page.document.getElementById("sidebar").style.display).toBe("none");
  });

  it("initializes sales and expense charts with stored category data", async () => {
    await loadDashboard({
      runLoad: false,
      storage: {
        bizTrackProducts: [
          { prodCat: "Hats", prodPrice: 10, prodSold: 2 },
          { prodCat: "Drinkware", prodPrice: 5, prodSold: 10 },
          { prodCat: "Hats", prodPrice: 2, prodSold: 5 }
        ],
        bizTrackTransactions: [
          { trCategory: "Rent", trAmount: 100 },
          { trCategory: "Utilities", trAmount: 50.25 }
        ]
      }
    });

    page.window.initializeChart();

    expect(page.window.ApexCharts).toHaveBeenCalledTimes(2);

    const [barElement, barOptions] = page.window.ApexCharts.mock.calls[0];
    expect(barElement).toBe(page.document.querySelector("#bar-chart"));
    expect(barOptions.series[0].data).toEqual([50, 30]);
    expect(barOptions.xaxis.categories).toEqual(["Drinkware", "Hats"]);
    expect(barOptions.tooltip.y.formatter(12.5)).toBe("$12.50");
    expect(page.window.ApexCharts.mock.results[0].value.render).toHaveBeenCalled();

    const [donutElement, donutOptions] = page.window.ApexCharts.mock.calls[1];
    expect(donutElement).toBe(page.document.querySelector("#donut-chart"));
    expect(donutOptions.series).toEqual([100, 50.25]);
    expect(donutOptions.labels).toEqual(["Rent", "Utilities"]);
    expect(donutOptions.tooltip.y.formatter(8)).toBe("$8.00");
    expect(page.window.ApexCharts.mock.results[1].value.render).toHaveBeenCalled();
  });

  it("uses fallback chart data when product or expense storage is invalid", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    await loadDashboard({
      runLoad: false,
      rawStorage: {
        bizTrackProducts: "{}",
        bizTrackTransactions: "not-json"
      }
    });

    page.window.initializeChart();

    const barOptions = page.window.ApexCharts.mock.calls[0][1];
    const donutOptions = page.window.ApexCharts.mock.calls[1][1];

    expect(barOptions.xaxis.categories).toEqual([
      "Clothing",
      "Home decor",
      "Accessories",
      "Hats",
      "Drinkware"
    ]);
    expect(donutOptions.labels).toEqual([
      "Rent",
      "Order Fulfillment",
      "Utilities",
      "Supplies",
      "Miscellaneous"
    ]);
    expect(JSON.parse(page.window.localStorage.getItem("bizTrackProducts"))).toHaveLength(5);
    expect(JSON.parse(page.window.localStorage.getItem("bizTrackTransactions"))).toHaveLength(5);
  });
});

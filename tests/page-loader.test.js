import { describe, expect, it } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

describe("page loader helper", () => {
  it("loads a static page and exposes its local script functions", async () => {
    const page = await loadPage({
      htmlFile: "help.html",
      scripts: ["help.js"]
    });

    page.window.openSidebar();
    expect(page.document.getElementById("sidebar").style.display).toBe("block");

    page.window.closeSidebar();
    expect(page.document.getElementById("sidebar").style.display).toBe("none");

    page.cleanup();
  });

  it("loads a CRUD page script and renders its seed data", async () => {
    const page = await loadPage({
      htmlFile: "products.html",
      scripts: ["products.js"]
    });

    expect(page.document.querySelectorAll(".product-row")).toHaveLength(5);
    expect(page.document.getElementById("product-id").readOnly).toBe(false);

    page.cleanup();
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

let page;

async function loadProductsWithI18n(options = {}) {
  page = await loadPage({
    htmlFile: "products.html",
    scripts: ["i18n.js", "products.js"],
    ...options
  });

  return page;
}

function setField(id, value) {
  page.document.getElementById(id).value = value;
}

function fillProductForm() {
  setField("product-id", "PD888");
  setField("product-name", "Mugs");
  setField("product-desc", "Reusable mug");
  setField("product-cat", "Drinkware");
  setField("product-price", "9.5");
  setField("product-sold", "4");
}

afterEach(() => {
  page?.cleanup();
  page = undefined;
});

describe("language switcher", () => {
  it("switches visible page text to Chinese and persists the selection", async () => {
    await loadProductsWithI18n();

    page.window.setLanguage("zh");

    expect(page.document.documentElement.lang).toBe("zh-CN");
    expect(page.document.querySelector(".active span").textContent).toBe("产品");
    expect(page.document.querySelector(".header-title h2").textContent).toBe("产品");
    expect(page.document.getElementById("searchInput").getAttribute("placeholder")).toBe("搜索");
    expect(page.document.getElementById("submitBtn").textContent).toBe("添加");
    expect(page.window.localStorage.getItem("bizTrackLanguage")).toBe("zh");
  });

  it("keeps the saved language after reloading a page", async () => {
    await loadProductsWithI18n({
      rawStorage: {
        bizTrackLanguage: "zh"
      }
    });

    page.window.applyTranslations();

    expect(page.document.documentElement.lang).toBe("zh-CN");
    expect(page.document.querySelector(".language-select").value).toBe("zh");
    expect(page.document.querySelector(".product-title .main-title").textContent).toBe("产品");
  });

  it("keeps product creation working while Chinese is selected", async () => {
    await loadProductsWithI18n();

    page.window.setLanguage("zh");
    page.window.openForm();
    fillProductForm();
    page.window.addOrUpdate({ preventDefault: vi.fn() });

    expect(page.document.querySelectorAll(".product-row")).toHaveLength(6);
    expect(page.document.getElementById("page-feedback").textContent).toBe("产品 PD888 已成功添加。");
  });
});

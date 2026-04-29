import { afterEach, describe, expect, it } from "vitest";
import { loadPage } from "./helpers/pageLoader.js";

let page;

async function loadHelp() {
  page = await loadPage({
    htmlFile: "help.html",
    scripts: ["help.js"],
    runLoad: false
  });

  return page;
}

afterEach(() => {
  page?.cleanup();
  page = undefined;
});

describe("help page sidebar", () => {
  it("opens, toggles, and closes the sidebar", async () => {
    await loadHelp();

    const sidebar = page.document.getElementById("sidebar");

    page.window.openSidebar();
    expect(sidebar.style.display).toBe("block");

    page.window.openSidebar();
    expect(sidebar.style.display).toBe("none");

    page.window.closeSidebar();
    expect(sidebar.style.display).toBe("none");
  });
});

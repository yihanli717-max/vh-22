import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Script, createContext } from "node:vm";
import { JSDOM } from "jsdom";
import { vi } from "vitest";

async function readRepoFile(path) {
  return readFile(resolve(process.cwd(), path), "utf8");
}

function removeScriptTags(html) {
  const parserDom = new JSDOM(html);
  parserDom.window.document.querySelectorAll("script").forEach((script) => {
    script.remove();
  });

  return parserDom.serialize();
}

function installBrowserMocks(window) {
  if (!("innerText" in window.HTMLElement.prototype)) {
    Object.defineProperty(window.HTMLElement.prototype, "innerText", {
      get() {
        return this.textContent;
      },
      set(value) {
        this.textContent = value;
      }
    });
  }

  if (!window.URL.createObjectURL) {
    window.URL.createObjectURL = vi.fn(() => "blob:mock-url");
  }

  if (!window.URL.revokeObjectURL) {
    window.URL.revokeObjectURL = vi.fn();
  }

  if (!window.HTMLFormElement.prototype.reportValidity) {
    window.HTMLFormElement.prototype.reportValidity = vi.fn(() => true);
  }

  window.ApexCharts = vi.fn(() => ({
    render: vi.fn()
  }));
}

function createScriptSandbox(window) {
  const sandbox = {
    console,
    document: window.document,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    URL: window.URL,
    Blob: window.Blob,
    ApexCharts: window.ApexCharts,
    Event: window.Event,
    KeyboardEvent: window.KeyboardEvent,
    MouseEvent: window.MouseEvent,
    HTMLFormElement: window.HTMLFormElement,
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window)
  };

  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;

  return sandbox;
}

function syncGlobalsToWindow(window, sandbox) {
  Object.getOwnPropertyNames(sandbox).forEach((key) => {
    const value = sandbox[key];

    if (key === "onload" || (typeof value === "function" && !(key in window))) {
      window[key] = value;
    }
  });
}

function runScript(window, sandbox, source, filename) {
  const script = new Script(source, {
    filename: resolve(process.cwd(), filename)
  });
  script.runInContext(sandbox.context);
  syncGlobalsToWindow(window, sandbox);
}

export async function loadPage({ htmlFile, scripts = [], runLoad = true, storage = {}, rawStorage = {} }) {
  const rawHtml = await readRepoFile(htmlFile);
  const dom = new JSDOM(removeScriptTags(rawHtml), {
    url: `http://localhost/${htmlFile}`,
    pretendToBeVisual: true,
    runScripts: "dangerously"
  });

  const { window } = dom;
  installBrowserMocks(window);
  const sandbox = createScriptSandbox(window);
  sandbox.context = createContext(sandbox);

  Object.entries(storage).forEach(([key, value]) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  });

  Object.entries(rawStorage).forEach(([key, value]) => {
    window.localStorage.setItem(key, value);
  });

  for (const scriptPath of scripts) {
    runScript(window, sandbox, await readRepoFile(scriptPath), scriptPath);
  }

  if (runLoad && typeof window.onload === "function") {
    window.dispatchEvent(new window.Event("load"));
  }

  return {
    dom,
    window,
    document: window.document,
    globals: sandbox,
    cleanup: () => window.close()
  };
}

// Node 25 ships a built-in localStorage getter that lacks the full Web Storage
// API (e.g., .clear(), .setItem(), .getItem() are missing). vitest sets
// globalThis.jsdom = dom when using the jsdom environment, so we can reach the
// real jsdom Storage instance via dom.window._localStorage and override the
// Node 25 stub before any test runs.
const g = globalThis as { jsdom?: { window?: { _localStorage?: Storage } } };
if (g.jsdom?.window?._localStorage) {
  Object.defineProperty(globalThis, "localStorage", {
    get() {
      return g.jsdom!.window!._localStorage;
    },
    configurable: true,
  });
}

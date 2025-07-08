import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

const style = document.createElement("style");
style.textContent = ".hidden { display: none !important; }";
document.head.appendChild(style);

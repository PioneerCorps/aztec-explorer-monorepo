import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import resolve from "vite-plugin-resolve";
import { aztec } from "@shieldswap/vite-plugin-aztec";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...(process.env.NODE_ENV === "production"
      ? // TODO: this should be removed once `@aztec/bb.js` is back to normal size again
        resolve({
          "@aztec/bb.js": `export * from "https://unpkg.com/@aztec/bb.js@${"0.57.0"}/dest/browser/index.js"`,
        })
      : []),
    nodePolyfills({
      include: ["path"],
    }),
    topLevelAwait(),
    react(),
    svgr(),
  ],
});

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: ["src"],
      insertTypesEntry: true,
      exclude: ["src/**/*.spec.*"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        "object-mapper": "src/tools/object-mapper/index.ts",
        "message-handler": "src/tools/message-handler/index.ts",
        "message-handler-sync": "src/tools/message-handler-sync/index.ts",
        "switcher": "src/tools/switcher/index.ts"
      },
      name: "oz-branch-free",
      formats: ["es"],
      fileName: (format, entryName) => {
        return entryName === 'index' ? 'index.js' : `tools/${entryName}/index.js`;
      }
    },
    outDir: "lib",
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
});

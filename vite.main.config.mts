import { defineConfig } from "vite";
// eslint-disable-next-line import/no-unresolved

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["keytar"],
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/services": path.resolve(__dirname, "./src/services"),
    },
  },
});

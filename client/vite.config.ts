import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/components/common"),
      "@UI": path.resolve(__dirname, "./src/components/UI"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@forms": path.resolve(__dirname, "./src/forms"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@hooks": path.resolve(__dirname, "./src/hooks")
    }
  }
});

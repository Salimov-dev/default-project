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
      "@forms": path.resolve(__dirname, "./src/forms")
    }
  }
});

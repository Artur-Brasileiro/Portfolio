import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Fallback de SPA para o GitHub Pages: copia o index.html para 404.html no fim
// do build. Como o 404.html é idêntico ao index (com os assets já hasheados),
// um deep link recarregado (ex: /projeto/macropad) carrega o app e o
// BrowserRouter resolve a rota — sem flash de redirect.
const spaFallback404 = () => ({
  name: "spa-fallback-404",
  apply: "build" as const,
  closeBundle() {
    const index = path.resolve(__dirname, "dist/index.html");
    const notFound = path.resolve(__dirname, "dist/404.html");
    if (fs.existsSync(index)) fs.copyFileSync(index, notFound);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    spaFallback404(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Move todas as dependências da node_modules para um chunk separado chamado 'vendor'
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
}));

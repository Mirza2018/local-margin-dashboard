import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // This will make the server accessible externally
    port: 9020, // Specify the port you want to use
  },
});

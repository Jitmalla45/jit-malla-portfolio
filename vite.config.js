import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ["framer-motion", "gsap", "lenis"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes("use client")
        ) {
          return;
        }

        warn(warning);
      },
    },
  },
});

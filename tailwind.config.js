/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#02030a",
        obsidian: "#070b16",
        glass: "rgba(255, 255, 255, 0.08)",
        labCyan: "#35f3ff",
        labMint: "#64ffbd",
        labGold: "#ffd166",
        labRose: "#ff5f8f",
        ink: "#dce9ff",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(53, 243, 255, 0.22)",
        panel: "0 24px 90px rgba(0, 0, 0, 0.42)",
      },
      backgroundImage: {
        "lab-radial":
          "radial-gradient(circle at 20% 10%, rgba(53,243,255,.22), transparent 28%), radial-gradient(circle at 80% 18%, rgba(255,95,143,.15), transparent 28%), radial-gradient(circle at 45% 88%, rgba(100,255,189,.14), transparent 34%)",
      },
    },
  },
  plugins: [],
};

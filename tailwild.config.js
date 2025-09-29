// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // App Router files
    "./pages/**/*.{js,ts,jsx,tsx}", // If you still use /pages
    "./components/**/*.{js,ts,jsx,tsx}", // Components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: { 900: '#0a0e1a', 800: '#111827', 700: '#1f2937', 600: '#374151' },
                accent: { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
                green: { 400: '#4ade80', 500: '#22c55e' },
                red: { 400: '#f87171', 500: '#ef4444' },
            },
            fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
        },
    },
    plugins: [],
}

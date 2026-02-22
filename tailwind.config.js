/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0F3D39",
                    light: "#1A5C55",
                    dark: "#082926",
                },
                secondary: {
                    DEFAULT: "#D4AF37",
                    light: "#E5C560",
                    dark: "#AA8C2C",
                },
            },
            fontFamily: {
                sans: ["var(--font-cairo)", "sans-serif"],
            },
            boxShadow: {
                'premium': '0 20px 50px rgba(15, 61, 57, 0.15)',
                'premium-hover': '0 30px 60px rgba(15, 61, 57, 0.25)',
                'gold': '0 10px 30px rgba(212, 175, 55, 0.2)',
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            animation: {
                float: "float 3s ease-in-out infinite",
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};

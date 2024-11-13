/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                threads: {
                    grey: "#0F0F0F",
                    "grey-light": "#7A7A7A",
                    "grey-dark": "#1E1E1E",
                    redish: "#000fff",
                    modal: "#414040",
                },
            },
        },
    },
    plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "sans-serif"],
			},
			colors: {
				accent: "#CA00FF",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				"modal-slide-in": {
					from: {opacity: '40%', filter: 'blur(1px)' },
					to: { opacity:'100%', filter: 'blur(0)' },
				},
				
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"modal-slide-in": "modal-slide-in 0.3s ease-in",
				
			},
		},
	},
	plugins: [],
};
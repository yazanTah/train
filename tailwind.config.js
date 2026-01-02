/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				amber: {
					500: "#f59e0b",
					400: "#fbbf24",
				},
				stone: {
					950: "#0c0a09",
					900: "#1c1917",
					800: "#292524",
					700: "#44403c",
					600: "#57534e",
					500: "#78716c",
				},
			},
			animation: {
				"pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
}

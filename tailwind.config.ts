import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				agencyFb: ['var(--font-agencyFb)'],
				tomorrow: ['var(--font-tomorrow)'],
				rajdhani: ['var(--font-rajdhani)']
			},
			colors: {
				aureolin: 'rgb(248, 239, 0);',
				redlight: '#AA243D',
				grayLight: 'rgb(196, 196, 196);',
				redNeon: 'rgb(247, 80, 73);'
			},
			backgroundImage: {
				onMusic: "url('/icons/on-music.svg')",
				offMusic: "url('/icons/off-music.svg')",
				language: "url('/icons/language.svg')"
			}
		},
	},
	plugins: [],
};
export default config;

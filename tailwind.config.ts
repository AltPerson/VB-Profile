import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        agencyFb: ['var(--font-agencyFb)'],
        tomorrow: ['var(--font-tomorrow)'],
        rajdhani: ['var(--font-rajdhani)'],
      },
      colors: {
        aureolin: 'rgb(248, 239, 0);',
        redlight: '#AA243D',
        grayLight: 'rgb(196, 196, 196);',
        redNeon: 'rgb(247, 80, 73);',
        blueNeon: '#5EF6FF',
      },
      backgroundImage: {
        onMusic: "url('/assets/icons/on-music.svg')",
        offMusic: "url('/assets/icons/off-music.svg')",
        language: "url('/assets/icons/language.svg')",
        projectOne:
          "linear-gradient(rgba(32, 52, 54, 0.4) 100%, rgba(32, 52, 54, 0.4) 100%),url('/assets/gifs/project_first.gif')",
        projectTwo:
          "linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(32, 52, 54, 0.4) 100%),url('/assets/images/monitor-bg.png'),url('/assets/gifs/project_second.gif')",
        projectThird:
          "linear-gradient(rgba(32, 52, 54, 0.4) 100%, rgba(32, 52, 54, 0.4) 100%),url('/assets/gifs/project_third.gif')",
      },
    },
  },
  plugins: [],
};
export default config;

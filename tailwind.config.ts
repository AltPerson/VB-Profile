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
        rationale: ['var(--font-rationale)'],
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
        projectOne:
          "linear-gradient(rgba(32, 52, 54, 0.4) 100%, rgba(32, 52, 54, 0.4) 100%),url('/assets/animations/project_first.webp')",
        projectTwo:
          "linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(32, 52, 54, 0.4) 100%),url('/assets/images/monitor-bg.png'),url('/assets/animations/project_second.webp')",
        projectThird:
          "linear-gradient(rgba(32, 52, 54, 0.4) 100%, rgba(32, 52, 54, 0.4) 100%),url('/assets/animations/project_third.webp')",
      },
    },
  },
  plugins: [],
};
export default config;

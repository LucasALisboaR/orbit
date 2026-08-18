/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind v4: as cores ativas ficam em src/tailwind.css (@theme),
  // apontando para as CSS vars de src/styles/design-tokens.scss.
  // Este mapa documenta as mesmas cores para referência / tooling.
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D91D6',
        secondary: '#64C4D1',
      },
    },
  },
  plugins: [],
};

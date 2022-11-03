const minWidthQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`;

export const THEME = {
  baseFontSize: 16,
  breakpoints: {
    sm: minWidthQuery(480),
    md: minWidthQuery(768),
    lg: minWidthQuery(1024),
    xl: minWidthQuery(1200),
  },
  colors: {
    primary: {
      "50": "hsl(129, 53%, 90%)",
      "100": "hsl(141, 45%, 81%)",
      "200": "hsl(147, 43%, 71%)",
      "300": "hsl(150, 42%, 62%)",
      "400": "hsl(152, 41%, 52%)",
      "500": "hsl(153, 39%, 41%)",
      "600": "hsl(153, 40%, 30%)",
      "700": "hsl(155, 43%, 18%)",
      "800": "hsl(159, 56%, 7%)",
      "900": "hsl(205, 52%, 6%)",
    },
    red: {
      "50": "hsl(348, 100%, 97%)",
      "100": "hsl(349, 100%, 90%)",
      "200": "hsl(349, 100%, 85%)",
      "300": "hsl(349, 100%, 78%)",
      "400": "hsl(349, 100%, 73%)",
      "500": "hsl(349, 100%, 65%)",
      "600": "hsl(343, 79%, 44%)",
      "700": "hsl(343, 79%, 36%)",
      "800": "hsl(343, 79%, 28%)",
      "900": "hsl(343, 75%, 20%)",
    },
  },
  fonts: {
    inter: '"Inter", sans-serif',
  },
  spacing: [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
  ],
};

export type Theme = typeof THEME;

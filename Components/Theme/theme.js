// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
const breakpoints = createBreakpoints({
  sm: "320px",
  custom1: "420px",
  custom: "569px",
  md: "768px",
  zz: "655px",
  lg: "960px",
  llg: "1100px",
  xl: "1250px",
  ql: "1475px",
  "2xl": "1536px",
  "3xl": "1625px",
});
// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, breakpoints });

export default theme;

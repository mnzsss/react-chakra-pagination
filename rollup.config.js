import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: ["src/index.ts"],
  output: [
    {
      dir: "dist",
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    sass({ insert: true }),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: [
    "react",
    "react-dom",
    "@chakra-ui/react",
    "react-table",
    "react-icons",
  ],
};

import { ResponsiveValue, ThemeTypings } from "@chakra-ui/react";

export type Token<
  CSSType,
  ThemeKey = unknown
> = ThemeKey extends keyof ThemeTypings
  ? ResponsiveValue<CSSType | ThemeTypings[ThemeKey]>
  : ResponsiveValue<CSSType>;

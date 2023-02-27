import * as CSS from "csstype";
import { Token } from "./Helpers";

type ListItemWithIcon =
  | {
      icon: any;
      iconColor: Token<CSS.Property.Color, "colors">;
      iconPosition: "start" | "end";
    }
  | {
      icon?: any;
      iconColor?: never;
      iconPosition?: never;
    };

export type ListItem = {
  content: string | JSX.Element;
} & ListItemWithIcon;

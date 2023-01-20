import { NoContentProps } from "../components/NoContent";

export type DataType = {
  [key: string]: JSX.Element | string;
};

export type EmptyMessage = Partial<NoContentProps>;

import { colors } from "@toss/tds-react-native";
import { TextBox } from "./TextBox";

interface ErrorViewProps {
  children: React.ReactNode;
  error: string | null;
}

export function ErrorView({ children, error }: ErrorViewProps) {
  return error ? (
    <TextBox text={error} bgColor={colors.red50} fontColor={colors.red600} />
  ) : (
    children
  );
}

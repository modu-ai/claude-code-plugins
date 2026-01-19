import { TextBox } from "./ui/TextBox";
import { colors } from "@toss/tds-react-native";

interface ErrorViewProps {
  children: React.ReactNode;
  error: string | null;
}

export function ErrorView({ children, error }: ErrorViewProps) {
  return error ? (
    <TextBox
      text={error}
      bgColor={colors.red50}
      fontColor={colors.red500}
      fontWeight="bold"
    />
  ) : (
    children
  );
}

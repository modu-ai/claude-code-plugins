import { colors } from "@toss/tds-react-native";
import { TextBox } from "./ui/TextBox";

interface LoginStateViewProps {
  accessToken: string | null;
}

export function LoginStateView({ accessToken }: LoginStateViewProps) {
  const isLoggedIn = accessToken != null;

  const text = isLoggedIn ? "로그인에 성공했어요." : "로그인을 하지 않았어요.";
  const bgColor = isLoggedIn ? colors.green50 : colors.grey100;
  const fontColor = isLoggedIn ? colors.green600 : colors.grey600;

  return <TextBox text={text} bgColor={bgColor} fontColor={fontColor} />;
}

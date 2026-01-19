import { TextBox } from "./ui/TextBox";
import { Button, colors } from "@toss/tds-react-native";

interface OfflineVideoNoticeProps {
  reloadNetworkStatus: () => void;
}

export function OfflineVideoNotice({
  reloadNetworkStatus,
}: OfflineVideoNoticeProps) {
  return (
    <>
      <TextBox
        text="오프라인 환경에서는 영상을 재생할 수 없어요."
        fontColor={colors.red600}
        bgColor={colors.red50}
      />
      <Button display="block" onPress={reloadNetworkStatus}>
        다시 불러오기
      </Button>
    </>
  );
}

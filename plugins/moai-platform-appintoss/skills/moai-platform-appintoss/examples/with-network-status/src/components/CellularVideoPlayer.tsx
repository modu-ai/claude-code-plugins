import { colors } from "@toss/tds-react-native";
import { TextBox } from "./ui/TextBox";
import { VideoView } from "./ui/VideoView";

/**
 * 저화질 비디오 URL이에요.
 */
const LOW_QUALITY =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

export function CellularVideoPlayer() {
  return (
    <>
      <TextBox
        text="모바일 데이터 환경에서는 저화질 영상 재생돼요."
        fontColor={colors.grey600}
        bgColor={colors.grey100}
      />
      <VideoView uri={LOW_QUALITY} />
    </>
  );
}

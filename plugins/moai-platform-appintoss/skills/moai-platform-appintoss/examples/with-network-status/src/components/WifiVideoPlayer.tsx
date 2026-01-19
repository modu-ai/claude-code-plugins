import { colors } from "@toss/tds-react-native";
import { TextBox } from "./ui/TextBox";
import { VideoView } from "./ui/VideoView";

/**
 * 고화질 비디오 URL이에요.
 */
const HIGH_QUALITY =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_30MB.mp4";

export function WifiVideoPlayer() {
  return (
    <>
      <TextBox
        text="Wi-Fi 환경에서는 고화질 영상 재생돼요."
        fontColor={colors.blue600}
        bgColor={colors.blue50}
      />
      <VideoView uri={HIGH_QUALITY} />
    </>
  );
}

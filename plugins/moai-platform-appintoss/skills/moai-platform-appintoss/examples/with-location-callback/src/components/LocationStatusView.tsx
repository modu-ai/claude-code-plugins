import { TextBox } from "./ui/TextBox";
import { colors } from "@toss/tds-react-native";

/**
 * 현재 위치 상태에 따라 사용자에게 보여줄 메시지를 정의한 상수예요.
 *
 * - INITIAL: 위치 추적이 시작되지 않은 상태예요.
 * - SAFE: 설정된 위치 안에 있을 때의 메시지예요.
 * - MOVE: 사용자가 이동 중일 때의 메시지예요.
 * - WARNING: 설정된 위치를 벗어났을 때 경고 메시지예요.
 */
export const LOCATION_STATUS = {
  INITIAL: "위치를 관찰하고 있지 않아요.",
  SAFE: "현재 위치에 있어요.",
  MOVE: "이동 중이에요.",
  WARNING: "자리를 벗어났어요! 두고 온 물건은 없나요?",
} as const;

interface LocationStatusViewProps {
  currentDistance: number;
  locationStatus: keyof typeof LOCATION_STATUS;
}

export function LocationStatusView({
  currentDistance,
  locationStatus,
}: LocationStatusViewProps) {
  const viewStyle = {
    INITIAL: {
      bgColor: colors.grey100,
      fontColor: colors.grey600,
    },
    SAFE: {
      bgColor: colors.green50,
      fontColor: colors.green600,
    },
    MOVE: {
      bgColor: colors.blue50,
      fontColor: colors.blue600,
    },
    WARNING: {
      bgColor: colors.red50,
      fontColor: colors.red600,
    },
  };
  return (
    <>
      <TextBox
        text={LOCATION_STATUS[locationStatus]}
        fontColor={viewStyle[locationStatus].fontColor}
        bgColor={viewStyle[locationStatus].bgColor}
      />
      <TextBox text={`이동거리: ${currentDistance.toFixed(2)}m`} />
    </>
  );
}

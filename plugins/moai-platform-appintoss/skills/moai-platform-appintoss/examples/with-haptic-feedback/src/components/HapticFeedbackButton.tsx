import {
  generateHapticFeedback,
  type HapticFeedbackType,
} from "@apps-in-toss/framework";
import { Button } from "@toss/tds-react-native";

interface HapticFeedbackButtonProps {
  label: string;
  type: HapticFeedbackType;
}

export function HapticFeedbackButton({
  label,
  type,
}: HapticFeedbackButtonProps) {
  return (
    <Button
      display="block"
      onPress={() => {
        generateHapticFeedback({ type });
      }}
    >
      {label}
    </Button>
  );
}

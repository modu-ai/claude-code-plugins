import { useEffect, useRef } from "react";
import { useDialog } from "@toss/tds-react-native";

interface DraftPromptProps {
  stored: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function DraftPrompt({ stored, onAccept, onDecline }: DraftPromptProps) {
  const hasShownPrompt = useRef<boolean>(false);
  const dialog = useDialog();

  useEffect(() => {
    const shouldSkipPrompt =
      stored.trim().length <= 0 || hasShownPrompt.current === true;

    if (shouldSkipPrompt) {
      return;
    }

    hasShownPrompt.current = true;
    showRestoreDraftDialog();
  }, []);

  const showRestoreDraftDialog = async () => {
    const confirmed = await dialog.openConfirm({
      title: "작성하던 글이 있어요.",
      description: "불러올까요?",
    });

    confirmed ? onAccept() : onDecline();
  };

  return null;
}

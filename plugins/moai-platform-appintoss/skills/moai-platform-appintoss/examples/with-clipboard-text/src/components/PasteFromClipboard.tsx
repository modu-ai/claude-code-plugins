import { useState } from "react";
import { getClipboardText } from "@apps-in-toss/framework";
import { Button, TextField, useToast } from "@toss/tds-react-native";
import { usePermissionGate } from "hooks/usePermissionGate";

export function PasteFromClipboard() {
  const [inputText, setInputText] = useState("");
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => getClipboardText.getPermission(),
    openPermissionDialog: () => getClipboardText.openPermissionDialog(),
    onPermissionRequested: (status) => console.log(`권한 요청 결과: ${status}`),
  });

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await permissionGate.ensureAndRun(() =>
        getClipboardText()
      );

      if (!clipboardText) {
        toast.open("클립보드에 텍스트가 없어요.");
        return;
      }

      setInputText(clipboardText);
    } catch (error) {
      let errorMessage = "텍스트를 가져오지 못했어요";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.open(`${errorMessage}`);
    }
  };

  return (
    <TextField
      style={{ flex: 1 }}
      variant="box"
      placeholder="복사한 텍스트를 붙여 넣어보세요."
      value={inputText}
      onChangeText={setInputText}
      disabled
      right={
        <Button size="tiny" type="dark" onPress={handlePasteFromClipboard}>
          붙어넣기
        </Button>
      }
    />
  );
}

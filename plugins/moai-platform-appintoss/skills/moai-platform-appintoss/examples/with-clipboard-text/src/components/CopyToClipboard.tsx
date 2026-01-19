import { useState } from "react";
import { setClipboardText } from "@apps-in-toss/framework";
import { Button, TextField, useToast } from "@toss/tds-react-native";
import { usePermissionGate } from "hooks/usePermissionGate";

export function CopyToClipboard() {
  const [inputText, setInputText] = useState("");
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => setClipboardText.getPermission(),
    openPermissionDialog: () => setClipboardText.openPermissionDialog(),
    onPermissionRequested: (status) => console.log(`권한 요청 결과: ${status}`),
  });

  const handleCopyToClipboard = async () => {
    try {
      if (inputText.trim() === "") {
        toast.open("텍스트를 입력해주세요.");
        return;
      }

      await permissionGate.ensureAndRun(() => setClipboardText(inputText));

      toast.open("텍스트가 복사됐어요!");
    } catch (error) {
      let errorMessage = "텍스트를 복사에 실패했어요";

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
      placeholder="텍스트를 입력 후 복사해 보세요."
      value={inputText}
      onChangeText={setInputText}
      paddingBottom={0}
      right={
        <Button size="tiny" onPress={handleCopyToClipboard}>
          복사하기
        </Button>
      }
    />
  );
}

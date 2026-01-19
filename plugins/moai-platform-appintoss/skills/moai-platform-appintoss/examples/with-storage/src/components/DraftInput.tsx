import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextField } from "@toss/tds-react-native";
import { useStorage } from "hooks/useStorage";
import { useDebouncedSaveWithMessage } from "hooks/useDebouncedSaveWithMessage";
import { DraftPrompt } from "./DraftPrompt";

interface Props {
  storageKey: string;
}

export function DraftInput({ storageKey }: Props) {
  const { loading, storedValue, saveItem, removeItem } = useStorage(storageKey);
  const [text, setText] = useState<string>("");
  const { showSavedMessage } = useDebouncedSaveWithMessage({
    value: text,
    onSave: saveItem,
  });

  return (
    <View>
      {loading === false && (
        <DraftPrompt
          stored={storedValue}
          onAccept={() => setText(storedValue)}
          onDecline={() => {
            removeItem();
            setText("");
          }}
        />
      )}
      <TextField
        containerStyle={styles.textfieldContainer}
        style={styles.textfield}
        variant="box"
        placeholder="텍스트를 입력 후 복사해 보세요."
        value={text}
        onChangeText={setText}
        paddingBottom={8}
        multiline
        help={showSavedMessage && "초안이 저장됐어요."}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textfieldContainer: {
    paddingHorizontal: 0,
  },
  textfield: {
    height: 100,
    textAlignVertical: "top",
  },
});

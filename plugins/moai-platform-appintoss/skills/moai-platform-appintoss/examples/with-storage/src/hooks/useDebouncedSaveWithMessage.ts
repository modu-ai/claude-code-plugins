import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'es-toolkit';

/** 저장 동작의 디바운스 지연 시간(ms)이에요. */
const DEFAULT_SAVE_DEBOUNCE_DELAY = 500;

/** 저장됨 메시지가 표시되는 시간(ms)이에요. */
const DEFAULT_MESSAGE_DURATION = 1400;

type Options = {
  value: string;
  onSave: (value: string) => void;
  delay?: number;
  messageDuration?: number;
};

export function useDebouncedSaveWithMessage({
  value,
  onSave,
  delay = DEFAULT_SAVE_DEBOUNCE_DELAY,
  messageDuration = DEFAULT_MESSAGE_DURATION,
}: Options) {
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const previousValueRef = useRef<string>('');
  const timeoutRef = useRef<number>();

  const debouncedSave = useMemo(
    () =>
      debounce((text) => {
        if (previousValueRef.current === text) {
          return;
        }

        onSave(text);
        previousValueRef.current = text;

        if (timeoutRef.current != null) {
          clearTimeout(timeoutRef.current);
        }

        setShowSavedMessage(true);
        timeoutRef.current = setTimeout(() => {
          setShowSavedMessage(false);
          timeoutRef.current = undefined;
        }, messageDuration);
      }, delay),
    [onSave, delay, messageDuration]
  );

  useEffect(() => {
    debouncedSave(value);
  }, [value, debouncedSave]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      debouncedSave.cancel();
    };
  }, []);

  return {
    showSavedMessage,
  };
}

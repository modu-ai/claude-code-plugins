import { Storage } from '@apps-in-toss/framework';
import { useCallback, useEffect, useState } from 'react';

/**
 * Storage에 저장할 때 사용할 기본 key에요.
 * 따로 key를 지정하지 않으면 'INPUT_KEY'가 사용돼요.
 */
const DEFAULT_KEY = 'INPUT_KEY';

export function useStorage(key = DEFAULT_KEY) {
  const [storedValue, setStoredValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadItem();
  }, [key]);

  const loadItem = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await Storage.getItem(key);
      setStoredValue(stored ?? '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const saveItem = async (text: string) => {
    try {
      await Storage.setItem(key, text);
      setStoredValue(text);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async () => {
    setLoading(true);
    try {
      await Storage.removeItem(key);
      setStoredValue('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    storedValue,
    saveItem,
    removeItem,
  };
}

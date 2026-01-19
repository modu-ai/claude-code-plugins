import { useState } from 'react';
import uuid from 'react-native-uuid';
import { maskText } from '../utils/maskText';

export const useClientKey = (visible = 6) => {
  const [key] = useState(() => uuid.v4().toString());
  const masked = maskText(key, visible);

  return { key, masked };
};

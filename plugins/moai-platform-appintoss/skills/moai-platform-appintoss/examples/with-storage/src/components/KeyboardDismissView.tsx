import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

interface KeyboardDismissViewProps {
  children: React.ReactNode;
}

export function KeyboardDismissView({ children }: KeyboardDismissViewProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}

import { StyleSheet, Pressable, PressableProps } from 'react-native';
import { Image } from "@granite-js/react-native";

interface PhotoItemProps extends PressableProps {
  uri: string;
}

export function PhotoItem({ uri, ...props }: PhotoItemProps) {
  return (
    <Pressable style={styles.itemContainer} {...props}>
      <Image source={{ uri }} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '33.33%',
    height: 'auto',
    aspectRatio: 1 / 1,
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1 / 1,
  },
});

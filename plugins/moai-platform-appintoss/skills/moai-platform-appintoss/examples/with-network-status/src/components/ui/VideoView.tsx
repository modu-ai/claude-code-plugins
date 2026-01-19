import { StyleSheet } from 'react-native';
import { Video } from "@granite-js/react-native";

interface VideoViewProps {
  uri: string;
}

export function VideoView({ uri }: VideoViewProps) {
  return (
    <Video
      source={{ uri }}
      repeat
      muted={true}
      paused={false}
      resizeMode="cover"
      style={styles.video}
      controls
    />
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1 / 1,
    borderRadius: 16,
  },
});

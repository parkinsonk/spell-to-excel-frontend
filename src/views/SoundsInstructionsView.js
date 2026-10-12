
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import { Video, ResizeMode } from 'expo-av';

export default function SoundsInstructionsView({ navigation }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  // ------------------------------------------------
  // BACK BUTTON
  // ------------------------------------------------

  const handleCustomBackAction = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.stopAsync();
      }
    } catch (error) {
      console.error('Error stopping video:', error);
    }

    navigation.goBack();
  };

  // ------------------------------------------------
  // NAVIGATION HEADER
  // ------------------------------------------------

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleCustomBackAction}
          style={{ marginLeft: 10 }}
        >
          <Image
            source={require('../assets/back.png')}
            style={{ width: 60, height: 60 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // ------------------------------------------------
  // SCREEN
  // ------------------------------------------------

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/boxesViews/soundsInstructions.mov')}
        useNativeControls
        shouldPlay
        isLooping={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(s) => setStatus(s)}
        onError={(error) => {
          console.error('Video playback error:', error);
        }}
        style={styles.video}
      />
    </View>
  );
}

// ------------------------------------------------
// STYLES
// ------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});

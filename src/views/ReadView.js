import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useProgress } from '../components/ProgressContext';
import readVideoMapping from '../utils/readVideoMapping';

export default function ReadView({ navigation, route }) {
  const { batch, activity, selectedWord } = route.params;

  const {
    markActivityCompleted,
    checkFlyingHigh,
    checkSunnyIsland,
    checkSpringtimeFun,
    checkAlienAdventure,
    checkOuterSpace,
    checkPlanetsAndBeyond,
    checkDivingDeep,
  } = useProgress();

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const videoRef = useRef(null);

  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const playbackValue =
    readVideoMapping[selectedWord] || readVideoMapping.default;

  const source =
    typeof playbackValue === 'string'
      ? { uri: playbackValue }
      : playbackValue;

  const handleCustomBackAction = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await markActivityCompleted(activity, selectedWord);

      if (batch === 'Flying High') await checkFlyingHigh('Flying High');
      else if (batch === 'Sunny Island') await checkSunnyIsland('Sunny Island');
      else if (batch === 'SpringTime Fun') await checkSpringtimeFun('SpringTime Fun');
      else if (batch === 'Alien Adventures') await checkAlienAdventure('Alien Adventures');
      else if (batch === 'Outer Space') await checkOuterSpace('Outer Space');
      else if (batch === 'Planets and Beyond') await checkPlanetsAndBeyond('Planets and Beyond');
      else if (batch === 'Diving Deep') await checkDivingDeep('Diving Deep');

      Alert.alert("Congrats!", "You've completed the Read activity.");
      navigation.goBack();

    } catch (error) {
      console.error('Error completing Read activity:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleCustomBackAction}
          disabled={isLoading}
          style={{ marginLeft: 10, opacity: isLoading ? 0.5 : 1 }}
        >
          <Image source={require('../assets/back.png')} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isLoading]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={source}
        useNativeControls
        shouldPlay
        isLooping={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(s) => setStatus(s)}
        style={styles.video}
      />

      {isLoading && (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Saving Progress...</Text>
        </View>
      )}
    </View>
  );
}

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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 999,
    elevation: 999,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
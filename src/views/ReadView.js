import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useProgress } from '../components/ProgressContext';
import readVideoMapping from '../utils/readVideoMapping';


export default function ReadView({ navigation, route }) {

  const PLAYBACK_URL = readVideoMapping[selectedWord];
  const { batch, activity, selectedWord } = route.params;
  const {
    markActivityCompleted, checkFlyingHigh, checkSunnyIsland, checkSpringtimeFun,
    checkAlienAdventure, checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep
  } = useProgress();

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const playbackValue = readVideoMapping[selectedWord] || readVideoMapping.default || PLAYBACK_URL;
  // `require(...)` returns a local asset (number/object) which must be passed
  // directly to the Video `source` prop. Remote urls must be wrapped as { uri }.
  const source = typeof playbackValue === 'string' ? { uri: playbackValue } : playbackValue;

  const handleCustomBackAction = async () => {
    Alert.alert("Congrats!", "You've completed the Read activity.");
    await markActivityCompleted(activity, selectedWord);
    if (batch === 'Flying High') await checkFlyingHigh('Flying High');
    else if (batch === 'Sunny Island') await checkSunnyIsland('Sunny Island');
    else if (batch === 'SpringTime Fun') await checkSpringtimeFun('SpringTime Fun');
    else if (batch === 'Alien Adventures') await checkAlienAdventure('Alien Adventures');
    else if (batch === 'Outer Space') await checkOuterSpace('Outer Space');
    else if (batch === 'Planets and Beyond') await checkPlanetsAndBeyond('Planets and Beyond');
    else if (batch === 'Diving Deep') await checkDivingDeep('Diving Deep');
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleCustomBackAction} style={{ marginLeft: 10 }}>
          <Image source={require('../assets/back.png')} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
      <Video
        ref={videoRef}
        source={source}
        useNativeControls
        shouldPlay          // let Expo start playback; no need to call playAsync()
        isLooping={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={s => setStatus(s)}
        style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
      />
    </View>
  );
}
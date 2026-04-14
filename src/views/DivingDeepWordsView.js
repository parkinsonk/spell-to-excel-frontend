import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderWordPressable } from '../components/wordButtons';
import { Audio } from 'expo-av';
import wordAudioMapping from '../utils/wordAudioMapping.js';

const DivingDeepWordsView = ({ navigation }) => {
  const { divingDeepStatus, isLoading } = useProgress();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = isLandscape
    ? screenWidth / screenHeight
    : screenHeight / screenWidth;

  const getImageSource = (word) => {
    const isCompleted = divingDeepStatus[word]
      ? divingDeepStatus[word].test_correct
      : false;
    const key = isCompleted ? `${word}completed` : word;
    return wordImageMapping[key];
  };

  const calculateImageDimensions = (
    aspectRatio,
    iPhoneValue,
    iPadMiniValue,
    iPadValue
  ) => {
    if (aspectRatio > 1.7) {
      return iPhoneValue;
    } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
      return iPadMiniValue;
    } else {
      return iPadValue;
    }
  };

  // Audio
  const soundRef = useRef(null);

  const playWord = async (word) => {
    if (!word) return;
    const audioFile = wordAudioMapping[word.trim().toLowerCase()];
    if (!audioFile) return;

    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(audioFile, {
        shouldPlay: true,
      });

      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          soundRef.current = null;
        }
      });
    } catch (err) {
      console.warn('DivingDeepWordsView audio error:', err);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    top: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: 'black',
      borderBottomWidth: 2,
    },
    middle: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'black',
    },
    bottom: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'black',
      borderTopWidth: 2,
    },
    onceOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
      marginRight: '20%',
    },
    liveOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    thankOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    shouldOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    veryOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    washOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    doesOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    warmOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    workOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%')
        : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%')
        : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
    },
    Image: {
      height: '100%',
      width: '100%',
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/divingDeepView/divingDeepBackground.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.top}>
        <TouchableOpacity
          style={styles.onceOpacity}
          onPress={() => {
            playWord('once');
            navigation.navigate('Activities', {
              selectedWord: 'once',
              batch: 'Diving Deep',
            });
          }}
        >
          <Image
            source={getImageSource('once')}
            style={styles.Image}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {renderWordPressable(
          'once',
          'live',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('live'),
          playWord
        )}
      </SafeAreaView>

      <SafeAreaView style={styles.middle}>
        {renderWordPressable(
          'live',
          'thank',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('thank'),
          playWord
        )}
        {renderWordPressable(
          'thank',
          'should',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('should'),
          playWord
        )}
        {renderWordPressable(
          'should',
          'very',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('very'),
          playWord
        )}
      </SafeAreaView>

      <SafeAreaView style={styles.bottom}>
        {renderWordPressable(
          'very',
          'wash',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('wash'),
          playWord
        )}
        {renderWordPressable(
          'wash',
          'does',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('does'),
          playWord
        )}
        {renderWordPressable(
          'does',
          'warm',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('warm'),
          playWord
        )}
        {renderWordPressable(
          'warm',
          'work',
          'Diving Deep',
          divingDeepStatus,
          navigation,
          styles,
          getImageSource('work'),
          playWord
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DivingDeepWordsView;
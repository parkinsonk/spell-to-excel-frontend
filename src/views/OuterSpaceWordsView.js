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

const OuterSpaceWordsView = ({ navigation }) => {
  const { outerSpaceStatus, isLoading } = useProgress();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = isLandscape
    ? screenWidth / screenHeight
    : screenHeight / screenWidth;

  const getImageSource = (word) => {
    const isCompleted = outerSpaceStatus[word]
      ? outerSpaceStatus[word].test_correct
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
      console.warn('OuterSpaceWordsView audio error:', err);
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
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    middleTop: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    middleBottom: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    bottom: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    someOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%')
        : calculateImageDimensions(aspectRatio, '25%', '25%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '17%', '17%', '16%'),
    },
    prettyOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '80%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '13%')
        : calculateImageDimensions(aspectRatio, '9%', '15%', '16%'),
    },
    wouldOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '55%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '13%')
        : calculateImageDimensions(aspectRatio, '9%', '17%', '17%'),
    },
    intoOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '30%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '9%', '19%', '16%'),
    },
    sawOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '65%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '9%', '17%', '16%'),
    },
    moreOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '9%', '20%', '16%'),
    },
    writeOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '60%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '9%', '17%', '16%'),
    },
    whoOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '55%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '9%', '17%', '16%'),
    },
    newOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%')
        : calculateImageDimensions(aspectRatio, '35%', '25%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '20%', '12%')
        : calculateImageDimensions(aspectRatio, '9%', '26%', '16%'),
    },
    underOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%')
        : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
    },
    couldOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%')
        : calculateImageDimensions(aspectRatio, '40%', '25%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '25%', '20%', '16%'),
    },
    walkOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '65%', '70%')
        : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '25%', '17%', '16%'),
    },
    againOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%')
        : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '25%', '20%', '16%'),
    },
    soonOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%')
        : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
    },
    peopleOpacity: {
      height: isLandscape
        ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%')
        : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
      width: isLandscape
        ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%')
        : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
    },
    Image: {
      height: '100%',
      width: '100%',
    },
    astronautImage: {
      height: '100%',
      width: '20%',
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
      source={require('../assets/outerSpaceView/outerSpaceBackground.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.top}>
        <TouchableOpacity
          style={styles.someOpacity}
          onPress={() => {
            playWord('some');
            navigation.navigate('Activities', {
              selectedWord: 'some',
              batch: 'Outer Space',
            });
          }}
        >
          <Image
            source={getImageSource('some')}
            style={styles.Image}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {renderWordPressable('some', 'pretty', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('pretty'), playWord)}
        {renderWordPressable('pretty', 'would', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('would'), playWord)}
        {renderWordPressable('would', 'into', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('into'), playWord)}
        {renderWordPressable('into', 'saw', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('saw'), playWord)}
      </SafeAreaView>

      <SafeAreaView style={styles.middleTop}>
        {renderWordPressable('saw', 'more', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('more'), playWord)}
        {renderWordPressable('more', 'write', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('write'), playWord)}
        {renderWordPressable('write', 'who', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('who'), playWord)}
        {renderWordPressable('who', 'new', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('new'), playWord)}
      </SafeAreaView>

      <SafeAreaView style={styles.middleBottom}>
        {renderWordPressable('new', 'under', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('under'), playWord)}
        {renderWordPressable('under', 'could', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('could'), playWord)}
        {renderWordPressable('could', 'walk', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('walk'), playWord)}
        {renderWordPressable('walk', 'again', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('again'), playWord)}
      </SafeAreaView>

      <SafeAreaView style={styles.bottom}>
        {renderWordPressable('again', 'soon', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('soon'), playWord)}

        <Image
          source={require('../assets/outerSpaceView/astronauts.png')}
          resizeMode="contain"
          style={styles.astronautImage}
        />

        {renderWordPressable('soon', 'people', 'Outer Space', outerSpaceStatus, navigation, styles, getImageSource('people'), playWord)}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OuterSpaceWordsView;
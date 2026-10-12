
import React, { useState, useEffect } from 'react';

import {
  ImageBackground,
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  useWindowDimensions,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import * as SecureStore from 'expo-secure-store';

import LetterButton from '../components/LetterButton';
import { useProgress } from '../components/ProgressContext';
import api from '../components/api';

// Final words and expected number of words in each batch.
const COMPLETED_BATCHES = {
  'Flying High': {
    word: 'are',
    count: 15,
    message: "You've completed words 1-15!",
  },
  'Sunny Island': {
    word: 'funny',
    count: 16,
    message: "You've completed words 16-31!",
  },
  'SpringTime Fun': {
    word: 'black',
    count: 15,
    message: "You've completed words 32-46!",
  },
  'Alien Adventures': {
    word: 'many',
    count: 15,
    message: "You've completed words 47-61!",
  },
  'Outer Space': {
    word: 'people',
    count: 15,
    message: "You've completed words 62-76!",
  },
  'Planets and Beyond': {
    word: 'give',
    count: 15,
    message: "You've completed words 77-91!",
  },
  'Diving Deep': {
    word: 'work',
    count: 9,
    message: "You've completed words 92-100!",
  },
};

const TestView = ({ navigation, route }) => {
  const { batch, activity, selectedWord } = route.params;

  const {
    height: screenHeight,
    width: screenWidth,
  } = useWindowDimensions();

  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = screenWidth / screenHeight;

  const {
    flyingHighStatus,
    sunnyIslandStatus,
    springtimeFunStatus,
    alienAdventureStatus,
    outerSpaceStatus,
    planetsAndBeyondStatus,
    divingDeepStatus,

    checkFlyingHigh,
    checkSunnyIsland,
    checkSpringtimeFun,
    checkAlienAdventure,
    checkOuterSpace,
    checkPlanetsAndBeyond,
    checkDivingDeep,
  } = useProgress();

  const [inputValue, setInputValue] = useState('');
  const [showCorrectWord, setShowCorrectWord] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState(
    require('../assets/testViews/blankTestBackground.png')
  );

  const [fontSize, setFontSize] = useState(55);

  const row1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const row2 = ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'];
  const row3 = ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // ------------------------------------------------
  // ORIENTATION
  // ------------------------------------------------

  useEffect(() => {
    const updateOrientationStyles = async () => {
      try {
        const orientation =
          await ScreenOrientation.getOrientationAsync();

        if (
          orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientation ===
            ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setFontSize(aspectRatio > 1.7 ? 55 : 80);
        } else {
          setFontSize(55);
        }

        setBackgroundImage(
          require('../assets/testViews/blankTestBackground.png')
        );
      } catch (error) {
        console.error('Orientation error:', error);
      }
    };

    updateOrientationStyles();

    const subscription =
      ScreenOrientation.addOrientationChangeListener(
        updateOrientationStyles
      );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(
        subscription
      );
    };
  }, [aspectRatio]);

  // ------------------------------------------------
  // KEYBOARD
  // ------------------------------------------------

  const handleLetterPress = (letter) => {
    if (isSubmitting || showCorrectWord) return;

    setInputValue((previous) => previous + letter);
  };

  const handleBackspacePress = () => {
    if (isSubmitting || showCorrectWord) return;

    setInputValue((previous) => previous.slice(0, -1));
  };

  // ------------------------------------------------
  // BATCH PROGRESS
  // ------------------------------------------------

  const getBatchStatus = () => {
    const batchStatuses = {
      'Flying High': flyingHighStatus,
      'Sunny Island': sunnyIslandStatus,
      'SpringTime Fun': springtimeFunStatus,
      'Alien Adventures': alienAdventureStatus,
      'Outer Space': outerSpaceStatus,
      'Planets and Beyond': planetsAndBeyondStatus,
      'Diving Deep': divingDeepStatus,
    };

    return batchStatuses[batch];
  };

  // ------------------------------------------------
  // CHECK IF INDIVIDUAL WORD IS COMPLETED
  // ------------------------------------------------

  const isWordCompleted = () => {
    const status = getBatchStatus();

    if (!status) return false;

    const normalizedWord = selectedWord.trim().toLowerCase();

    // Find the individual word in the progress data.
    const wordStatus =
      status[selectedWord] ||
      status[normalizedWord];

    return wordStatus?.test_correct === true;
  };

  // ------------------------------------------------
  // REFRESH PROGRESS
  // ------------------------------------------------

  const refreshProgress = async () => {
    switch (batch) {
      case 'Flying High':
        await checkFlyingHigh('Flying High');
        break;

      case 'Sunny Island':
        await checkSunnyIsland('Sunny Island');
        break;

      case 'SpringTime Fun':
        await checkSpringTimeFun('SpringTime Fun');
        break;

      case 'Alien Adventures':
        await checkAlienAdventure('Alien Adventures');
        break;

      case 'Outer Space':
        await checkOuterSpace('Outer Space');
        break;

      case 'Planets and Beyond':
        await checkPlanetsAndBeyond('Planets and Beyond');
        break;

      case 'Diving Deep':
        await checkDivingDeep('Diving Deep');
        break;

      default:
        console.warn('Unknown batch:', batch);
    }
  };

  // ------------------------------------------------
  // NAVIGATION
  // ------------------------------------------------

  const goToWordBatches = () => {
    navigation.navigate('Word Batches', {
      selectedWord,
      batch,
      activity,
    });
  };

  const goToBatch = () => {
    navigation.navigate(batch, {
      selectedWord,
      batch,
      activity,
    });
  };

  const retryWord = () => {
    setInputValue('');
    setShowCorrectWord(false);
  };

  // ------------------------------------------------
  // CHECK WORD
  // ------------------------------------------------

  const checkWord = async () => {
    if (isSubmitting) return;

    const isCorrect =
      inputValue.trim().toLowerCase() ===
      selectedWord.trim().toLowerCase();

    setIsSubmitting(true);

    try {
      // --------------------------------------------
      // CORRECT ANSWER
      // --------------------------------------------

      if (isCorrect) {
        const accessToken =
          await SecureStore.getItemAsync('access_token');

        if (!accessToken) {
          throw new Error('No access token found');
        }

        await api.post(
          '/mark-word-correct/',
          {
            word: selectedWord,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setShowCorrectWord(false);

        // Refresh saved progress.
        await refreshProgress();

        const completedBatch = COMPLETED_BATCHES[batch];

        const isFinalWord =
          completedBatch &&
          selectedWord.toLowerCase() === completedBatch.word;

        if (isFinalWord) {
          Alert.alert(
            'Congratulations!',
            completedBatch.message,
            [
              {
                text: 'Continue',
                onPress: goToWordBatches,
              },
            ],
            { cancelable: false }
          );

          return;
        }

        // Normal correct answer.
        Alert.alert(
          'Correct!',
          "You've typed the correct word.",
          [
            {
              text: 'Continue',
              onPress: goToBatch,
            },
          ],
          { cancelable: false }
        );

        return;
      }

      // --------------------------------------------
      // INCORRECT ANSWER
      // --------------------------------------------

      const alreadyCompleted = isWordCompleted();

      // --------------------------------------------
      // COMPLETED WORD: PRACTICE MODE
      // --------------------------------------------

      if (alreadyCompleted) {
        // Do not mark the word incorrect.
        // Do not erase previous progress.
        // Do not make the student repeat activities.

        Alert.alert(
          'Oops! Try again!',
          '',
          [
            {
              text: 'OK',
              onPress: retryWord,
            },
          ],
          { cancelable: false }
        );

        return;
      }

      // --------------------------------------------
      // WORD NOT YET COMPLETED
      // --------------------------------------------

      const accessToken =
        await SecureStore.getItemAsync('access_token');

      if (!accessToken) {
        throw new Error('No access token found');
      }

      // Mark the word incorrect only if the
      // student has not previously completed it.
      await api.post(
        '/mark-word-incorrect/',
        {
          word: selectedWord,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      await refreshProgress();

      setShowCorrectWord(true);

      Alert.alert(
        'Oops!',
        'The typed word is incorrect. Please complete the activities for this word and try again!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );

    } catch (error) {
      console.error(
        'Error checking word:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Error',
        'Unable to save your progress. Please try again.'
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------------------------------
  // STYLES
  // ------------------------------------------------

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      width: '100%',
      height: '100%',
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
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputArea: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: isLandscape
        ? aspectRatio > 1.7
          ? '0%'
          : '5%'
        : '5%',
    },

    row1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: isLandscape
        ? 'center'
        : 'flex-end',
    },

    row2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingLeft: '2%',
      paddingRight: '2%',
    },

    row3: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: isLandscape
        ? 'center'
        : 'flex-start',
      paddingLeft: '6%',
      paddingRight: '6%',
    },

    textBox: {
      width: isLandscape ? '70%' : '60%',
      height: isLandscape ? '100%' : '90%',
      fontSize,
      textAlign: 'center',
      fontWeight: isLandscape ? '800' : 'normal',
      color: '#1a1a1a',
    },

    correctWord: {
      color: 'red',
      fontSize: isLandscape
        ? aspectRatio > 1.7
          ? 50
          : 100
        : 100,
      alignSelf: 'center',
      padding: 10,
    },

    checkButton: {
      backgroundColor: '#7ed957',
      padding: isLandscape
        ? aspectRatio > 1.7
          ? 5
          : 10
        : 10,
      height: isLandscape
        ? aspectRatio > 1.7
          ? '80%'
          : '45%'
        : '35%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 2,
      marginBottom: isLandscape
        ? aspectRatio > 1.7
          ? '1%'
          : '4%'
        : '6%',
      marginLeft: isLandscape
        ? aspectRatio > 1.7
          ? '0%'
          : '4%'
        : '4%',
    },

    checkButtonText: {
      fontSize: 20,
      fontWeight: '800',
      color: '#1a1a1a',
    },

    instructions: {
      width: '12%',
      height: isLandscape
        ? aspectRatio > 1.7
          ? '80%'
          : '60%'
        : '30%',
      marginRight: isLandscape ? '0%' : '4%',
      marginBottom: isLandscape ? '1%' : '6%',
    },
  });

  // ------------------------------------------------
  // LETTER BUTTON
  // ------------------------------------------------

  const renderLetter = (letter) => (
    <LetterButton
      key={letter}
      letter={letter}
      onPress={() => handleLetterPress(letter)}
      style={{
        backgroundColor: '#0cc3fb',
        width: isLandscape
          ? aspectRatio > 1.7
            ? 50
            : 75
          : 65,
        height: isLandscape
          ? aspectRatio > 1.7
            ? 50
            : 75
          : 65,
      }}
      textStyle={{
        fontSize: isLandscape
          ? aspectRatio > 1.7
            ? 35
            : 45
          : 45,
        fontWeight: '800',
        color: '#1a1a1a',
      }}
    />
  );

  const renderBackspace = () => (
    <LetterButton
      letter="⌫"
      onPress={handleBackspacePress}
      style={{
        backgroundColor: 'red',
        width: isLandscape
          ? aspectRatio > 1.7
            ? 50
            : 75
          : 65,
        height: isLandscape
          ? aspectRatio > 1.7
            ? 50
            : 75
          : 65,
      }}
      textStyle={{
        fontSize: isLandscape
          ? aspectRatio > 1.7
            ? 35
            : 45
          : 45,
      }}
    />
  );

  // ------------------------------------------------
  // SCREEN
  // ------------------------------------------------

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>

        {/* Display correct word when incorrect */}
        <View style={styles.top}>
          {showCorrectWord && (
            <Text style={styles.correctWord}>
              {selectedWord.toLowerCase()}
            </Text>
          )}
        </View>

        {/* Word input */}
        <View style={styles.inputArea}>

          {!showCorrectWord && (
            <Pressable
              onPress={checkWord}
              disabled={isSubmitting}
              style={[
                styles.checkButton,
                {
                  opacity: isSubmitting ? 0.5 : 1,
                },
              ]}
            >
              <Text style={styles.checkButtonText}>
                {isSubmitting
                  ? 'Saving...'
                  : 'Check Word'}
              </Text>
            </Pressable>
          )}

          <TextInput
            style={styles.textBox}
            placeholder="Type Word Here"
            value={inputValue}
            showSoftInputOnFocus={false}
            autoCorrect={false}
            editable={false}
          />

          {!showCorrectWord && (
            <Pressable
              onPress={() =>
                console.log('Instructions Button Pressed')
              }
              style={styles.instructions}
            >
              <Image
                source={require('../assets/instructionsVideo.png')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="contain"
              />
            </Pressable>
          )}

        </View>

        {/* Keyboard Row 1 */}
        <View style={styles.row1}>
          {row1.map(renderLetter)}
          {renderBackspace()}
        </View>

        {/* Keyboard Row 2 */}
        <View style={styles.row2}>
          {row2.map(renderLetter)}
        </View>

        {/* Keyboard Row 3 */}
        <View style={styles.row3}>
          {row3.map(renderLetter)}
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default TestView;

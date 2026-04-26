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
  ActivityIndicator,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SecureStore from 'expo-secure-store';
import LetterButton from '../components/LetterButton';
import { useProgress } from '../components/ProgressContext';
import api from '../components/api';

const TestView = ({ navigation, route }) => {
  const { batch, activity, selectedWord, email } = route.params || {};

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

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

  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = screenWidth / screenHeight;

  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    require('../assets/testViews/blankTestBackground.png')
  );
  const [inputValue, setInputValue] = useState('');
  const [showCorrectWord, setShowCorrectWord] = useState(false);
  const [orientationStyles, setOrientationStyles] = useState(null);
  const [fontSize, setFontSize] = useState(30);

  const row1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const row2 = ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'];
  const row3 = ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const styles = StyleSheet.create({
    landscape: {
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
        paddingBottom: aspectRatio > 1.7 ? '0%' : '5%',
      },
      row1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        alignItems: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
      },
      textBox: {
        width: aspectRatio > 1.7 ? '70%' : '70%',
        height: '100%',
        fontSize: 100,
        textAlign: 'center',
      },
      correctWord: {
        color: 'red',
        fontSize: aspectRatio > 1.7 ? 50 : 100,
        alignSelf: 'center',
        padding: 10,
      },
      checkButton: {
        backgroundColor: '#7ed957',
        padding: aspectRatio > 1.7 ? 5 : 10,
        height: aspectRatio > 1.7 ? '80%' : '45%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: aspectRatio > 1.7 ? '1%' : '4%',
        marginLeft: aspectRatio > 1.7 ? '0%' : '4%',
      },
      checkButtonText: {
        color: 'black',
        fontSize: 20,
      },
      sound: {
        width: aspectRatio > 1.7 ? '10%' : '10%',
        height: aspectRatio > 1.7 ? '80%' : '60%',
        marginRight: aspectRatio > 1.7 ? '0%' : '4%',
        marginBottom: '1%',
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
        zIndex: 10,
      },
      loadingText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
    },

    portrait: {
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
        paddingBottom: '5%',
      },
      row1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
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
        alignItems: 'flex-start',
        paddingLeft: '6%',
        paddingRight: '6%',
      },
      textBox: {
        width: '60%',
        height: '90%',
        fontSize: 100,
        textAlign: 'center',
      },
      correctWord: {
        color: 'red',
        fontSize: 100,
        alignSelf: 'center',
        padding: 10,
      },
      checkButton: {
        backgroundColor: '#7ed957',
        padding: 10,
        margin: 10,
        height: '35%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: '6%',
      },
      checkButtonText: {
        color: 'black',
        fontSize: 20,
      },
      sound: {
        width: '10%',
        height: '30%',
        marginBottom: '6%',
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
        zIndex: 10,
      },
      loadingText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
    },
  });

  useEffect(() => {
    const updateOrientationStyles = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();

      if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setOrientationStyles(styles.landscape);
        setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
        aspectRatio > 1.7 ? setFontSize(55) : setFontSize(80);
      } else {
        setOrientationStyles(styles.portrait);
        setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
        setFontSize(55);
      }
    };

    updateOrientationStyles();

    const subscription = ScreenOrientation.addOrientationChangeListener(() => {
      updateOrientationStyles();
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const handleLetterPress = (letter) => {
    if (!isLoading) {
      setInputValue(inputValue + letter);
    }
  };

  const handleBackspacePress = () => {
    if (!isLoading) {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const refreshBatchProgress = async () => {
    if (batch == 'Flying High') {
      await checkFlyingHigh('Flying High');
    } else if (batch == 'Sunny Island') {
      await checkSunnyIsland('Sunny Island');
    } else if (batch == 'SpringTime Fun') {
      await checkSpringtimeFun('SpringTime Fun');
    } else if (batch == 'Alien Adventures') {
      await checkAlienAdventure('Alien Adventures');
    } else if (batch == 'Outer Space') {
      await checkOuterSpace('Outer Space');
    } else if (batch == 'Planets and Beyond') {
      await checkPlanetsAndBeyond('Planets and Beyond');
    } else if (batch == 'Diving Deep') {
      await checkDivingDeep('Diving Deep');
    }
  };

  const checkWord = async () => {
    setIsLoading(true);

    try {
      if (inputValue.toLowerCase() === selectedWord.toLowerCase()) {
        const accessToken = await SecureStore.getItemAsync('access_token');

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

        if (
          !['are', 'funny', 'black', 'nine', 'many', 'people', 'give', 'work'].includes(
            selectedWord
          )
        ) {
          Alert.alert("Correct!", "You've typed the correct word.");
        }

        setShowCorrectWord(false);

        await refreshBatchProgress();

        if (selectedWord == 'are' && flyingHighStatus['are']?.test_correct === true) {
          Alert.alert("Congratulations!", "You've completed words 1-15!");
          navigation.navigate('Word Batches', { email });
        } else if (
          selectedWord == 'funny' &&
          sunnyIslandStatus['funny']?.test_correct === true
        ) {
          Alert.alert("Congratulations!", "You've completed words 16-31!");
          navigation.navigate('Word Batches', { email });
        } else if (
          selectedWord == 'black' &&
          springtimeFunStatus['black']?.test_correct === true
        ) {
          Alert.alert("Congratulations!", "You've completed words 32-46!");
          navigation.navigate('Word Batches', { email });
        } else if (
          selectedWord == 'many' &&
          alienAdventureStatus['many']?.test_correct === true
        ) {
          Alert.alert("Congratulations!", "You've completed words 47-61!");
          navigation.navigate('Word Batches', { email });
        } else if (
          selectedWord == 'give' &&
          planetsAndBeyondStatus['give']?.test_correct === true
        ) {
          Alert.alert("Congratulations!", "You've completed words 77-91!");
          navigation.navigate('Word Batches', { email });
        } else if (
          selectedWord == 'people' &&
          outerSpaceStatus['people']?.test_correct === true
        ) {
          Alert.alert("Congratulations!", "You've completed words 62-76!");
          navigation.navigate('Word Batches', { email });
        } else if (
          selectedWord == 'work' &&
          divingDeepStatus['work']?.test_correct === true
        ) {
          Alert.alert("Congratulations!", "You've completed words 92-100!");
          navigation.navigate('Word Batches', { email });
        } else {
          navigation.navigate(batch, {
            selectedWord,
            batch,
            activity,
            email,
          });
        }
      } else {
        setShowCorrectWord(true);

        await refreshBatchProgress();

        const accessToken = await SecureStore.getItemAsync('access_token');

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

        Alert.alert(
          "Oops!",
          "The typed word is incorrect. Please complete the activities for this word and try again!",
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error checking word:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!orientationStyles) {
    return null;
  }

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={orientationStyles.background}
    >
      {isLandscape ? (
        <>
          <SafeAreaView style={orientationStyles.safeArea}>
            <View style={orientationStyles.top}>
              {showCorrectWord && (
                <Text style={orientationStyles.correctWord}>
                  {selectedWord.toLowerCase()}
                </Text>
              )}
            </View>

            <View style={orientationStyles.inputArea}>
              {!showCorrectWord && (
                <Pressable
                  onPress={checkWord}
                  disabled={isLoading}
                  style={orientationStyles.checkButton}
                >
                  <Text style={orientationStyles.checkButtonText}>
                    {isLoading ? 'Checking...' : 'Check Word'}
                  </Text>
                </Pressable>
              )}

              <TextInput
                style={[orientationStyles.textBox, { fontSize: fontSize }]}
                placeholder="Type Word Here"
                value={inputValue}
                showSoftInputOnFocus={false}
                autoCorrect={false}
                editable={!isLoading}
              />

              {!showCorrectWord && (
                <Pressable
                  onPress={() => console.log('Sound Button Pressed')}
                  disabled={isLoading}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      width: '100%',
                      height: '100%',
                    },
                    orientationStyles.sound,
                  ]}
                >
                  <Image
                    source={require('../assets/testViews/sound.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Pressable>
              )}
            </View>

            <View style={orientationStyles.row1}>
              {row1.map((letter) => (
                <LetterButton
                  key={letter}
                  letter={letter}
                  onPress={() => handleLetterPress(letter)}
                  style={{
                    backgroundColor: '#0cc3fb',
                    width: aspectRatio > 1.7 ? 50 : 75,
                    height: aspectRatio > 1.7 ? 50 : 75,
                  }}
                  textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                />
              ))}

              <LetterButton
                letter="⌫"
                onPress={handleBackspacePress}
                style={{
                  backgroundColor: 'red',
                  width: aspectRatio > 1.7 ? 50 : 75,
                  height: aspectRatio > 1.7 ? 50 : 75,
                }}
                textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
              />
            </View>

            <View style={orientationStyles.row2}>
              {row2.map((letter) => (
                <LetterButton
                  key={letter}
                  letter={letter}
                  onPress={() => handleLetterPress(letter)}
                  style={{
                    backgroundColor: '#0cc3fb',
                    width: aspectRatio > 1.7 ? 50 : 75,
                    height: aspectRatio > 1.7 ? 50 : 75,
                  }}
                  textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                />
              ))}
            </View>

            <View style={orientationStyles.row3}>
              {row3.map((letter) => (
                <LetterButton
                  key={letter}
                  letter={letter}
                  onPress={() => handleLetterPress(letter)}
                  style={{
                    backgroundColor: '#0cc3fb',
                    width: aspectRatio > 1.7 ? 50 : 75,
                    height: aspectRatio > 1.7 ? 50 : 75,
                  }}
                  textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                />
              ))}
            </View>
          </SafeAreaView>
        </>
      ) : (
        <>
          <SafeAreaView style={orientationStyles.safeArea}>
            <View style={orientationStyles.top}>
              {showCorrectWord && (
                <Text style={orientationStyles.correctWord}>
                  {selectedWord.toLowerCase()}
                </Text>
              )}
            </View>

            <View style={orientationStyles.inputArea}>
              {!showCorrectWord && (
                <Pressable
                  onPress={checkWord}
                  disabled={isLoading}
                  style={orientationStyles.checkButton}
                >
                  <Text style={orientationStyles.checkButtonText}>
                    {isLoading ? 'Checking...' : 'Check Word'}
                  </Text>
                </Pressable>
              )}

              <TextInput
                style={[orientationStyles.textBox, { fontSize: fontSize }]}
                placeholder="Type Word Here"
                value={inputValue}
                showSoftInputOnFocus={false}
                autoCorrect={false}
                editable={!isLoading}
              />

              {!showCorrectWord && (
                <Pressable
                  onPress={() => console.log('Sound Button Pressed')}
                  disabled={isLoading}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      width: '100%',
                      height: '100%',
                    },
                    orientationStyles.sound,
                  ]}
                >
                  <Image
                    source={require('../assets/testViews/sound.png')}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Pressable>
              )}
            </View>

            <View style={orientationStyles.row1}>
              {row1.map((letter) => (
                <LetterButton
                  key={letter}
                  letter={letter}
                  onPress={() => handleLetterPress(letter)}
                  style={{
                    backgroundColor: '#0cc3fb',
                    width: aspectRatio > 1.7 ? 50 : 65,
                    height: aspectRatio > 1.7 ? 50 : 65,
                  }}
                  textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                />
              ))}

              <LetterButton
                letter="⌫"
                onPress={handleBackspacePress}
                style={{
                  backgroundColor: 'red',
                  width: aspectRatio > 1.7 ? 50 : 65,
                  height: aspectRatio > 1.7 ? 50 : 65,
                }}
                textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
              />
            </View>

            <View style={orientationStyles.row2}>
              {row2.map((letter) => (
                <LetterButton
                  key={letter}
                  letter={letter}
                  onPress={() => handleLetterPress(letter)}
                  style={{
                    backgroundColor: '#0cc3fb',
                    width: aspectRatio > 1.7 ? 50 : 65,
                    height: aspectRatio > 1.7 ? 50 : 65,
                  }}
                  textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                />
              ))}
            </View>

            <View style={orientationStyles.row3}>
              {row3.map((letter) => (
                <LetterButton
                  key={letter}
                  letter={letter}
                  onPress={() => handleLetterPress(letter)}
                  style={{
                    backgroundColor: '#0cc3fb',
                    width: aspectRatio > 1.7 ? 50 : 65,
                    height: aspectRatio > 1.7 ? 50 : 65,
                  }}
                  textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                />
              ))}
            </View>
          </SafeAreaView>
        </>
      )}

      {isLoading && (
        <View style={orientationStyles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={orientationStyles.loadingText}>Checking Word...</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default TestView;
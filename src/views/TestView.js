import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Text, StyleSheet, Alert, useWindowDimensions, Pressable, Image, SafeAreaView} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; 
import LetterButton from '../components/LetterButton'; // Adjust the path as necessary
import { useProgress } from '../components/ProgressContext';



const TestView = ({ navigation, route }) => {

    const { batch, activity, selectedWord } = route.params;
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const { flyingHighStatus, sunnyIslandStatus, springtimeFunStatus, alienAdventureStatus, 
            outerSpaceStatus, planetsAndBeyondStatus, divingDeepStatus } = useProgress();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const styles = StyleSheet.create({

      // Landscape styles
      landscape: {
          safeArea: {
            flex: 1,
            width: '100%',
            height: '100%'
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
                  justifyContent: 'center', // This helps the incorrect and correct words line up when a word is spelled incorrectly
                  paddingBottom: aspectRatio > 1.7 ? '0%': '5%',
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
              alignSelf: 'center', // Center it if the layout allows
              padding: 10, // Add some padding for visual spacing
  
          },
            checkButton: {
              backgroundColor: '#7ed957', // Example green color
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
              marginRight: aspectRatio > 1.7 ? '0%' :'4%',
              marginBottom: '1%',
          },
      },
      // Portrait styles
      portrait: {
          safeArea: {
            flex: 1,
            width: '100%',
            height: '100%'
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
          alignSelf: 'center', // Center it if the layout allows
          padding: 10, // Add some padding for visual spacing
        },
        checkButton: {
          backgroundColor: '#7ed957', // Example green color
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
          height:'30%',
          marginBottom: '6%',
        },
      }
      });


    const [backgroundImage, setBackgroundImage] = useState(require('../assets/testViews/blankTestBackground.png'));
    const [inputValue, setInputValue] = useState('');
    const [showCorrectWord, setShowCorrectWord] = useState(false);
    const { checkFlyingHigh, checkSunnyIsland, checkSpringtimeFun, checkAlienAdventure, 
      checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep } = useProgress();
    const row1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const row2 = ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
    const row3 = ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [fontSize, setFontSize] = useState(30);

    

    useEffect(() => {
    // Function to update styles and font size based on orientation
    const updateOrientationStyles = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setOrientationStyles(styles.landscape);
        setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
        aspectRatio > 1.7 ? setFontSize(55) : setFontSize(80); // Adjust font size for landscape
      } else {
        setOrientationStyles(styles.portrait);
        setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
        setFontSize(55); // Adjust font size for portrait
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
    setInputValue(inputValue + letter);
  };

  const handleBackspacePress = () => {
    setInputValue(inputValue.slice(0, -1));
  };

  const checkWord = async () => {
    if (inputValue.toLowerCase() === selectedWord.toLowerCase()) {

      // If the word matches, mark it as correct in the backend
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        
        await axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/mark-word-correct/', {
            word: selectedWord,
            // Include any other necessary parameters your backend requires
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });


        if (!['are', 'funny', 'black', 'nine', 'many', 'soon', 'give', 'work'].includes(selectedWord)) {
          Alert.alert("Correct!", "You've typed the correct word.");
        }

        setShowCorrectWord(false); // No need to show the correct word if the input is correct
        if (batch == 'Flying High') {
          await checkFlyingHigh('Flying High');

          if (selectedWord == 'are' && flyingHighStatus['are']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 1-15!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'Flying High' });
            return;
          }
        } else if (batch == 'Sunny Island') {
          await checkSunnyIsland('Sunny Island');

          if (selectedWord == 'funny' && sunnyIslandStatus['funny']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 16-31!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'Sunny Island' });
            return;
          }   
        } else if (batch == 'SpringTime Fun') {
          await checkSpringtimeFun('SpringTime Fun');

          if (selectedWord == 'black' && springtimeFunStatus['black']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 32-46!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'SpringTime Fun' });
            return;
          }
        } else if (batch == 'Alien Adventures') {
          await checkAlienAdventure('Alien Adventures');
          
          if (selectedWord == 'many' && alienAdventureStatus['many']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 47-61!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'Alien Adventures' });
            return;
          }
        } else if (batch == 'Outer Space') {
          await checkOuterSpace('Outer Space');
          
          if (selectedWord == 'soon' && outerSpaceStatus['soon']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 62-76!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'Outer Space' });
            return;
          }
        } else if (batch == 'Planets and Beyond') {
          await checkPlanetsAndBeyond('Planets and Beyond');
          if (selectedWord == 'give' && planetsAndBeyondStatus['give']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 77-91!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'Planets and Beyond' });
            return;
          }
        } else if (batch == 'Diving Deep') {
          await checkDivingDeep('Diving Deep');
          if (selectedWord == 'work' && divingDeepStatus['work']?.test_correct === true) {
            Alert.alert("Congratulations!", "You've completed words 92-100!");
            navigation.navigate('Word Batches', { selectedWord: selectedWord, batch: 'Diving Deep' });
            return;
          }
        }

        navigation.navigate(batch, { selectedWord: selectedWord, batch: batch, activity: activity });
    } catch (error){
        
    }

    } else {

      setShowCorrectWord(true); // Show the correct word

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
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        console.log("Retrieved access token:", accessToken);
        
        await axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/mark-word-incorrect/', {
            word: selectedWord,
            // Include any other necessary parameters your backend requires
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

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
        
        // If the word does not match
        Alert.alert(
          "Oops!", 
          "The typed word is incorrect. Please complete the activities for this word and try again!",
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ],
          { cancelable: false } // This prevents the alert from being dismissed by tapping outside of it
        );
      } catch (error){
        console.error('Error marking word as correct:', error);}
    
      }
};



    return (

        
          
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={orientationStyles.background}
            >

              

              {isLandscape ? (
                  <>

                  {/* Start of Landscape Views */}

                  
                  
                  <SafeAreaView style={orientationStyles.safeArea}>

                    <View style={orientationStyles.top}>
                          

                      {/* Conditionally show the correct word if needed */}
                      {showCorrectWord && (
                          <Text style={orientationStyles.correctWord}>
                              {selectedWord.toLowerCase()}
                          </Text>
                      )}
                    
                    </View>
                    
                    <View style={orientationStyles.inputArea}>
                    
                        {/* Check word button */}
                      {!showCorrectWord && (<Pressable
                          onPress={checkWord}
                          style={orientationStyles.checkButton}
                      >
                          <Text style={orientationStyles.checkButtonText}>Check Word</Text>

                      </Pressable>)}


                      {/* Text input for the word */}
                      <TextInput
                          style={[orientationStyles.textBox, { fontSize: fontSize }]}
                          placeholder="Type Word Here"
                          value={inputValue}
                          showSoftInputOnFocus={false}
                          autoCorrect={false}
                      />

                      {/* Sound Button */}
                      {!showCorrectWord && (<Pressable
                          onPress={() => console.log('Sound Button Pressed')}
                          style={({ pressed }) => [
                            {
                              opacity: pressed ? 0.5 : 1, // Change opacity when pressed
                              width: '100%',
                              height: '100%',
                              // Any other styles you need
                            },
                            orientationStyles.sound
                          ]}
                      >
                          <Image source={require('../assets/testViews/sound.png')} style={{ width: '100%', height: '100%' }} />

                      </Pressable>)}

                    </View>


                    {/* Row 1 of alphabet letters */}
                    <View style={orientationStyles.row1}>
                      
                      {row1.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb', 
                          width: aspectRatio > 1.7 ? 50 : 75, 
                          height: aspectRatio > 1.7 ? 50 : 75}} 
                          textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                        
                        />
                      ))}

                      <LetterButton
                        letter="⌫" // Using a common symbol for backspace
                        onPress={handleBackspacePress}
                        style={{ backgroundColor: 'red',
                        width: aspectRatio > 1.7 ? 50 : 75, 
                        height: aspectRatio > 1.7 ? 50 : 75}}
                        textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                      />

                    </View>


                    {/* Row 2 of alphabet letters */}
                    <View style={orientationStyles.row2}>

                    {row2.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb', 
                          width: aspectRatio > 1.7 ? 50 : 75, 
                          height: aspectRatio > 1.7 ? 50 : 75}} // Example of passing custom style
                          textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                        />
                      ))}

                    </View>
                    
                    {/* Row 3 of alphabet letters */}
                    <View style={orientationStyles.row3}>

                    {row3.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb', 
                          width: aspectRatio > 1.7 ? 50 : 75, 
                          height: aspectRatio > 1.7 ? 50 : 75}} // Example of passing custom style
                          textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                        />
                      ))}

                    </View>
                  </SafeAreaView>

                  </>) : (
                          <>

                          {/* Start of Portrait Views */}

                          <SafeAreaView style={orientationStyles.safeArea}>

                            <View style={orientationStyles.top}>
                          

                              {/* Conditionally show the correct word if needed */}
                              {showCorrectWord && (
                                  <Text style={orientationStyles.correctWord}>
                                      {selectedWord.toLowerCase()}
                                  </Text>
                              )}
                            
                            </View>
                            <View style={orientationStyles.inputArea}>
                            
                                {/* Check word button */}
                              {!showCorrectWord && (<Pressable
                                  onPress={checkWord}
                                  style={orientationStyles.checkButton}
                              >
                                  <Text style={orientationStyles.checkButtonText}>Check Word</Text>

                              </Pressable>)}

                              <TextInput
                                  style={[orientationStyles.textBox, { fontSize: fontSize }]}
                                  placeholder="Type Word Here"
                                  value={inputValue}
                                  showSoftInputOnFocus={false}
                                  autoCorrect={false}
                              />

                              {/* Sound Button */}
                              {!showCorrectWord && (<Pressable
                                  onPress={() => console.log('Sound Button Pressed')}
                                  style={({ pressed }) => [
                                    {
                                      opacity: pressed ? 0.5 : 1, // Change opacity when pressed
                                      width: '100%',
                                      height: '100%',
                                      // Any other styles you need
                                    },
                                    orientationStyles.sound
                                  ]}
                              >
                                  <Image source={require('../assets/testViews/sound.png')} style={{ width: '100%', height: '100%' }} />

                              </Pressable>)}

                            </View>

                    {/* Row 1 of alphabet letters */}
                    <View style={orientationStyles.row1}>
                      
                      {row1.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb', 
                          width: aspectRatio > 1.7 ? 50 : 65, 
                          height: aspectRatio > 1.7 ? 50 : 65}} 
                          textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                        
                        />
                      ))}

                      <LetterButton
                        letter="⌫" // Using a common symbol for backspace
                        onPress={handleBackspacePress}
                        style={{ backgroundColor: 'red',
                        width: aspectRatio > 1.7 ? 50 : 65, 
                        height: aspectRatio > 1.7 ? 50 : 65}}
                        textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                      />

                    </View>


                    {/* Row 2 of alphabet letters */}
                    <View style={orientationStyles.row2}>

                    {row2.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb', 
                          width: aspectRatio > 1.7 ? 50 : 65, 
                          height: aspectRatio > 1.7 ? 50 : 65}} // Example of passing custom style
                          textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                        />
                      ))}

                    </View>
                    
                    {/* Row 3 of alphabet letters */}
                    <View style={orientationStyles.row3}>

                    {row3.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb', 
                          width: aspectRatio > 1.7 ? 50 : 65, 
                          height: aspectRatio > 1.7 ? 50 : 65}} // Example of passing custom style
                          textStyle={{ fontSize: aspectRatio > 1.7 ? 35 : 45 }}
                        />
                      ))}

                    </View>
                  </SafeAreaView>
                        

                          </>
                          
                          
                          )}
              
                  
              </ImageBackground>
            

    );
};



export default TestView;
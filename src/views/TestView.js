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
                  justifyContent: 'flex-end',
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
                width: '70%',
                height: '100%',
                fontSize: 100,
                textAlign: 'center',
                fontFamily: 'Futura',

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
              margin: aspectRatio > 1.7 ? 0 : 20,
              height: aspectRatio > 1.7 ? '80%' : '45%',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'black',
              borderWidth: 2,
              marginBottom: aspectRatio > 1.7 ? '1%' : '4%',
          },
          checkButtonText: {
              color: 'black',
              fontSize: 20,
          },
          sound: {
              width: aspectRatio > 1.7 ? '10%' : '20%',
              height: aspectRatio > 1.7 ? '80%' : '80%',
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
            justifyContent: 'flex-end',
            paddingBottom: '5%',
            paddingRight: '15%',
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
          width: '75%',
          height: '90%',
          fontSize: 100,
          textAlign: 'center',
          fontFamily: 'Futura',

      
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
          marginBottom: '7%',
        },
        checkButtonText: {
          color: 'black',
          fontSize: 20,
        },
      }
      });


    const [backgroundImage, setBackgroundImage] = useState(require('../assets/testViews/blankTestBackground.png'));
    const [inputValue, setInputValue] = useState('');
    const [showCorrectWord, setShowCorrectWord] = useState(false);
    const { checkFlyingHigh } = useProgress();
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
        setFontSize(65); // Adjust font size for portrait
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
        console.log("Retrieved access token:", accessToken);
        
        await axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/mark-word-correct/', {
            word: selectedWord,
            // Include any other necessary parameters your backend requires
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // If the word matches
        Alert.alert("Correct!", "You've typed the correct word.");
        setShowCorrectWord(false); // No need to show the correct word if the input is correct
        await checkFlyingHigh('Flying High');
        navigation.navigate(batch, { selectedWord: selectedWord, batch: batch, activity: activity });
    } catch (error){
        console.error('Error marking word as correct:', error);}
    
    } else {
        // If the word does not match
        Alert.alert(
          "Oops!", 
          "The typed word is incorrect. Please complete the activities for this word and try again!",
          [
            { text: "OK", onPress: () => navigation.goBack() }
          ],
          { cancelable: false } // This prevents the alert from being dismissed by tapping outside of it
        );
        setShowCorrectWord(true); // Show the correct word
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
                      <Pressable
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

                      </Pressable>

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

                          </View>

                          {/* Row 1 of alphabet letters */}
                    <View style={orientationStyles.row1}>
                      
                      {row1.map((letter) => (
                        <LetterButton
                          key={letter} // Ensure each child in a list has a unique "key" prop
                          letter={letter}
                          onPress={() => handleLetterPress(letter)}
                          style={{ backgroundColor: '#0cc3fb' }} // Example of passing custom style
                        />
                      ))}

                      <LetterButton
                        letter="⌫" // Using a common symbol for backspace
                        onPress={handleBackspacePress}
                        style={{ backgroundColor: 'red' }} // Example of passing custom style for the backspace button
                      />

                    </View>


                    {/* Row 2 of alphabet letters */}
                    <View style={orientationStyles.row2}>

                      {row2.map((letter) => (
                          <LetterButton
                            key={letter} // Ensure each child in a list has a unique "key" prop
                            letter={letter}
                            onPress={() => handleLetterPress(letter)}
                            style={{ backgroundColor: '#0cc3fb' }} // Example of passing custom style
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
                            style={{ backgroundColor: '#0cc3fb' }} // Example of passing custom style
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
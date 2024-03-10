import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Text, StyleSheet, Alert, useWindowDimensions, Pressable, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import LetterButton from '../components/LetterButton'; // Adjust the path as necessary



const TestView = ({ navigation, route }) => {

    const { batch, activity, selectedWord } = route.params;
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/testViews/blankTestBackground.png'));
    const [fontSize, setFontSize] = useState(30);
    const [inputValue, setInputValue] = useState('');
    const [showCorrectWord, setShowCorrectWord] = useState(false);
    const row1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const row2 = ['j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r']
    const row3 = ['s', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    useEffect(() => {
    // Function to update styles and font size based on orientation
    const updateOrientationStyles = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setOrientationStyles(styles.landscape);
        setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
        setFontSize(80); // Adjust font size for landscape
      } else {
        setOrientationStyles(styles.portrait);
        setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
        setFontSize(30); // Adjust font size for portrait
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

  const checkWord = () => {
    if (inputValue.toLowerCase() === selectedWord.toLowerCase()) {
        // If the word matches
        Alert.alert("Correct!", "You've typed the correct word.");
        setShowCorrectWord(false); // No need to show the correct word if the input is correct
        navigation.navigate(batch, { selectedWord: selectedWord, batch: batch, activity: activity });
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

                </>) : (
                        <>

                        {/* Start of Portrait Views */}

                        </>
                        
                        
                        )}
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({

// Landscape styles
landscape: {
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
            width: '80%',
            height: '100%',
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
          margin: 20,
          height: '45%',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 2,
          marginBottom: '4%',
      },
      checkButtonText: {
          color: 'black',
          fontSize: 20,
      },
},
// Portrait styles
portrait: {
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
        borderColor: 'black',
        borderWidth: 2,
    },
    row1: {
        flex: 1.5,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
    },
}
});

export default TestView;
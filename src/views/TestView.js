import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Text, StyleSheet, Alert, useWindowDimensions, Pressable, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import LetterButton from '../components/LetterButton'; // Adjust the path as necessary



const TestView = ({ navigation }) => {

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/testViews/blankTestBackground.png'));
    const [fontSize, setFontSize] = useState(30);
    const row1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const row2 = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
    const row3 = ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
                <TextInput
                  style={[orientationStyles.textBox, { fontSize: fontSize }]}
                  placeholder="Type Word Here"
                />

                </View>


                {/* Row 1 of alphabet letters */}
                <View style={orientationStyles.row1}>
                  
                  {row1.map((letter) => (
                    <LetterButton
                      key={letter} // Ensure each child in a list has a unique "key" prop
                      letter={letter}
                      onPress={() => console.log(`Button ${letter} pressed`)}
                      style={{ backgroundColor: 'skyblue' }} // Example of passing custom style
                    />
                  ))}

                  <LetterButton
                    letter="⌫" // Using a common symbol for backspace
                    onPress={() => console.log(`Back Button pressed`)}
                    style={{ backgroundColor: 'red' }} // Example of passing custom style for the backspace button
                  />

                </View>


                {/* Row 2 of alphabet letters */}
                <View style={orientationStyles.row2}>

                  {row2.map((letter) => (
                      <LetterButton
                        key={letter} // Ensure each child in a list has a unique "key" prop
                        letter={letter}
                        onPress={() => console.log(`Button ${letter} pressed`)}
                        style={{ backgroundColor: 'skyblue' }} // Example of passing custom style
                      />
                    ))}

                </View>
                
                {/* Row 3 of alphabet letters */}
                <View style={orientationStyles.row3}>

                  {row3.map((letter) => (
                      <LetterButton
                        key={letter} // Ensure each child in a list has a unique "key" prop
                        letter={letter}
                        onPress={() => console.log(`Button ${letter} pressed`)}
                        style={{ backgroundColor: 'skyblue' }} // Example of passing custom style
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
            flex: 3,
            alignItems: 'center',
            justifyContent: 'flex-end',
            boderColor: 'black',
            borderWidth: 2,
        },
        row1: {
            flex: 1,
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            
        },
        row2: {
          flex: 1,
          flexDirection: 'row',
          borderColor: 'black',
          borderWidth: 2,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingLeft: '2%',
          paddingRight: '2%',
      },
      row3: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: '6%',
        paddingRight: '6%',
    },
        textBox: {
            width: '80%',
            height: '40%',
            borderColor: 'black',
            borderWidth: 2,
            fontSize: 100,
            textAlign: 'center',

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
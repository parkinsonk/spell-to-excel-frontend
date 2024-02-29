import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';



const TestView = ({ navigation }) => {

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/testViews/blankTestBackground.png'));
    const [fontSize, setFontSize] = useState(30);

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

                <View style={orientationStyles.bottom}>

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
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        bottom: {
            flex: 1.5,
            width: '100%',
            height: '100%',
            flexDirection: 'row',

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
    bottom: {
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
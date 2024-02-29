import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';



const TestView = ({ navigation }) => {

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/selectWordBatchesView/batchesBackgroundLandscape.png'));

    useEffect(() => {
        // Function to update styles based on current orientation
        const updateOrientationStyles = async () => {
          const orientation = await ScreenOrientation.getOrientationAsync();
          if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            setOrientationStyles(styles.landscape);
            setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
          } else {
            setOrientationStyles(styles.portrait);
            setBackgroundImage(require('../assets/testViews/blankTestBackground.png'));
          }
        };

    
        // Initial update when component mounts
        updateOrientationStyles();
    
        // Subscribe to orientation changes
        const subscription = ScreenOrientation.addOrientationChangeListener(() => {
          updateOrientationStyles();
        });
    
        // Cleanup subscription on unmount
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

            {/* Start of Landscape Views */}

            {isLandscape ? (
                <>
                <View style={orientationStyles.top}>
                    <TextInput
            
                    placeholder="Type Word Here."

                    >
                    
                    </TextInput>

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
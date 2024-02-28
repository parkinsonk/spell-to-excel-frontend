import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';



const FlyingHighWordsView = ({ navigation, route}) => {
    
    const { selectedWord, batch } = route.params;
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/activitiesView/activitiesBackgroundLandscape.png'));

    useEffect(() => {
        // Function to update styles based on current orientation
        const updateOrientationStyles = async () => {
          const orientation = await ScreenOrientation.getOrientationAsync();
          if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            setOrientationStyles(styles.landscape);
            setBackgroundImage(require('../assets/activitiesView/activitiesBackgroundLandscape.png'));
          } else {
            setOrientationStyles(styles.portrait);
            setBackgroundImage(require('../assets/activitiesView/activitiesBackgroundLandscape.png'));
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
                style={styles.background}
                
            >

                <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} style={styles.wordsIKnowImage} />
                </TouchableOpacity>

                <View style={styles.top}>

                    <TouchableOpacity style={styles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/trace.png')} style={styles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.flashcardsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/flashcards.png')} style={styles.Image} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.testOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/test.png')} style={styles.Image} />
                    </TouchableOpacity>


                </View>
            
                
            </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wordsIKnowopacity: {
        position: 'absolute',
        top: 0.2,
        right: 0,
        zIndex: 10, 
    },
    traceOpacity: {
        width: '20%',
        height: '60%',
        marginLeft: '15%',
        marginTop: '5%',
    },
    readOpacity: {
        width: '20%',
        height: '60%',
    },
    flashcardsOpacity: {
        width: '20%',
        height: '60%',
    },
    testOpacity: {
        width: '20%',
        height: '60%',
        marginLeft: '18%',
        marginTop: '5%',
    },
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
},

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wordsIKnowopacity: {
        position: 'absolute',
        top: 0.2,
        right: 0,
        zIndex: 10, 
    },
    traceOpacity: {
        width: '20%',
        height: '60%',
        marginLeft: '15%',
        marginTop: '5%',
    },
    readOpacity: {
        width: '20%',
        height: '60%',
    },
    flashcardsOpacity: {
        width: '20%',
        height: '60%',
    },
    testOpacity: {
        width: '20%',
        height: '60%',
        marginLeft: '18%',
        marginTop: '5%',
    },
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
}
});


export default FlyingHighWordsView;
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
            setBackgroundImage(require('../assets/activitiesView/activitiesBackgroundPortrait.png'));
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

            {isLandscape ? (
                <>

                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} style={orientationStyles.wordsIKnowImage} />
                </TouchableOpacity>

                <View style={orientationStyles.top}>

                    <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/letterFriends.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'boxes', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/sounds.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                    <TouchableOpacity style={orientationStyles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/trace.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={orientationStyles.bottom}>


                    <TouchableOpacity style={orientationStyles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.flashcardsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/flashcards.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.testOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/test.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                {/* Start of Portrait Viewss*/}
                </>) : (
                        <>
                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} style={orientationStyles.wordsIKnowImage} />
                </TouchableOpacity>

                <View style={orientationStyles.top}>

                    <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/letterFriends.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'boxes', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/sounds.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={orientationStyles.middle}>

                    <TouchableOpacity style={orientationStyles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/trace.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>

                <View style={orientationStyles.bottom}>

                    <TouchableOpacity style={orientationStyles.flashcardsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/flashcards.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.testOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/test.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                </View>
                        
                        
                        </>)}
            
                
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
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    wordsIKnowopacity: {
        position: 'absolute',
        top: 0.2,
        right: 0,
        zIndex: 10, 
        
    },
    letterFriendsOpacity: {
        width: '11%',
        height: '46%',
        marginLeft: '18%',
        marginTop: '5%',
    },
    soundsOpacity: {
        marginTop: '3%',
        width: '16%',
        height: '37%',
        marginLeft: '14%',
    },
    traceOpacity: {
        width: '16%',
        height: '37%',
        marginLeft: '14%',
        marginTop: '5%',
    },
    readOpacity: {
        marginBottom: '4%',
        marginLeft: '15%',
        width: '16%',
        height: '37%',
    },
    flashcardsOpacity: {
        marginBottom: '8%',
        marginLeft: '12%',
        width: '12%',
        height: '48%',
    },
    testOpacity: {
        width: '16%',
        height: '37%',
        marginLeft: '15%',
        marginBottom: '4%',
    },
    Image: {
        height: '100%',
        width: '100%',
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
        alignItems: 'center',
    },
    middle: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    wordsIKnowopacity: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10, 
    },
    letterFriendsOpacity: {
        marginLeft: '25%',
        width: '16%',
        height: '47%',
        marginTop: '15%',
    },
    soundsOpacity: {
        marginTop: '10%',
        marginLeft: '18%',
        width: '20%',
        height: '33%',
    },
    traceOpacity: {
        width: '20%',
        height: '33%',
        marginLeft: '25%',
        marginBottom: '10%',
    },
    readOpacity: {
        marginLeft: '14%',
        width: '20%',
        height: '33%',
        marginBottom: '7%',
    },
    flashcardsOpacity: {
        marginBottom: '20%',
        marginLeft: '22%',
        width: '17%',
        height: '48%',
    },
    testOpacity: {
        width: '21%',
        height: '35%',
        marginLeft: '15%',
        marginBottom: '10%',
    },
    Image: {
        height: '100%',
        width: '100%',
    },
}
});


export default FlyingHighWordsView;
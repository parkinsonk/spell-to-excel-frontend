import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const ActivitiesView = ({ navigation, route}) => {
    
    const { selectedWord, batch } = route.params;
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

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
                top: 0,
                left: aspectRatio > 1.5 ? '80%': '70%',
                zIndex: 10, 
                width: aspectRatio > 1.5 ? '20%': '30%',
                height: aspectRatio > 1.5 ? '10%':'10%',
            },
            letterFriendsOpacity: {
                width: aspectRatio > 1.5 ? '10%': '12%',
                height: aspectRatio > 1.5 ? '65%':'51%',
                marginLeft: aspectRatio > 1.5 ? '26%':'18%',
                marginTop: aspectRatio > 1.5 ? '6%':'5%',
            },
            soundsOpacity: {
                marginTop: '3%',
                width: aspectRatio > 1.5 ? '14%':'16%',
                height: aspectRatio > 1.5 ? '50%':'37%',
                marginLeft: aspectRatio > 1.5 ? '8%':'14%',
            },
            traceOpacity: {
                width: aspectRatio > 1.5 ? '14%':'16%',
                height: aspectRatio > 1.5 ? '50%':'37%',
                marginLeft: aspectRatio > 1.5 ? '7%':'14%',
                marginTop: '5%',
            },
            readOpacity: {
                marginBottom: aspectRatio > 1.5 ? '0%':'4%',
                marginLeft: aspectRatio > 1.5 ? '24%':'15%',
                width: aspectRatio > 1.5 ? '14%':'16%',
                height: aspectRatio > 1.5 ? '50%':'37%',
                marginTop: aspectRatio > 1.5 ? '3%':'0%',
            },
            flashcardsOpacity: {
                marginBottom: aspectRatio > 1.5 ? '1%':'8%',
                marginLeft: aspectRatio > 1.5 ? '6%':'12%',
                width: aspectRatio > 1.5 ? '10%':'12%',
                height: aspectRatio > 1.5 ? '63%':'48%',
            },
            testOpacity: {
                width: aspectRatio > 1.5 ? '14%':'16%',
                height: aspectRatio > 1.5 ? '50%':'37%',
                marginLeft: aspectRatio > 1.5 ? '8%':'15%',
                marginBottom: aspectRatio > 1.5 ? '0%':'4%',
                marginTop: aspectRatio > 1.5 ? '3%':'0%',
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
                right: '0%',
                zIndex: 10, 
                width: '35%',
                height: '5%',
            },
            letterFriendsOpacity: {
                marginLeft: '25%',
                width: '16%',
                height: '48%',
                marginTop: '15%',
            },
            soundsOpacity: {
                marginTop: '15%',
                marginLeft: '19%',
                width: '17%',
                height: '48%',
            },
            traceOpacity: {
                width: '17.5%',
                height: '52%',
                marginLeft: '15%',
                marginBottom: '3%',
            },
            readOpacity: {
                marginLeft: '25%',
                width: '20%',
                height: '33%',
                marginBottom: '7%',
            },
            flashcardsOpacity: {
                marginBottom: '20%',
                marginLeft: '21.5%',
                width: '18%',
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

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/activitiesView/activitiesBackgroundLandscape.png'));
    const iphoneBackground = require('../assets/activitiesView/activitiesBackgroundIphone.png');

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
                source={aspectRatio > 1.5 ? iphoneBackground : backgroundImage}
                resizeMode="cover"
                style={orientationStyles.background}
                
            >

            {isLandscape ? (

                <>
                {/* Start of Landscape Views*/}

                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} style={orientationStyles.Image} />
                </TouchableOpacity>

                <View style={orientationStyles.top}>

                    <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/letterFriends.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'boxes', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/sounds.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                    <TouchableOpacity style={orientationStyles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/traceLandscape.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={orientationStyles.bottom}>


                    <TouchableOpacity style={orientationStyles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.flashcardsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/flashcardsLandscape.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.testOpacity} onPress={() => navigation.navigate('Test', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/test.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                {/* Start of Portrait Views*/}
                </>) : (
                        <>
                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} style={orientationStyles.Image} />
                </TouchableOpacity>

                <View style={orientationStyles.top}>

                    <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/letterFriends.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'boxes', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/soundsPortrait.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={orientationStyles.middle}>

                    <TouchableOpacity style={orientationStyles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/tracePortrait.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    


                </View>

                <View style={orientationStyles.bottom}>

                    <TouchableOpacity style={orientationStyles.flashcardsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/flashcardsPortrait.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.testOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/test.png')} style={orientationStyles.Image} />
                    </TouchableOpacity>

                </View>
                        
                        
                        </>)}
            
                
            </ImageBackground>
    );
};




export default ActivitiesView;
import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';




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
                width: aspectRatio > 1.5 ? '20%': '23%',
                height: aspectRatio > 1.5 ? '10%':'8%',
            },
            letterFriendsOpacity: {
                width: aspectRatio > 1.5 ? '12%': '17%',
                height: aspectRatio > 1.5 ? '67%':'61%',
                marginLeft: aspectRatio > 1.5 ? '26%':'13%',
                marginTop: aspectRatio > 1.5 ? '4%':'2%',
            },
            soundsOpacity: {
                marginTop: '5%',
                width: aspectRatio > 1.5 ? '14%':'22%',
                height: aspectRatio > 1.5 ? '50%':'51%',
                marginLeft: aspectRatio > 1.5 ? '6%':'11%',
            },
            traceOpacity: {
                width: aspectRatio > 1.5 ? '14%':'20%',
                height: aspectRatio > 1.5 ? '50%':'47%',
                marginLeft: aspectRatio > 1.5 ? '7%':'11%',
                marginTop: aspectRatio > 1.5 ? '7%':'12%',
            },
            readOpacity: {
                marginBottom: aspectRatio > 1.5 ? '1%':'10%',
                marginLeft: aspectRatio > 1.5 ? '25%':'15%',
                width: aspectRatio > 1.5 ? '14%':'18%',
                height: aspectRatio > 1.5 ? '50%':'42%',
            },
            flashcardsOpacity: {
                marginBottom: aspectRatio > 1.5 ? '1%':'8%',
                marginLeft: aspectRatio > 1.5 ? '6%':'12%',
                width: aspectRatio > 1.5 ? '10%':'12%',
                height: aspectRatio > 1.5 ? '63%':'48%',
            },
            testOpacity: {
                width: aspectRatio > 1.5 ? '18%':'25%',
                height: aspectRatio > 1.5 ? '55%':'49%',
                marginLeft: aspectRatio > 1.5 ? '8%':'16%',
                marginBottom: aspectRatio > 1.5 ? '3%':'12%',
            },
            Image: {
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
                marginLeft: '16%',
                width: '28%',
                height: '65%',
                marginBottom: '5%',
            },
            soundsOpacity: {
                marginTop: '5%',
                marginLeft: '17%',
                width: '25%',
                height: '68%',
            },
            traceOpacity: {
                width: '25%',
                height: '62%',
                marginLeft: '12%',
                marginBottom: '5%',
            },
            readOpacity: {
                marginLeft: '15%',
                width: '31%',
                height: '50%',
                marginTop: '3%',
            },
            flashcardsOpacity: {
                marginBottom: '20%',
                marginLeft: '21.5%',
                width: '18%',
                height: '48%',
            },
            testOpacity: {
                width: '32%',
                height: '46%',
                marginLeft: '30%',
                marginBottom: '22%',
            },
            Image: {
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
                        <Image source={require('../assets/activitiesView/letterFriendsLandscape.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'boxes', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/sounds.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>


                    <TouchableOpacity style={orientationStyles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/traceLandscape.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={orientationStyles.bottom}>


                    <TouchableOpacity style={orientationStyles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.testOpacity} onPress={() => navigation.navigate('Test', {batch: batch, activity: 'test', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/testLandscape.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                {/* Start of Portrait Views*/}
                </>) : (
                        <>
                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} resizeMode='contain' style={orientationStyles.Image} />
                </TouchableOpacity>

                <View style={orientationStyles.top}>

                    <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/letterFriendsPortrait.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'boxes', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/soundsPortrait.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>


                </View>


                <View style={orientationStyles.middle}>

                    <TouchableOpacity style={orientationStyles.readOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/read.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={orientationStyles.traceOpacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/tracePortrait.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>

                    


                </View>

                <View style={orientationStyles.bottom}>

                    <TouchableOpacity style={orientationStyles.testOpacity} onPress={() => navigation.navigate('Test', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/testPortrait.png')} resizeMode='contain' style={orientationStyles.Image} />
                    </TouchableOpacity>

                </View>
                        
                        
                        </>)}
            
                
            </ImageBackground>
    );
};




export default ActivitiesView;
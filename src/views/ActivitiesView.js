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
                justifyContent: 'center',
                alignItems: 'center',
            },
            contentContainer: {
                width: '90%',
                height: '90%',
            },
            posterBoard: {
                flex: 1,
                width: '100%',
                height: '100%',
                borderColor: 'black',
                borderWidth: 15,
                borderRadius: 30,
                flexDirection: 'column',
                
            },
            top: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
            topLeft: {
                flex: 2.5,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                borderColor: 'black',
                borderWidth: 2,
                justifyContent: 'flex-end',
            },
            topRight: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                borderColor: 'black',
                borderWidth: 2,
                justifyContent: 'flex-end',
                alignItems: 'flex-start ',
            },
            
            middle: {
                flex: 2,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 2,
                justifyContent: 'center',
            },
            bottom: {
                flex: 2,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            },
            Image: {
                width: '100%',
                height: '100%',
            },
            activityBoardImage: {
                width: '60%',
                height: '95%',
            },
            wordsIKnowImage: {
                width: '100%',
                height: '100%',
            },
            wordsIKnowopacity: {
                width: '80%',
                height: '35%',
                borderColor: 'black',
                borderWidth: 2,
            },
            letterFriendsOpacity: {
                width: '20%',
                height: '70%',
                marginRight: '5%',
                borderColor: 'black',
                borderWidth: 2,
            },
            soundsOpacity: {
                width: '20%',
                height: '70%',
                borderColor: 'black',
                borderWidth: 2,
                marginLeft: '5%',
            },
            otherOpacity: {
                width: '20%',
                height: '70%',
                borderColor: 'black',
                borderWidth: 2,
                marginLeft: '5%',
            }
        },
        
        // Portrait styles
        portrait: {
            background: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
            },
            contentContainer: {
                width: '90%',
                height: '90%',
            },
            posterBoard: {
                flex: 1,
                width: '100%',
                height: '100%',
                borderColor: 'black',
                borderWidth: 15,
                borderRadius: 30,
                flexDirection: 'column',
                
            },
            Image: {
                width: '100%',
                height: '100%',
            },
        }
        });

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);

    useEffect(() => {
        // Function to update styles based on current orientation
        const updateOrientationStyles = async () => {
          const orientation = await ScreenOrientation.getOrientationAsync();
          if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            setOrientationStyles(styles.landscape);
          } else {
            setOrientationStyles(styles.portrait);
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
                source={require('../assets/activitiesView/activitiesBackgroundLandscape.png')}
                resizeMode="cover"
                style={orientationStyles.background}
                
                
            >

            {isLandscape ? (

                <>
                {/* Start of Landscape Views*/}

                <View style={orientationStyles.contentContainer}>

                    <ImageBackground 
                        source={require('../assets/activitiesView/posterBoard.png')}
                        style={orientationStyles.posterBoard}
                        >


                        <View style={orientationStyles.top}>

                        
                            <View style={orientationStyles.topLeft}>
                                <Image source={require('../assets/activitiesView/activityBoard.png')} resizeMode='contain' style={orientationStyles.activityBoardImage} />
                            </View>

                            <View style={orientationStyles.topRight}>
                                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>
                            </View>



                        </View>

                        <View style={orientationStyles.middle}>

                                <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => console.log('button pressed')}>
                                    <Image source={require('../assets/activitiesView/letterFriends.png')} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                                <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => console.log('button pressed')}>
                                    <Image source={require('../assets/activitiesView/sounds.png')} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                        </View>


                        <View style={orientationStyles.bottom}>

                                <TouchableOpacity style={orientationStyles.otherOpacity} onPress={() => console.log('button pressed')}>
                                    <Image source={require('../assets/activitiesView/trace.png')} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                                <TouchableOpacity style={orientationStyles.otherOpacity} onPress={() => console.log('button pressed')}>
                                    <Image source={require('../assets/activitiesView/read.png')} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                                <TouchableOpacity style={orientationStyles.otherOpacity} onPress={() => console.log('button pressed')}>
                                    <Image source={require('../assets/activitiesView/test.png')} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                        </View>

                    </ImageBackground>

                </View>


                {/* Start of Portrait Views*/}
                </>) : (
                        <>

                <View style={orientationStyles.contentContainer}>

                    <ImageBackground 
                        source={require('../assets/activitiesView/posterBoard.png')}
                        style={orientationStyles.posterBoard}
                        >
                        <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                            <Image source={require('../assets/activitiesView/wordsIKnow.png')} resizeMode='contain' style={orientationStyles.Image} />
                        </TouchableOpacity>

                        <View style={orientationStyles.top}>



                        </View>


                        <View style={orientationStyles.middleTop}>


                        </View>

                        <View style={orientationStyles.middleBottom}>


                        </View>

                        <View style={orientationStyles.bottom}>


                        </View>

                    </ImageBackground>

                </View>
                        
                        
                        </>)}
            
                
            </ImageBackground>
    );
};




export default ActivitiesView;
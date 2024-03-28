import React, { useState, useEffect} from 'react';
import { ImageBackground, View, StyleSheet, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import { ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';



const ActivitiesView = ({ navigation, route}) => {
    
    const { selectedWord, batch } = route.params;
    console.log(batch);
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const { flyingHighStatus, sunnyIslandStatus, springtimeFunStatus, alienAdventureStatus, 
        outerSpaceStatus, planetsAndBeyondStatus, divingDeepStatus, isLoading } = useProgress();

    
    let batchStatus;

    // Set the batchStatus based for the batch received from the route
    if (batch == 'Flying High') {
        batchStatus = flyingHighStatus;
    }
    else if (batch == 'Sunny Island') {
        batchStatus = sunnyIslandStatus;
    }
    else if (batch == 'Springtime Fun') {
        batchStatus = springtimeFunStatus;
    }
    else if (batch == 'Alien Adventure') {
        batchStatus = alienAdventureStatus;
    }
    else if (batch == 'Outer Space') {
        batchStatus = outerSpaceStatus;
    }
    else if (batch == 'Planets and Beyond') {
        batchStatus = planetsAndBeyondStatus;
    }
    else if (batch == 'Diving Deep') {
        batchStatus = divingDeepStatus;
    }

    // Get the image for the letterFriends activity
    const getLetterFriendsImage = (word) => {
        // Check if the word is completed using the flyingHighStatus
        console.log(batchStatus);
        console.log(word);
        console.log(batchStatus[word]);
        const isCompleted = batchStatus[word] ? batchStatus[word].letter_friends_completed : false; // Check if word exists.
        console.log(isCompleted);
        const image = isCompleted ? require('../assets/activitiesView/letterFriendscompleted.png') : require('../assets/activitiesView/letterFriends.png'); // If word is completed, append 'completed' to the word to get the image key.
        return image;
    };

    // Get the image for the sounds activity
    const getSoundsImage = (word) => {
        // Check if the word is completed using the batchStatus
        const isCompleted = batchStatus[word] ? batchStatus[word].sounds_completed : false; // Check if word exists.
        const image = isCompleted ? require('../assets/activitiesView/soundscompleted.png') : require('../assets/activitiesView/sounds.png'); // If word is completed, append 'completed' to the word to get the image key.
        return image;
    };
    
    // Get the image for the trace activity
    const getTraceImage = (word) => {
        // Check if the word is completed using the batchStatus
        const isCompleted = batchStatus[word] ? batchStatus[word].trace_completed : false; // Check if word exists.
        const image = isCompleted ? require('../assets/activitiesView/tracecompleted.png') : require('../assets/activitiesView/trace.png'); // If word is completed, append 'completed' to the word to get the image key.
        return image;
    };

    // Get the image for the read activity
    const getReadImage = (word) => {
        // Check if the word is completed using the batchStatus
        const isCompleted = batchStatus[word] ? batchStatus[word].read_completed : false; // Check if word exists.
        const image = isCompleted ? require('../assets/activitiesView/readcompleted.png') : require('../assets/activitiesView/read.png'); // If word is completed, append 'completed' to the word to get the image key.
        return image;
    };

    // Get the image for the test activity
    const getTestImage = (word) => {
        // Check if the word is completed using the batchStatus
        const isCompleted = batchStatus[word] ? batchStatus[word].test_correct : false; // Check if word exists.
        const image = isCompleted ? require('../assets/activitiesView/testcompleted.png') : require('../assets/activitiesView/test.png'); // If word is completed, append 'completed' to the word to get the image key.
        return image;
    };

    

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
            },
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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

      if (isLoading) {
        return (
            <View style={orientationStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

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
                                    <Image source={getLetterFriendsImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                                <TouchableOpacity style={orientationStyles.soundsOpacity} onPress={() => navigation.navigate('Boxes', { batch: batch, selectedWord: selectedWord, activity: 'sounds' } )}>
                                    <Image source={getSoundsImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                        </View>


                        <View style={orientationStyles.bottom}>

                                <TouchableOpacity style={orientationStyles.otherOpacity} onPress={() => navigation.navigate('Trace', { batch: batch, selectedWord: selectedWord, activity: 'trace' } )}>
                                    <Image source={getTraceImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                                <TouchableOpacity style={orientationStyles.otherOpacity} onPress={() => console.log('button pressed')}>
                                    <Image source={getReadImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
                                </TouchableOpacity>

                                <TouchableOpacity style={orientationStyles.otherOpacity} onPress={() => navigation.navigate('Test', { batch: batch, selectedWord: selectedWord, activity: 'test' } )}>
                                    <Image source={getTestImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.wordsIKnowImage} />
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
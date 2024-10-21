import React, { useState, useEffect} from 'react';
import { ImageBackground, View, StyleSheet, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import { ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';



const ActivitiesView = ({ navigation, route}) => {
    
    const { selectedWord, batch } = route.params;
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
    else if (batch == 'SpringTime Fun') {
        batchStatus = springtimeFunStatus;
    }
    else if (batch == 'Alien Adventures') {
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
        const isCompleted = batchStatus[word] ? batchStatus[word].letter_friends_completed : false; // Check if word exists.
        const image = isCompleted ? require('../assets/activitiesView/letterFriendscompleted.png') : require('../assets/activitiesView/letterFriends.png'); // If word is completed, append 'completed' to the word to get the image key.
        return image;
    };

    // Get the image for the sounds activity
    const getSoundsImageAndStatus = (word) => {
        const isLetterFriendsCompleted = batchStatus[word] ? batchStatus[word].letter_friends_completed : false;
        const isSoundsCompleted = batchStatus[word] ? batchStatus[word].sounds_completed : false;
        const image = isSoundsCompleted ? require('../assets/activitiesView/soundscompleted.png') : require('../assets/activitiesView/sounds.png');
        return {
            image,
            isPrerequisiteCompleted: isLetterFriendsCompleted // Add this to determine if the activity should be clickable or not
        };
    };
    
    // Get the image for the trace activity
    const getTraceImageAndStatus = (word) => {
        
        const isSoundsCompleted = batchStatus[word] ? batchStatus[word].sounds_completed : false;
        
        const isTraceCompleted = batchStatus[word] ? batchStatus[word].trace_completed : false;
        const image = isTraceCompleted ? require('../assets/activitiesView/tracecompleted.png') : require('../assets/activitiesView/trace.png');
        return {
            image,
            isPrerequisiteCompleted: isSoundsCompleted
        };
    };

    // Get the image for the read activity
    const getReadImageAndStatus = (word) => {
        const isTraceCompleted = batchStatus[word] ? batchStatus[word].trace_completed : false;
        const isReadCompleted = batchStatus[word] ? batchStatus[word].read_completed : false;
        const image = isReadCompleted ? require('../assets/activitiesView/readcompleted.png') : require('../assets/activitiesView/read.png');
        return {
            image,
            isPrerequisiteCompleted: isTraceCompleted
        };
    };

    // Get the image for the test activity
    const getTestImageAndStatus = (word) => {
        const isReadCompleted = batchStatus[word] ? batchStatus[word].read_completed : false;
        const isTestCompleted = batchStatus[word] ? batchStatus[word].test_correct : false; // Assuming 'test_correct' indicates completion
        const image = isTestCompleted ? require('../assets/activitiesView/testcompleted.png') : require('../assets/activitiesView/test.png');
        return {
            image,
            isPrerequisiteCompleted: isReadCompleted
        };
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
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
            topLeft: {
                flex: 2.5,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
            },
            topRight: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-start ',
            },
            
            middle: {
                flex: 2,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
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
                marginTop: aspectRatio > 1.75 ? '0%': '5%',
                width: aspectRatio > 1.75 ? '50%': '65%',
                height: aspectRatio > 1.75 ? '100%': '80%',
                marginRight: aspectRatio > 1.75 ? '3%': '0%',
            },
            wordsIKnowImage: {
                width: '100%',
                height: '100%',
            },
            wordsIKnowopacity: {
                width: aspectRatio > 1.75 ? '80%': '80%',
                height: aspectRatio > 1.75 ? '50%': '35%',
            },
            letterFriendsOpacity: {
                width: aspectRatio > 1.75 ? '15%': '20%',
                height: aspectRatio > 1.75 ? '80%': '70%',
                marginRight: '5%',
            },
            soundsOpacity: {
                width: aspectRatio > 1.75 ? '15%': '20%',
                height: aspectRatio > 1.75 ? '80%': '70%',
                marginLeft: '5%',
            },
            otherOpacity: {
                width: aspectRatio > 1.75 ? '15%': '20%',
                height: aspectRatio > 1.75 ? '80%': '70%',
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
                flex: .5,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
            },
            topMiddle: {  
                flex: 2,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            },
            bottomMiddle: {
                flex: 1.5,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
            },
            bottom: {
                flex: 1.5,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            },
            wordsIKnowopacity: {
                width: '30%',
                height: '55%',
            },
            letterFriendsOpacity: {
                width: '35%',
                height: '60%',
            },
            activityBoardImage: {
                width: '60%',
                height: '35%',
            },
            otherOpacity: {
                width: '60%',
                height: '80%',
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

    const { image: soundsImage, isPrerequisiteCompleted: isLetterFriendsCompletedForSounds } = getSoundsImageAndStatus(selectedWord);
    const { image: traceImage, isPrerequisiteCompleted: isSoundsCompletedForTrace } = getTraceImageAndStatus(selectedWord);
    const { image: readImage, isPrerequisiteCompleted: isTraceCompletedForRead } = getReadImageAndStatus(selectedWord);
    const { image: testImage, isPrerequisiteCompleted: isReadCompletedForTest } = getTestImageAndStatus(selectedWord);

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
                                <Image source={require('../assets/activitiesView/activityBoard.png')} style={orientationStyles.activityBoardImage} />
                            </View>

                            <View style={orientationStyles.topRight}>
                                <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => navigation.navigate('Words I Know')}>
                                    <Image source={require('../assets/activitiesView/wordsIKnow.png')} resizeMode='contain' style={orientationStyles.Image} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={orientationStyles.middle}>

                                <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => navigation.navigate('Letter Friends', { batch: batch, selectedWord: selectedWord, activity: 'letter_friends' } )}>
                                    <Image source={getLetterFriendsImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.Image} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                        style={[orientationStyles.soundsOpacity, {opacity: isLetterFriendsCompletedForSounds ? 1 : 0.5}]} // Adjust opacity based on completion status
                                        disabled={!isLetterFriendsCompletedForSounds} // Disable if Letter Friends is not completed
                                        onPress={() => navigation.navigate('Boxes', { batch: batch, selectedWord: selectedWord, activity: 'sounds' })}
                                    >
                                    <Image source={soundsImage} resizeMode='contain' style={orientationStyles.Image} />
                                    
                                </TouchableOpacity>

                        </View>


                        <View style={orientationStyles.bottom}>

                            <TouchableOpacity
                                style={[orientationStyles.otherOpacity, {opacity: isSoundsCompletedForTrace ? 1 : 0.5}]}
                                disabled={!isSoundsCompletedForTrace}
                                onPress={() => navigation.navigate('Trace', { batch: batch, selectedWord: selectedWord, activity: 'trace' })}
                            >
                                <Image source={traceImage} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[orientationStyles.otherOpacity, {opacity: isTraceCompletedForRead ? 1 : 0.5}]}
                                disabled={!isTraceCompletedForRead}
                                onPress={() => navigation.navigate('Read', { batch: batch, selectedWord: selectedWord, activity: 'read' })}
                            >
                                <Image source={readImage} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[orientationStyles.otherOpacity, {opacity: isReadCompletedForTest ? 1 : 0.5}]}
                                disabled={!isReadCompletedForTest}
                                onPress={() => navigation.navigate('Test', { batch: batch, selectedWord: selectedWord, activity: 'test' })}
                            >
                                <Image source={testImage} resizeMode='contain' style={orientationStyles.Image} />
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

                        <View style={orientationStyles.top}>

                            <TouchableOpacity style={orientationStyles.wordsIKnowopacity} onPress={() => console.log('button pressed')}>
                                <Image source={require('../assets/activitiesView/wordsIKnow.png')} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>

                        </View>
                        
                        <View style={orientationStyles.topMiddle}>

                            

                             <Image source={require('../assets/activitiesView/activityBoard.png')} resizeMode='contain' style={orientationStyles.activityBoardImage} />

                            <TouchableOpacity style={orientationStyles.letterFriendsOpacity} onPress={() => navigation.navigate('Letter Friends', { batch: batch, selectedWord: selectedWord, activity: 'letter_friends' } )}>
                                    <Image source={getLetterFriendsImage(selectedWord, batchStatus[selectedWord])} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>



                        </View>


                        <View style={orientationStyles.bottomMiddle}>

                            <TouchableOpacity
                                    style={[orientationStyles.otherOpacity, {opacity: isLetterFriendsCompletedForSounds ? 1 : 0.5}]} // Adjust opacity based on completion status
                                    disabled={!isLetterFriendsCompletedForSounds} // Disable if Letter Friends is not completed
                                    onPress={() => navigation.navigate('Boxes', { batch: batch, selectedWord: selectedWord, activity: 'sounds' })}
                                >
                                <Image source={soundsImage} resizeMode='contain' style={orientationStyles.Image} />
                                    
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[orientationStyles.otherOpacity, {opacity: isSoundsCompletedForTrace ? 1 : 0.5}]}
                                disabled={!isSoundsCompletedForTrace}
                                onPress={() => navigation.navigate('Trace', { batch: batch, selectedWord: selectedWord, activity: 'trace' })}
                            >
                                <Image source={traceImage} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>


                        </View>


                        <View style={orientationStyles.bottom}>

                            <TouchableOpacity
                                style={[orientationStyles.otherOpacity, {opacity: isTraceCompletedForRead ? 1 : 0.5}]}
                                disabled={!isTraceCompletedForRead}
                                onPress={() => navigation.navigate('Read', { batch: batch, selectedWord: selectedWord, activity: 'read' })}
                            >
                                <Image source={readImage} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[orientationStyles.otherOpacity, {opacity: isReadCompletedForTest ? 1 : 0.5}]}
                                disabled={!isReadCompletedForTest}
                                onPress={() => navigation.navigate('Test', { batch: batch, selectedWord: selectedWord, activity: 'test' })}
                            >
                                <Image source={testImage} resizeMode='contain' style={orientationStyles.Image} />
                            </TouchableOpacity>


                        </View>

                    </ImageBackground>

                </View>
                        
                        
                        </>)}
            
                
            </ImageBackground>
    );
};




export default ActivitiesView;
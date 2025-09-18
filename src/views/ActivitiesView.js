import React, { useState, useEffect} from 'react';
import { ImageBackground, View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import { ActivityIndicator } from 'react-native';



const ActivitiesView = ({ navigation, route}) => {
    
    const { selectedWord, batch } = route.params;
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const { flyingHighStatus, sunnyIslandStatus, springtimeFunStatus, alienAdventureStatus, 
        outerSpaceStatus, planetsAndBeyondStatus, divingDeepStatus} = useProgress();

    
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


    // Get the image for the sounds activity
    const getSoundsImageAndStatus = (word) => {
        const isSoundsCompleted = batchStatus[word] ? batchStatus[word].sounds_completed : false;
        const image = isSoundsCompleted ? require('../assets/activitiesView/soundscompleted.png') : require('../assets/activitiesView/sounds.png');
        return {
            image
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

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) {
            return iPhoneValue;
        } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
            return iPadMiniValue;
        } else {
            return iPadValue;
        }
    };

    

    const styles = StyleSheet.create({

        // Landscape styles
    
            background: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            top: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: 'red',
                borderWidth: 2,
            },
            wordTextTop: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                borderColor: 'black',
                borderWidth: 2
            },
            wordTextContainer: {
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 3,
                height: '100%',
                width: '50%',
                backgroundColor: 'white',
                borderRadius: 20,
            },
            wordText: {
                fontSize: isLandscape ? 75  : 48,
                fontWeight: 'bold',
                textAlign: 'center',
            },
            middle: {
                flex: 3,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 2,
            },
            bottom: {
                flex: 3,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 2,
            },
            activityOpacity: {
                height: isLandscape ? '80%' : '60%',
                width: isLandscape ? '20%' : '40%',
                marginHorizontal:'5%'
            },
            image: {
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
            },
            wordsIKnowopacity: {
                width: isLandscape ? calculateImageDimensions(aspectRatio, '50%', '50%', '25%') : calculateImageDimensions(aspectRatio, '60%', '50%', '30%'),
                height: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '100%', '100%') : calculateImageDimensions(aspectRatio, '65%', '60%', '60%'),
                borderColor: 'black',
                borderWidth: 2,
            }


        });

    


    const { image: soundsImage} = getSoundsImageAndStatus(selectedWord);
    const { image: traceImage, isPrerequisiteCompleted: isSoundsCompletedForTrace } = getTraceImageAndStatus(selectedWord);
    const { image: readImage, isPrerequisiteCompleted: isTraceCompletedForRead } = getReadImageAndStatus(selectedWord);
    const { image: testImage, isPrerequisiteCompleted: isReadCompletedForTest } = getTestImageAndStatus(selectedWord);

    const logout = async () => {
            // Remove tokens or any authentication information
            await SecureStore.deleteItemAsync('access_token');
            await SecureStore.deleteItemAsync('refresh_token');
            
            // Reset navigation to the Login screen so it remounts and clears inputs
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        };

    return (
        
            <ImageBackground
                source={require('../assets/activitiesView/activitiesBackgroundLandscape.png')}
                resizeMode="cover"
                style={styles.background}                
            >

                <View style={styles.top}>
                    <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => navigation.navigate('Words I Know')}>
                        <Image source={require('../assets/selectWordBatchesView/wordsIKnow.png')}  resizeMode='contain' style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wordsIKnowopacity} onPress={logout}>
                        <Image source={require('../assets/selectWordBatchesView/logout.png')}  resizeMode='contain' style={styles.image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.wordTextTop}>
                    <View style={styles.wordTextContainer}>
                        <Text style={styles.wordText}>
                            {selectedWord}
                        </Text>
                    </View>
                </View>

                <View style={styles.middle}>
                    <TouchableOpacity
                        
                        onPress={() => navigation.navigate('Sounds', { selectedWord, batch })}
                        style={styles.activityOpacity}
                    >   
                        <Image source={soundsImage} style={styles.image} />

                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        disabled={!isSoundsCompletedForTrace}
                        onPress={() => navigation.navigate('Trace', { selectedWord, batch })}
                        style={{...styles.activityOpacity, opacity: isSoundsCompletedForTrace ? 1 : 0.5}}
                    >
                            <Image source={traceImage} style={styles.image} />
                    </TouchableOpacity>

                    
                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity
                        disabled={!isTraceCompletedForRead}
                        onPress={() => navigation.navigate('Read', { selectedWord, batch })}
                        style={{...styles.activityOpacity, opacity: isTraceCompletedForRead ? 1 : 0.5}}
                    >
                            <Image source={readImage} style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={!isReadCompletedForTest}
                        onPress={() => navigation.navigate('Test', { selectedWord, batch })}
                        style={{ ...styles.activityOpacity, opacity: isReadCompletedForTest ? 1 : 0.5 }}
                    >
                            <Image source={testImage} style={styles.image} />
                    </TouchableOpacity>

                </View>

            </ImageBackground>
    );
};




export default ActivitiesView;
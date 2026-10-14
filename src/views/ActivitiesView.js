import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground, View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import { Audio } from 'expo-av';
import wordAudioMapping from '../utils/wordAudioMapping.js';



const ActivitiesView = ({ navigation, route}) => {
    
    const { selectedWord, batch, email } = route.params;
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

    const soundRef = useRef(null);

    const playWord = async () => {
        const word = selectedWord;
        if (!word) return;

        const key = word.trim().toLowerCase();
        const audioFile = wordAudioMapping[key] || wordAudioMapping[word] || null;

        try {
            // unload previous sound if present
            if (soundRef.current) {
                try { await soundRef.current.unloadAsync(); } catch (e) { /* ignore */ }
                soundRef.current = null;
            }

            const { sound } = await Audio.Sound.createAsync(audioFile);
            soundRef.current = sound;
            await sound.playAsync();
        } catch (err) {
        }
    };

    useEffect(() => {
        return () => {
            // cleanup sound on unmount
            if (soundRef.current) {
                try { soundRef.current.unloadAsync(); } catch (e) { /* ignore */ }
                soundRef.current = null;
            }
        };
    }, []);

    

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
                borderBottomWidth: 5,
                borderBottomColor: 'black'
            },
            wordTextTop: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '2%',
            },
            wordTextContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'black',
                borderWidth: 3,
                height: '100%',
                width: '50%',
                backgroundColor: 'white',
                borderRadius: 20,
            },
            wordSoundContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '80%',

            },
            wordText: {
                fontSize: isLandscape ? calculateImageDimensions(aspectRatio, 30, 60, 75) : calculateImageDimensions(aspectRatio, 30, 40, 48),
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
            },
            bottom: {
                flex: 3,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
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
                width: isLandscape ? calculateImageDimensions(aspectRatio, '18%', '50%', '25%') : calculateImageDimensions(aspectRatio, '60%', '50%', '30%'),
                height: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '100%', '100%') : calculateImageDimensions(aspectRatio, '65%', '60%', '70%'),
            },
            speaker: {
                width: isLandscape ? calculateImageDimensions(aspectRatio, '8%', '10%', '10%') : calculateImageDimensions(aspectRatio, '50%', '50%', '15%'),
                height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '40%') : calculateImageDimensions(aspectRatio, '50%', '50%', '25%'),
            }


        });

    


    const { image: soundsImage} = getSoundsImageAndStatus(selectedWord);
    const { image: traceImage, isPrerequisiteCompleted: isSoundsCompletedForTrace } = getTraceImageAndStatus(selectedWord);
    const { image: readImage, isPrerequisiteCompleted: isTraceCompletedForRead } = getReadImageAndStatus(selectedWord);
    const { image: testImage, isPrerequisiteCompleted: isReadCompletedForTest } = getTestImageAndStatus(selectedWord);

    const logout = async () => {
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
                    
                    <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => navigation.navigate('Instructions Activities')}>
                        <Image source={require('../assets/instructionsVideo.png')}  resizeMode='contain' style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => navigation.navigate('Words I Know')}>
                        <Image source={require('../assets/selectWordBatchesView/wordsIKnow.png')}  resizeMode='contain' style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wordsIKnowopacity} onPress={logout}>
                        <Image source={require('../assets/selectWordBatchesView/logout.png')}  resizeMode='contain' style={styles.image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.wordTextTop}>
                    <View style={styles.wordTextContainer}>
                        <TouchableOpacity
                            style={styles.wordSoundContainer}
                            onPress={playWord}
                            accessibilityRole="button"
                        >
                            <Image source={require('../assets/sound.png')} style={styles.speaker} />
                            <Text style={styles.wordText}> {selectedWord} </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.middle}>
                    <TouchableOpacity

                        onPress={() => navigation.navigate('Sounds', { batch, activity: "sounds", selectedWord })}
                        style={styles.activityOpacity}
                    >   
                        <Image source={soundsImage} style={styles.image} />

                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        disabled={!isSoundsCompletedForTrace}
                        onPress={() => navigation.navigate('Trace', { batch, activity: "trace", selectedWord })}
                        style={{...styles.activityOpacity, opacity: isSoundsCompletedForTrace ? 1 : 0.5}}
                    >
                            <Image source={traceImage} style={styles.image} />
                    </TouchableOpacity>

                    
                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity
                        disabled={!isTraceCompletedForRead}
                        onPress={() => navigation.navigate('Read', { batch, activity: "read", selectedWord })}
                        style={{...styles.activityOpacity, opacity: isTraceCompletedForRead ? 1 : 0.5}}
                    >
                            <Image source={readImage} style={styles.image} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={!isReadCompletedForTest}
                        onPress={() => navigation.navigate('Test', { batch, activity: "test", selectedWord, email })}
                        style={{ ...styles.activityOpacity, opacity: isReadCompletedForTest ? 1 : 0.5 }}
                    >
                            <Image source={testImage} style={styles.image} />
                    </TouchableOpacity>

                </View>

            </ImageBackground>
    );
};




export default ActivitiesView;
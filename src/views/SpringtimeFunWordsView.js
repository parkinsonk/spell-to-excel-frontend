import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { renderWordPressable } from '../components/wordButtons';
import { Audio } from 'expo-av';
import wordAudioMapping from '../utils/wordAudioMapping.js';

const SpringtimeFunWordsView = ({ navigation, route }) => {
    const { email } = route.params;

    const { springtimeFunStatus, isLoading } = useProgress();
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        const isCompleted = springtimeFunStatus[word] ? springtimeFunStatus[word].test_correct : false;
        const key = isCompleted ? `${word}completed` : word;
        return wordImageMapping[key];
    };

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) return iPhoneValue;
        else if (aspectRatio > 1.4 && aspectRatio < 1.7) return iPadMiniValue;
        else return iPadValue;
    };

    // ── Audio ─────────────────────────────────────────────────────────────────
    const soundRef = useRef(null);

    const playWord = async (word) => {
        if (!word) return;
        const audioFile = wordAudioMapping[word.trim().toLowerCase()];
        if (!audioFile) return;

        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync().catch(() => {});
                soundRef.current = null;
            }
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                allowsRecordingIOS: false,
                shouldDuckAndroid: true,
            });
            const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: true });
            soundRef.current = sound;
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync().catch(() => {});
                    soundRef.current = null;
                }
            });
        } catch (err) {
            console.warn('SpringtimeFunWordsView audio error:', err);
        }
    };

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync().catch(() => {});
                soundRef.current = null;
            }
        };
    }, []);

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
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
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 5,
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        oneOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
            marginRight: '5%',
        },
        twoOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
            marginRight: '5%',
        },
        blueOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
        },
        threeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '33%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '16%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
            marginRight: '5%',
        },
        yellowOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '50%', '38%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '17%', '16%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
            marginRight: '5%',
        },
        nineOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '33%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '16%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
        },
        greenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '7%', '8%', '9%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
        },
        fourOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        purpleOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        fiveOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        pinkOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        sevenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        whiteOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        blackOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        eightOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '8%', '9%', '10%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
        },
        notOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        Image: {
            height: '100%',
            width: '100%',
        },
    });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/springtimeFunView/springtimeFunBackground.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.top}>

                {/* one — first word, always unlocked */}
                <TouchableOpacity
                    style={styles.oneOpacity}
                    onPress={() => {
                        playWord('one');
                        navigation.navigate('Activities', { selectedWord: 'one', batch: 'SpringTime Fun', email: email });
                    }}
                >
                    <Image source={getImageSource('one')} style={styles.Image} />
                </TouchableOpacity>

                {/* two */}
                {renderWordPressable('one', 'two', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('two'), playWord, email)}

                {/* blue */}
                {renderWordPressable('two', 'blue', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('blue'), playWord, email)}

            </View>

            <View style={styles.middle}>

                {/* three */}
                {renderWordPressable('blue', 'three', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('three'), playWord, email)}

                {/* yellow */}
                {renderWordPressable('three', 'yellow', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('yellow'), playWord, email)}

                {/* nine */}
                {renderWordPressable('yellow', 'nine', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('nine'), playWord, email)}

            </View>

            <View style={styles.bottom}>

                {/* green */}
                {renderWordPressable('nine', 'green', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('green'), playWord, email)}

                {/* four */}
                {renderWordPressable('green', 'four', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('four'), playWord, email)}

                {/* purple */}
                {renderWordPressable('four', 'purple', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('purple'), playWord, email)}

                {/* five */}
                {renderWordPressable('purple', 'five', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('five'), playWord, email)}

                {/* pink */}
                {renderWordPressable('five', 'pink', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('pink'), playWord, email)}

                {/* seven */}
                {renderWordPressable('pink', 'seven', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('seven'), playWord, email)}

                {/* eight */}
                {renderWordPressable('seven', 'eight', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('eight'), playWord, email)}

                {/* white */}
                {renderWordPressable('eight', 'white', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('white'), playWord, email)}

                {/* black */}
                {renderWordPressable('white', 'black', 'SpringTime Fun', springtimeFunStatus, navigation, styles, getImageSource('black'), playWord, email)}

            </View>

        </ImageBackground>
    );
};

export default SpringtimeFunWordsView;
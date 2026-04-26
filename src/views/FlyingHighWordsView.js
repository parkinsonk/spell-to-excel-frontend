import { ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground, View, Pressable, Button, StyleSheet, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderWordPressable } from '../components/wordButtons';
import { Audio } from 'expo-av';
import wordAudioMapping from '../utils/wordAudioMapping.js';

const FlyingHighWordsView = ({ navigation, route }) => {

    const { email } = route.params;

    const { flyingHighStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        const isCompleted = flyingHighStatus[word] ? flyingHighStatus[word].test_correct : false;
        const key = isCompleted ? `${word}completed` : word;
        return wordImageMapping[key];
    };

    const soundRef = useRef(null);

    // ── Play audio for any word ───────────────────────────────────────────────
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
            console.warn('FlyingHighWordsView audio error:', err);
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
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        hisOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '55%' : '55%' : '30%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '15%',
            resizeMode: 'contain',
            marginTop: '6%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        theOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '55%' : '55%' : '30%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '15%',
            resizeMode: 'contain',
            marginTop: '4%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        toOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '60%' : '60%' : '30%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '15%',
        },
        helicopter: {
            height: isLandscape ? aspectRatio > 1.7 ? '90%' : '90%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '20%' : '15%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '5%',
        },
        seeOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '15%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '3%' : '3%' : '6%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '1%' : '1%',
        },
        ofOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '12%' : '12%' : '15%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '5%' : '5%' : '15%',
        },
        andOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '10%',
        },
        youOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '12%',
        },
        saidOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '8%',
        },
        weOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '4%' : '4%' : '14%',
        },
        goOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        areOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '3%',
        },
        wasOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        aOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        heOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        forOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '3%' : '3%' : '4%',
        },
        Image: {
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
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
            source={require('../assets/flyingHighWordsView/flyingHighBackground.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.top}>

                {/* the */}
                <Pressable
                    onPress={() => {
                        playWord('the');
                        navigation.navigate('Activities', { selectedWord: 'the', batch: 'Flying High', email: email });
                    }}
                    style={({ pressed }) => [styles.theOpacity, { opacity: pressed ? 0.5 : 1 }]}
                >
                    <Image source={getImageSource('the')} style={styles.Image} />
                </Pressable>

                {/* see */}
                {renderWordPressable('the', 'see', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('see'), playWord, email)}

                {/* his */}
                {renderWordPressable('see', 'his', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('his'), playWord, email)}

                {/* to */}
                {renderWordPressable('his', 'to', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('to'), playWord, email)}

                <View style={styles.helicopter}>
                    <Image source={require('../assets/flyingHighWordsView/helicopter.png')} style={styles.Image} />
                </View>

                {/* of */}
                {renderWordPressable('to', 'of', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('of'), playWord, email)}

            </SafeAreaView>

            <SafeAreaView style={styles.middle}>

                {/* and */}
                {renderWordPressable('to', 'and', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('and'), playWord, email)}

                {/* a */}
                {renderWordPressable('and', 'a', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('a'), playWord, email)}

                {/* you */}
                {renderWordPressable('a', 'you', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('you'), playWord, email)}

                {/* said */}
                {renderWordPressable('you', 'said', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('said'), playWord, email)}

                {/* for */}
                {renderWordPressable('said', 'for', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('for'), playWord, email)}

            </SafeAreaView>

            <SafeAreaView style={styles.bottom}>

                {/* go */}
                {renderWordPressable('for', 'go', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('go'), playWord, email)}

                {/* he */}
                {renderWordPressable('go', 'he', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('he'), playWord, email)}

                {/* we */}
                {renderWordPressable('he', 'we', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('we'), playWord, email)}

                {/* was */}
                {renderWordPressable('we', 'was', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('was'), playWord, email)}

                {/* are */}
                {renderWordPressable('was', 'are', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('are'), playWord, email)}

            </SafeAreaView>

        </ImageBackground>
    );
};

export default FlyingHighWordsView;
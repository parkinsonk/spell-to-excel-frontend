import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderWordPressable } from '../components/wordButtons';
import { Audio } from 'expo-av';
import wordAudioMapping from '../utils/wordAudioMapping.js';

const SunnyIslandWordsView = ({ navigation }) => {

    const { sunnyIslandStatus, isLoading } = useProgress();
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        const isCompleted = sunnyIslandStatus[word] ? sunnyIslandStatus[word].test_correct : false;
        const key = isCompleted ? `${word}completed` : word;
        return wordImageMapping[key];
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
            console.warn('SunnyIslandWordsView audio error:', err);
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
            flexDirection: 'column',
        },
        top: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        middle: {
            flex: 1,
            flexDirection: 'row',
        },
        middleLeft: {
            flex: 1,
        },
        middleMiddle: {
            flex: 1,
        },
        middleRight: {
            flex: 1,
        },
        middleBottomSection: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        middleTopSection: {
            flex: 3,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexDirection: 'row',
        },
        bottom: {
            flex: 1.1,
            flexDirection: 'row',
        },
        bottomLeft: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        bottomMiddle: {
            flex: 1,
            flexDirection: 'row',
        },
        bottomRight: {
            flex: 1,
            flexDirection: 'row',
        },
        isOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '45%' : '50%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '25%' : '30%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '5%',
            marginBottom: '5%',
        },
        myOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '45%' : '50%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '22%' : '30%' : '30%',
            marginBottom: '5%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '20%',
        },
        meOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '100%' : '100%' : '60%',
            width: isLandscape ? aspectRatio > 1.7 ? '17%' : '22%' : '30%',
            marginLeft: '25%',
        },
        asOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '45%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '25%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '5%',
            marginBottom: '5%',
        },
        sayOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '45%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '25%' : '30%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '30%' : '10%' : '15%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '1%',
        },
        comeOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '100%' : '100%' : '70%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '25%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '1%',
        },
        hasOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '100%' : '100%' : '70%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '25%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '10%',
        },
        theyOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '45%' : '44%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '31%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '1%',
            marginBottom: '2%',
        },
        whereOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '45%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '25%' : '35%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '20%' : '5%',
        },
        haveOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '100%' : '100%' : '80%',
            width: isLandscape ? aspectRatio > 1.7 ? '18%' : '25%' : '40%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '10%',
        },
        awayOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '100%' : '90%' : '80%',
            width: isLandscape ? aspectRatio > 1.7 ? '17%' : '22%' : '40%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '10%',
        },
        funnyOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '35%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '25%' : '26%' : '35%',
            marginTop: '5%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '10%',
        },
        byOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '35%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '25%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '10%',
            marginTop: '3%',
        },
        findOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '35%' : '23%' : '20%',
            width: isLandscape ? aspectRatio > 1.7 ? '25%' : '22%' : '35%',
            marginTop: '5%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '20%' : '10%' : '10%',
        },
        whatOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '35%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '20%' : '18%' : '25%',
            marginTop: '2%',
            marginLeft: '5%',
        },
        fromOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '35%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '25%' : '27%' : '35%',
            marginTop: '8%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '10%' : '15%' : '10%',
        },
        cloudSunImage: {
            width: '30%',
            height: '50%',
        },
        Image: {
            width: '100%',
            height: '100%',
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
            source={require('../assets/sunnyIslandView/sunnyIslandLandscapeBackground.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.top}>
                <Image source={require('../assets/sunnyIslandView/cloudSun.png')} resizeMode="contain" style={styles.cloudSunImage} />
            </SafeAreaView>

            <SafeAreaView style={styles.middle}>

                <View style={styles.middleLeft}>
                    <View style={styles.middleTopSection}>

                        {/* is — first word, always unlocked */}
                        <TouchableOpacity
                            style={styles.isOpacity}
                            onPress={() => {
                                playWord('is');
                                navigation.navigate('Activities', { selectedWord: 'is', batch: 'Sunny Island' });
                            }}
                        >
                            <Image source={getImageSource('is')} style={styles.Image} />
                        </TouchableOpacity>

                        {/* my */}
                        {renderWordPressable('is', 'my', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('my'), playWord)}

                    </View>
                    <View style={styles.middleBottomSection}>

                        {/* me */}
                        {renderWordPressable('my', 'me', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('me'), playWord)}

                    </View>
                </View>

                <View style={styles.middleMiddle}>
                    <View style={styles.middleTopSection}>

                        {/* as */}
                        {renderWordPressable('me', 'as', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('as'), playWord)}

                        {/* say */}
                        {renderWordPressable('as', 'say', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('say'), playWord)}

                    </View>
                    <View style={styles.middleBottomSection}>

                        {/* come */}
                        {renderWordPressable('say', 'come', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('come'), playWord)}

                        {/* has */}
                        {renderWordPressable('come', 'has', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('has'), playWord)}

                    </View>
                </View>

                <View style={styles.middleRight}>
                    <View style={styles.middleTopSection}>

                        {/* they */}
                        {renderWordPressable('has', 'they', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('they'), playWord)}

                        {/* where */}
                        {renderWordPressable('they', 'where', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('where'), playWord)}

                    </View>
                    <View style={styles.middleBottomSection}>

                        {/* have */}
                        {renderWordPressable('where', 'have', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('have'), playWord)}

                        {/* away */}
                        {renderWordPressable('have', 'away', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('away'), playWord)}

                    </View>
                </View>

            </SafeAreaView>

            <SafeAreaView style={styles.bottom}>

                <View style={styles.bottomLeft}>

                    {/* what */}
                    {renderWordPressable('away', 'what', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('what'), playWord)}

                    {/* from */}
                    {renderWordPressable('what', 'from', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('from'), playWord)}

                </View>

                <View style={styles.bottomMiddle}>

                    {/* by */}
                    {renderWordPressable('from', 'by', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('by'), playWord)}

                    {/* find */}
                    {renderWordPressable('by', 'find', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('find'), playWord)}

                </View>

                <View style={styles.bottomRight}>

                    {/* funny */}
                    {renderWordPressable('find', 'funny', 'Sunny Island', sunnyIslandStatus, navigation, styles, getImageSource('funny'), playWord)}

                </View>

            </SafeAreaView>
        </ImageBackground>
    );
};

export default SunnyIslandWordsView;
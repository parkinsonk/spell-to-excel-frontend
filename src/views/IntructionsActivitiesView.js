import React, { useState, useRef, useEffect } from 'react';
import {
    ImageBackground, View, Text, StyleSheet,
    TouchableOpacity, FlatList, Image, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import ActivitiesView from './ActivitiesView';

// ─── Audio files — add your mp3s here when ready ─────────────────────────────
// const audioFiles = [
//     require('../assets/activitiesInstructions/slide0.mp3'),
//     require('../assets/activitiesInstructions/slide1.mp3'),
//     require('../assets/activitiesInstructions/slide2.mp3'),
//     require('../assets/activitiesInstructions/slide3.mp3'),
// ];
const audioFiles = [require('../assets/activitiesView/activitiesIntro.mp3'), 
    require('../assets/activitiesView/selectActivity.mp3'), 
    require('../assets/activitiesView/selectBack.mp3'),
    require('../assets/activitiesView/completeAllActivities.mp3'), 
]; // replace with require() paths above

// ─── Activity card colours ────────────────────────────────────────────────────
const CARDS = [
    { label: '1. Sounds',          border: '#9B59B6', dot: '#3498db' },
    { label: '2. Trace, Copy, Try',border: '#E74C3C', dot: '#F1C40F' },
    { label: '3. Read',            border: '#F1C40F', dot: '#9B59B6' },
    { label: '4. Test',            border: '#2C3E8C', dot: '#E74C3C' },
];

const InstructionsActivitiesView = ({ navigation, route }) => {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    // Device detection — use shorter physical edge (stable across orientations)
    const minDim  = Math.min(screenWidth, screenHeight);
    const isPhone = minDim < 500;

    const baseFontSize = isPhone
        ? (isLandscape ? 12 : 14)
        : (isLandscape ? 16 : 20);

    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying]     = useState(false);
    const flatListRef = useRef(null);
    const soundRef    = useRef(null);

    // ── Audio helpers ──────────────────────────────────────────────────────────
    const unloadSound = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync().catch(() => {});
            await soundRef.current.unloadAsync().catch(() => {});
            soundRef.current = null;
        }
        setIsPlaying(false);
    };

    const playAudio = async (file) => {
        if (!file) return;
        await unloadSound();
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: false,
            shouldDuckAndroid: true,
        });
        const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });
        soundRef.current = sound;
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) setIsPlaying(false);
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => playAudio(audioFiles[currentStep]), 350);
        return () => { clearTimeout(timer); unloadSound(); };
    }, [currentStep]);

    const handleSpeakerPress = async () => {
        if (isPlaying) await unloadSound();
        else           await playAudio(audioFiles[currentStep]);
    };

    const TOTAL_SLIDES = 4;

    const goNext = async () => {
        await unloadSound();
        if (currentStep < TOTAL_SLIDES - 1) {
            const next = currentStep + 1;
            flatListRef.current?.scrollToIndex({ index: next, animated: true });
            setCurrentStep(next);
        } else {
            navigation.goBack();
        }
    };

    // ── Activity grid mock ─────────────────────────────────────────────────────
    // tapIndex:   which card shows 👆 TAP!
    // doneCount:  how many cards from the top are checked (0 = none, 4 = all)
    const ActivityMock = ({ tapIndex = -1, doneCount = 0 }) => {
        const mockW = isPhone
            ? (isLandscape ? screenHeight * 0.50 : screenWidth  * 0.56)
            : (isLandscape ? screenHeight * 0.54 : screenWidth  * 0.56);
        const cardSize  = mockW * 0.44;
        const dotR      = cardSize * 0.09;
        const fontSize  = cardSize * 0.13;

        return (
            <View style={{
                width: mockW,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                padding: 6,
                backgroundColor: '#0CCFFF',
                borderRadius: 16,
                borderWidth: 3,
                borderColor: '#FFD93D',
            }}>
                {CARDS.map((card, i) => {
                    const isTap  = i === tapIndex;
                    const isDone = i < doneCount;

                    return (
                        <View key={i} style={{
                            width: cardSize,
                            height: cardSize,
                            margin: cardSize * 0.03,
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            borderWidth: cardSize * 0.055,
                            borderColor: card.border,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'visible',
                        }}>
                            {/* Pin dot */}
                            <View style={{
                                position: 'absolute',
                                top: -dotR,
                                width: dotR * 2,
                                height: dotR * 2,
                                borderRadius: dotR,
                                backgroundColor: card.dot,
                                borderWidth: 1.5,
                                borderColor: 'rgba(0,0,0,0.15)',
                            }} />

                            {/* Card label */}
                            <Text style={{
                                fontSize,
                                fontWeight: '800',
                                color: '#222',
                                textAlign: 'center',
                                paddingHorizontal: 4,
                            }}>
                                {card.label}
                            </Text>

                            {/* TAP badge */}
                            {isTap && (
                                <View style={{
                                    marginTop: 4,
                                    backgroundColor: '#FFD93D',
                                    borderRadius: 8,
                                    paddingHorizontal: 6,
                                    paddingVertical: 2,
                                }}>
                                    <Text style={{ fontSize: fontSize * 0.85, fontWeight: '800', color: '#333' }}>
                                        👆 TAP!
                                    </Text>
                                </View>
                            )}

                            {/* Checkmark overlay */}
                            {isDone && (
                                <View style={{
                                    position: 'absolute',
                                    bottom: 4,
                                    right: 4,
                                    backgroundColor: '#6BCB77',
                                    borderRadius: 6,
                                    width: cardSize * 0.26,
                                    height: cardSize * 0.26,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ fontSize: cardSize * 0.17, color: '#fff', fontWeight: '900' }}>✓</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };

    // ── Word banner (mimics the top bar of the activities page) ───────────────
    const WordBanner = ({ word = 'the' }) => (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 14,
            borderWidth: 2.5,
            borderColor: '#bbb',
            paddingHorizontal: 16,
            paddingVertical: isPhone ? 6 : 10,
            marginBottom: 10,
            alignSelf: 'center',
        }}>
            <Text style={{ fontSize: baseFontSize * 1.1, marginRight: 6 }}>🔊</Text>
            <Text style={{ fontSize: baseFontSize * 1.5, fontWeight: '900', color: '#111' }}>
                {word}
            </Text>
        </View>
    );

    // ── Slides ────────────────────────────────────────────────────────────────
    const slides = [
        {
            key: 'welcome',
            emoji: '🎯',
            title: 'Activities Guide!',
            subtitle: 'Here\'s how to complete your word!',
            content: () => (
                <Text style={{ fontSize: baseFontSize * (isPhone ? 2.4 : 3.0), marginVertical: isPhone ? 4 : 8 }}>
                    🔊 ✏️ 📖 🏆
                </Text>
            ),
            buttonLabel: "Let's See! →",
        },
        {
            key: 'tap',
            emoji: '1️⃣',
            title: 'Tap an Activity!',
            subtitle: 'Pick any card to start that activity.',
            content: () => (
                <View style={{ alignItems: 'center' }}>
                    <WordBanner word="the" />
                    <ActivityMock tapIndex={0} />
                </View>
            ),
            buttonLabel: 'Next →',
        },
        {
            key: 'back',
            emoji: '2️⃣',
            title: 'Tap Back When Done!',
            subtitle: 'This button completes the activity! ✅',
            content: () => {
                const backBtnSize = isPhone ? 48 : 60;
                return (
                    <View style={{ alignItems: 'center', width: '100%' }}>

                        {/* Mini header bar mimicking the real activity screen */}
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 14,
                            borderWidth: 2.5,
                            borderColor: '#FFD93D',
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            marginBottom: 8,
                            alignSelf: 'stretch',   // fills visual area width reliably
                        }}>
                            {/* Actual back button image */}
                            <View style={{ position: 'relative' }}>
                                <Image
                                    source={require('../assets/back.png')}
                                    style={{ width: backBtnSize, height: backBtnSize }}
                                    resizeMode="contain"
                                />
                                {/* Pulsing ring to draw attention */}
                                <View style={{
                                    position: 'absolute',
                                    top: -4, left: -4,
                                    width: backBtnSize + 8,
                                    height: backBtnSize + 8,
                                    borderRadius: (backBtnSize + 8) / 2,
                                    borderWidth: 3,
                                    borderColor: '#FF6B6B',
                                    opacity: 0.85,
                                }} />
                            </View>

                            {/* Arrow + label */}
                            <Text style={{ fontSize: baseFontSize * 1.1, marginHorizontal: 6 }}>👈</Text>
                            <View style={{
                                flex: 1,
                                backgroundColor: '#FFF3CD',
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: '#FFD93D',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                            }}>
                                <Text style={{ fontSize: baseFontSize * 0.82, fontWeight: '800', color: '#333', textAlign: 'center' }}>
                                    Tap this to complete! ✅
                                </Text>
                            </View>
                        </View>

                        {/* Grid showing first activity checked */}
                        <ActivityMock doneCount={1} />
                    </View>
                );
            },
            buttonLabel: 'Next →',
        },
        {
            key: 'finish',
            emoji: '3️⃣',
            title: 'Finish All 4!',
            subtitle: 'Complete every activity to master the word! 🌟',
            content: () => (
                <View style={{ alignItems: 'center' }}>
                    <WordBanner word="the" />
                    <ActivityMock doneCount={4} />
                    <View style={{
                        marginTop: 8,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderWidth: 2,
                        borderColor: '#6BCB77',
                    }}>
                        <Text style={{ fontSize: baseFontSize * 0.85, fontWeight: '700', color: '#2c3e50', textAlign: 'center' }}>
                            🎉 All done — word complete!
                        </Text>
                    </View>
                </View>
            ),
            buttonLabel: "Let's Go! 🚀",
        },
    ];

    // ── Render ────────────────────────────────────────────────────────────────
    const cardPadV = isPhone ? (isLandscape ? 8  : 14) : (isLandscape ? 16 : 24);
    const cardPadH = isPhone ? (isLandscape ? 16 : 18) : (isLandscape ? 28 : 32);

    const renderSlide = ({ item }) => (
        <View style={{ width: screenWidth, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={[styles.card, {
                width:             isLandscape ? '76%' : (isPhone ? '88%' : '90%'),
                paddingVertical:   cardPadV,
                paddingHorizontal: cardPadH,
            }]}>

                {/* Speaker button */}
                <TouchableOpacity
                    style={[styles.speakerButton, isPlaying && styles.speakerButtonActive]}
                    onPress={handleSpeakerPress}
                >
                    <Text style={{ fontSize: baseFontSize * 1.3 }}>
                        {isPlaying ? '🔊' : '🔈'}
                    </Text>
                </TouchableOpacity>

                <Text style={{ fontSize: baseFontSize * 2.0, marginBottom: 2 }}>{item.emoji}</Text>
                <Text style={[styles.title,    { fontSize: baseFontSize * 1.4  }]}>{item.title}</Text>
                <Text style={[styles.subtitle, { fontSize: baseFontSize * 0.88 }]}>{item.subtitle}</Text>

                <View style={[styles.visualArea, { marginBottom: isPhone ? 10 : 14 }]}>
                    {item.content()}
                </View>

                <TouchableOpacity
                    style={[styles.button, isPhone && { paddingVertical: 9, paddingHorizontal: 28 }]}
                    onPress={goNext}
                >
                    <Text style={[styles.buttonText, { fontSize: baseFontSize }]}>
                        {item.buttonLabel}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/loginView/loginBackground.png')}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    renderItem={renderSlide}
                    keyExtractor={item => item.key}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
                        setCurrentStep(index);
                    }}
                />

                {/* Progress dots */}
                <View style={styles.dotsRow}>
                    {slides.map((_, i) => (
                        <View key={i} style={[styles.dot, currentStep === i && styles.activeDot]} />
                    ))}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 3,
        borderColor: '#FFD93D',
    },
    title: {
        fontWeight: '800',
        color: '#FF6B6B',
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        color: '#777',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '500',
    },
    visualArea: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',   // more reliable than width:'100%' inside alignItems:'center'
    },
    button: {
        backgroundColor: '#6BCB77',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#4da85a',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12,
        paddingTop: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.45)',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#FFD93D',
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    speakerButton: {
        position: 'absolute',
        top: 10,
        right: 12,
        backgroundColor: '#E8F4FD',
        borderRadius: 22,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#AED6F1',
        zIndex: 10,
    },
    speakerButtonActive: {
        backgroundColor: '#AED6F1',
        borderColor: '#3498db',
    },
});

export default InstructionsActivitiesView;
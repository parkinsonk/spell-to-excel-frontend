import React, { useState, useRef, useEffect } from 'react';
import {
    ImageBackground, View, Text, StyleSheet,
    TouchableOpacity, FlatList, Image, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

const InstructionsView = ({ navigation, route }) => {
    const { email } = route.params;
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const flatListRef = useRef(null);
    const soundRef = useRef(null);

    // Audio files — one per slide, in order
    const audioFiles = [
        require('../assets/selectWordBatchesView/wordBatchesHowToPlay.mp3'),
        require('../assets/selectWordBatchesView/wordBatchesinstructions1.mp3'),
        require('../assets/selectWordBatchesView/wordBatchesLearnEveryWord2.mp3'),
        require('../assets/selectWordBatchesView/wordBatches3.mp3'),
    ];

    // Unload the current sound object cleanly
    const unloadSound = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync().catch(() => {});
            await soundRef.current.unloadAsync().catch(() => {});
            soundRef.current = null;
        }
        setIsPlaying(false);
    };

    // Play an audio file from the start
    const playAudio = async (file) => {
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
            if (status.didJustFinish) {
                setIsPlaying(false);
            }
        });
    };

    // Auto-play when the slide changes (also fires on first mount for slide 0)
    // Small delay lets the swipe animation finish before audio starts
    useEffect(() => {
        const timer = setTimeout(() => {
            playAudio(audioFiles[currentStep]);
        }, 350);
        return () => {
            clearTimeout(timer);
            unloadSound();
        };
    }, [currentStep]);

    // Replay button — tap to replay from start, tap again while playing to stop
    const handleSpeakerPress = async (file) => {
        if (isPlaying) {
            await unloadSound();
        } else {
            await playAudio(file);
        }
    };

    const calculateDimension = (ar, iPhoneVal, iPadMiniVal, iPadVal) => {
        if (ar > 1.7) return iPhoneVal;
        else if (ar > 1.4) return iPadMiniVal;
        else return iPadVal;
    };

    const baseFontSize = isLandscape
        ? calculateDimension(aspectRatio, 13, 15, 17)
        : calculateDimension(aspectRatio, 16, 18, 22);

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

    const mockH = isLandscape ? screenHeight * 0.44 : screenHeight * 0.27;
    const mockW = mockH * 1.42;
    const imgStyle = { height: '100%', width: '100%' };

    // ─── Reusable mini-screen mock ────────────────────────────────────────────
    // tapBatch:    which batch gets the 👆 TAP! badge  (e.g. 'flyingHigh')
    // doneBatch:   which batch gets the ✅ badge        (e.g. 'flyingHigh')
    // unlockBatch: which batch gets the 🔓 NEW! badge   (e.g. 'sunnyIsland')
    const MiniMock = ({ tapBatch, doneBatch, unlockBatch }) => {

        const opacity = (key) => {
            if (key === tapBatch || key === doneBatch || key === unlockBatch) return 1;
            return 0.35;
        };

        const Badge = ({ label, color, textColor = '#fff' }) => (
            <View style={{
                position: 'absolute', bottom: -10, alignSelf: 'center',
                backgroundColor: color, borderRadius: 8,
                paddingHorizontal: 6, paddingVertical: 2,
                shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 3, elevation: 4,
            }}>
                <Text style={{ fontSize: baseFontSize * 0.68, fontWeight: '800', color: textColor }}>
                    {label}
                </Text>
            </View>
        );

        return (
            <View style={[styles.mockFrame, { width: mockW, height: mockH }]}>

                {/* ── Sky column ── */}
                <ImageBackground
                    source={require('../assets/selectWordBatchesView/skyBackground.png')}
                    resizeMode="cover"
                    style={styles.mockCol}
                >
                    {/* Flying High */}
                    <View style={{ height: '28%', width: '82%', opacity: opacity('flyingHigh') }}>
                        <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')} resizeMode="contain" style={imgStyle} />
                        {tapBatch === 'flyingHigh' && <Badge label="👆 TAP!" color="#FFD93D" textColor="#333" />}
                        {doneBatch === 'flyingHigh' && <Badge label="✅ Done!" color="#6BCB77" />}
                    </View>

                    {/* Sunny Island */}
                    <View style={{ height: '27%', width: '72%', opacity: opacity('sunnyIsland') }}>
                        <Image source={require('../assets/selectWordBatchesView/sunnyIsland.png')} resizeMode="contain" style={imgStyle} />
                        {unlockBatch === 'sunnyIsland' && <Badge label="🔓 Unlocked!" color="#6BCB77" />}
                    </View>

                    {/* Springtime Fun */}
                    <View style={{ height: '30%', width: '90%', opacity: opacity('springtimeFun') }}>
                        <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                </ImageBackground>

                {/* ── Space column ── */}
                <ImageBackground
                    source={require('../assets/selectWordBatchesView/spaceBackground.png')}
                    resizeMode="cover"
                    style={styles.mockCol}
                >
                    <View style={{ height: '25%', width: '80%', opacity: opacity('alienAdventures') }}>
                        <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={{ height: '30%', width: '80%', opacity: opacity('outerSpace') }}>
                        <Image source={require('../assets/selectWordBatchesView/outerSpace.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={{ height: '25%', width: '80%', opacity: opacity('planetsAndBeyond') }}>
                        <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                </ImageBackground>

                {/* ── Beach column ── */}
                <ImageBackground
                    source={require('../assets/selectWordBatchesView/beachBackground.png')}
                    resizeMode="cover"
                    style={[styles.mockCol, { justifyContent: 'center' }]}
                >
                    <View style={{ height: '38%', width: '82%', opacity: opacity('divingDeep') }}>
                        <Image source={require('../assets/selectWordBatchesView/divingDeep.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                </ImageBackground>

            </View>
        );
    };

    // ─── Flying High word screen mock (Step 2) ────────────────────────────────
    const FlyingHighWordMock = () => {
        const wordMockH = isLandscape ? screenHeight * 0.40 : screenHeight * 0.25;
        const wordMockW = wordMockH * 1.55;
        const cloudFontSize = baseFontSize * 0.72;

        // Completed cloud: white, bold dark text, checkmark
        // Incomplete cloud: translucent, faded text
        // Tap cloud: translucent with yellow border + 👆
        const Cloud = ({ word, done = false, tap = false }) => (
            <View style={{
                backgroundColor: done ? '#ffffff' : 'rgba(255,255,255,0.45)',
                borderRadius: 18,
                paddingHorizontal: 7,
                paddingVertical: 5,
                alignItems: 'center',
                borderWidth: tap ? 2.5 : 0,
                borderColor: '#FFD93D',
                margin: 3,
                shadowColor: '#000',
                shadowOpacity: done ? 0.12 : 0,
                shadowRadius: 3,
                elevation: done ? 2 : 0,
            }}>
                <Text style={{
                    fontSize: cloudFontSize,
                    fontWeight: done ? '800' : '500',
                    color: done ? '#111' : '#5a8fa8',
                }}>
                    {word}{done ? ' ☑' : ''}
                </Text>
                {tap && (
                    <Text style={{ fontSize: cloudFontSize * 0.95, marginTop: 1 }}>👆 tap me!</Text>
                )}
            </View>
        );

        return (
            <View style={{
                width: wordMockW, height: wordMockH,
                backgroundColor: '#3EC8E8',
                borderRadius: 14, overflow: 'hidden',
                borderWidth: 3, borderColor: '#FFD93D',
                padding: 6,
                justifyContent: 'space-around',
            }}>
                {/* Row 1: completed words */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Cloud word="the" done />
                    <Cloud word="see" done />
                    <Cloud word="I" done />
                    <Cloud word="to" tap />
                </View>

                {/* Row 2: incomplete words */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Cloud word="and" />
                    <Cloud word="a" />
                    <Cloud word="you" />
                    <Cloud word="said" />
                </View>

                {/* Row 3: incomplete words */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Cloud word="go" />
                    <Cloud word="he" />
                    <Cloud word="was" />
                    <Cloud word="are" />
                </View>
            </View>
        );
    };

    // ─── Slides ───────────────────────────────────────────────────────────────
    const slides = [
        {
            key: 'welcome',
            emoji: '🌟',
            title: 'How to Play!',
            subtitle: 'Swipe to see the steps →',
            audio: audioFiles[0],
            content: () => (
                <Text style={{ fontSize: baseFontSize * 3.5, marginVertical: 8 }}>📚 ✏️</Text>
            ),
            buttonLabel: "Let's Learn! →",
        },
        {
            key: 'step1',
            emoji: '1️⃣',
            title: 'Tap a Word Batch!',
            subtitle: 'Find a group of words and tap it!',
            audio: audioFiles[1],
            content: () => <MiniMock tapBatch="flyingHigh" />,
            buttonLabel: 'Next →',
        },
        {
            key: 'step2',
            emoji: '2️⃣',
            title: 'Learn Every Word!',
            subtitle: 'Go through every word in the batch!',
            audio: audioFiles[2],
            content: () => <FlyingHighWordMock />,
            buttonLabel: 'Next →',
        },
        {
            key: 'step3',
            emoji: '3️⃣',
            title: 'Unlock the Next Batch!',
            subtitle: 'Finish one to open the next! 🔓',
            audio: audioFiles[3],
            content: () => (
                <View style={{ alignItems: 'center' }}>
                    <MiniMock doneBatch="flyingHigh" unlockBatch="sunnyIsland" />
                    <View style={styles.unlockBanner}>
                        <Text style={[styles.unlockBannerText, { fontSize: baseFontSize * 0.88 }]}>
                            ✅ Flying High done!{'  '}→{'  '}🔓 Sunny Island unlocked!
                        </Text>
                    </View>
                </View>
            ),
            buttonLabel: "Let's Go! 🚀",
        },
    ];

    // ─── Render ───────────────────────────────────────────────────────────────
    const renderSlide = ({ item }) => (
        <View style={{ width: screenWidth, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={[styles.card, {
                width: isLandscape ? '76%' : '90%',
                paddingVertical: isLandscape ? '2%' : '4%',
                paddingHorizontal: isLandscape ? '4%' : '6%',
            }]}>

                {/* Speaker button — top right corner of card */}
                <TouchableOpacity
                    style={[styles.speakerButton, isPlaying && styles.speakerButtonActive]}
                    onPress={() => handleSpeakerPress(item.audio)}
                >
                    <Text style={{ fontSize: baseFontSize * 1.4 }}>
                        {isPlaying ? '🔊' : '🔈'}
                    </Text>
                </TouchableOpacity>

                <Text style={{ fontSize: baseFontSize * 2.2, marginBottom: 2 }}>{item.emoji}</Text>
                <Text style={[styles.title, { fontSize: baseFontSize * 1.45 }]}>{item.title}</Text>
                <Text style={[styles.subtitle, { fontSize: baseFontSize * 0.9 }]}>{item.subtitle}</Text>

                <View style={styles.visualArea}>
                    {item.content()}
                </View>

                <TouchableOpacity style={styles.button} onPress={goNext}>
                    <Text style={[styles.buttonText, { fontSize: baseFontSize * 1.05 }]}>
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
            <SafeAreaView style={{ flex: 1 }}>
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
        backgroundColor: '#fff',   // solid white required for efficient shadow on iOS
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
        marginBottom: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    visualArea: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        width: '100%',
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
    mockFrame: {
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FFD93D',
        backgroundColor: '#000',   // required for shadow to render efficiently on iOS
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    mockCol: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 3,
    },
    unlockBanner: {
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 2,
        borderColor: '#6BCB77',
    },
    unlockBannerText: {
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
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

export default InstructionsView;
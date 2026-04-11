import React, { useState, useRef } from 'react';
import {
    ImageBackground, View, Text, StyleSheet,
    TouchableOpacity, FlatList, Image, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InstructionsView = ({ navigation, route }) => {
    const { email } = route.params;
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const [currentStep, setCurrentStep] = useState(0);
    const flatListRef = useRef(null);

    const calculateDimension = (ar, iPhoneVal, iPadMiniVal, iPadVal) => {
        if (ar > 1.7) return iPhoneVal;
        else if (ar > 1.4) return iPadMiniVal;
        else return iPadVal;
    };

    const baseFontSize = isLandscape
        ? calculateDimension(aspectRatio, 13, 15, 17)
        : calculateDimension(aspectRatio, 16, 18, 22);

    const TOTAL_SLIDES = 4;

    const goNext = () => {
        if (currentStep < TOTAL_SLIDES - 1) {
            const next = currentStep + 1;
            flatListRef.current?.scrollToIndex({ index: next, animated: true });
            setCurrentStep(next);
        } else {
            navigation.navigate('Select Word Batches', { email });
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

    // ─── Word list visual (Step 2) ─────────────────────────────────────────────
    const WordListMock = () => (
        <View style={{ width: '86%', backgroundColor: 'rgba(255,255,255,0.93)', borderRadius: 14, padding: 10, borderWidth: 3, borderColor: '#FFD93D' }}>
            {[
                { word: 'the', done: true  },
                { word: 'and', done: true  },
                { word: 'of',  done: false },
            ].map((item, i) => (
                <View key={i} style={{
                    flexDirection: 'row', alignItems: 'center',
                    backgroundColor: item.done ? '#6BCB77' : '#fff3c4',
                    borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12,
                    marginBottom: i < 2 ? 8 : 0,
                    borderWidth: !item.done ? 2 : 0, borderColor: '#FFD93D',
                }}>
                    <Text style={{ fontSize: baseFontSize * 1.1, marginRight: 10 }}>
                        {item.done ? '✅' : '👆'}
                    </Text>
                    <Text style={{ fontSize: baseFontSize, fontWeight: '700', color: item.done ? '#fff' : '#555' }}>
                        {item.word}
                    </Text>
                    {!item.done && (
                        <Text style={{ marginLeft: 'auto', fontSize: baseFontSize * 0.8, color: '#999' }}>
                            your turn!
                        </Text>
                    )}
                </View>
            ))}
        </View>
    );

    // ─── Slides ───────────────────────────────────────────────────────────────
    const slides = [
        {
            key: 'welcome',
            emoji: '🌟',
            title: 'How to Play!',
            subtitle: 'Swipe to see the steps →',
            content: () => (
                <Text style={{ fontSize: baseFontSize * 3.5, marginVertical: 8 }}>🎮 📚 ✏️</Text>
            ),
            buttonLabel: "Let's Learn! →",
        },
        {
            key: 'step1',
            emoji: '1️⃣',
            title: 'Tap a Word Batch!',
            subtitle: 'Find a group of words and tap it!',
            content: () => <MiniMock tapBatch="flyingHigh" />,
            buttonLabel: 'Next →',
        },
        {
            key: 'step2',
            emoji: '2️⃣',
            title: 'Learn Every Word!',
            subtitle: 'Go through every word in the batch!',
            content: () => <WordListMock />,
            buttonLabel: 'Next →',
        },
        {
            key: 'step3',
            emoji: '3️⃣',
            title: 'Unlock the Next Batch!',
            subtitle: 'Finish one to open the next! 🔓',
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
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
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
});

export default InstructionsView;

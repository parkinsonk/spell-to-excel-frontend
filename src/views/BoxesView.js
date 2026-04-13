import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet, Alert,
    PanResponder, useWindowDimensions, Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import boxesWordMapping from '../utils/boxesWordMapping';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useProgress } from '../components/ProgressContext';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const initializeCirclePositions = (length) =>
    Array.from({ length }, () => new Animated.ValueXY());

// ─── Component ───────────────────────────────────────────────────────────────

const BoxesView = ({ navigation, route }) => {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;
    const isLandscape = screenWidth > screenHeight;
    const { batch, activity, selectedWord } = route.params;

    // Use the text-based soundMapping instead of image-based boxesWordMapping
    const wordData    = boxesWordMapping[selectedWord] || { sounds: ['?'], colors: ['#ffffffff'] };
    const soundsList  = wordData.sounds;   // e.g. ['th', 'e']
    const colorsList  = wordData.colors;   // e.g. ['#ffffffff', '#ffffffff']
    const NUM_COLUMNS = soundsList.length;

    // Box sizing
    const BOX_WIDTH  = aspectRatio < 1.4 ? 145 : 75;
    const BOX_HEIGHT = aspectRatio < 1.4 ? 145 : 75;
    const BOX_MARGIN = aspectRatio < 1.4 ? 15  : 5;

    const {
        markActivityCompleted,
        checkFlyingHigh, checkSunnyIsland, checkSpringtimeFun,
        checkAlienAdventure, checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep,
    } = useProgress();

    // ── Back button ──────────────────────────────────────────────────────────
    const handleCustomBackAction = async () => {
        Alert.alert("Congrats!", "You've completed the Sounds activity.");
        await markActivityCompleted(activity, selectedWord);
        if      (batch === 'Flying High')       await checkFlyingHigh('Flying High');
        else if (batch === 'Sunny Island')      await checkSunnyIsland('Sunny Island');
        else if (batch === 'SpringTime Fun')    await checkSpringtimeFun('SpringTime Fun');
        else if (batch === 'Alien Adventures')  await checkAlienAdventure('Alien Adventures');
        else if (batch === 'Outer Space')       await checkOuterSpace('Outer Space');
        else if (batch === 'Planets and Beyond') await checkPlanetsAndBeyond('Planets and Beyond');
        else if (batch === 'Diving Deep')       await checkDivingDeep('Diving Deep');
        navigation.goBack();
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={handleCustomBackAction} style={{ marginLeft: 10 }}>
                    <Image source={require('../assets/back.png')} style={{ width: 60, height: 60 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // ── Drawing state ────────────────────────────────────────────────────────
    const [paths, setPaths]               = useState([]);
    const [color, setColor]               = useState('black');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorOptions = ['black', 'red', 'blue', 'green', 'yellow', 'purple'];

    // Track the background view's position on screen so we can convert
    // absolute pageX/pageY touch coords into SVG-local coords.
    const backgroundRef = useRef(null);
    const viewOffset    = useRef({ x: 0, y: 0 });

    // ── Layout state ─────────────────────────────────────────────────────────
    const [middleContainerWidth, setMiddleContainerWidth] = useState(0);
    const [orientationStyles, setOrientationStyles]       = useState({});

    // ── Draggable dot state ──────────────────────────────────────────────────
    // One Animated.ValueXY per sound — initialise once
    const [circlePositions] = useState(() => initializeCirclePositions(soundsList.length));

    // ── Orientation ──────────────────────────────────────────────────────────
    useEffect(() => {
        const update = async () => {
            const o = await ScreenOrientation.getOrientationAsync();
            const landscape =
                o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
                o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
            setOrientationStyles(landscape ? styles.landscape : styles.portrait);
        };
        update();
        const sub = ScreenOrientation.addOrientationChangeListener(update);
        return () => ScreenOrientation.removeOrientationChangeListener(sub);
    }, []);

    // ── Box layout helper ────────────────────────────────────────────────────
    const calculateBoxLeftPosition = (index) => {
        const totalWidth = NUM_COLUMNS * (BOX_WIDTH + BOX_MARGIN) - BOX_MARGIN;
        const startX = (middleContainerWidth - totalWidth) / 2;
        return startX + index * (BOX_WIDTH + BOX_MARGIN);
    };

    // ── Drawing PanResponder ─────────────────────────────────────────────────
    // pageX/pageY are absolute screen coordinates — consistent regardless of
    // which child view the touch lands on. We subtract the background View's
    // on-screen position (stored in viewOffset) to get SVG-local coords.
    const currentPath = useRef('');
    const drawPanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const x = evt.nativeEvent.pageX - viewOffset.current.x;
                const y = evt.nativeEvent.pageY - viewOffset.current.y;
                currentPath.current = `M${x},${y}`;
                setPaths(prev => [...prev, currentPath.current]);
            },
            onPanResponderMove: (evt) => {
                const x = evt.nativeEvent.pageX - viewOffset.current.x;
                const y = evt.nativeEvent.pageY - viewOffset.current.y;
                currentPath.current += ` L${x},${y}`;
                setPaths(prev => [
                    ...prev.slice(0, -1),
                    currentPath.current,
                ]);
            },
        })
    ).current;

    // ── Dot PanResponders — one per sound ────────────────────────────────────
    const circlePanResponders = useRef(
        circlePositions.map((pos) =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    pos.setOffset({ x: pos.x._value, y: pos.y._value });
                    pos.setValue({ x: 0, y: 0 });
                },
                onPanResponderMove: Animated.event(
                    [null, { dx: pos.x, dy: pos.y }],
                    { useNativeDriver: false }
                ),
                onPanResponderRelease: () => {
                    pos.flattenOffset();
                },
            })
        )
    ).current;

    // ── Vertical positions for the two rows ──────────────────────────────────
    // Sound boxes + dots live in the upper band; empty drop targets below.
    const soundRowTop  = aspectRatio < 1.4 ? '28%' : '22%';  // row showing the grapheme text
    const targetRowTop = aspectRatio < 1.4 ? '55%' : '50%';  // empty drop-target boxes

    // ── Shared row renderer (used for both landscape & portrait) ─────────────
    const renderBoxRows = () => (
        <>
            {soundsList.map((sound, index) => {
                const left = calculateBoxLeftPosition(index);
                const dotOffset = screenWidth * 0.02;

                return (
                    <React.Fragment key={index}>

                        {/* ── Sound box (upper row) — shows the grapheme text ── */}
                        <View
                            style={[
                                localStyles.soundBox,
                                {
                                    width: BOX_WIDTH,
                                    height: BOX_HEIGHT,
                                    top: soundRowTop,
                                    left,
                                },
                            ]}
                        >
                            <Text style={[
                                localStyles.soundText,
                                { fontSize: BOX_WIDTH * 0.32 },
                            ]}>
                                {sound}
                            </Text>
                        </View>

                        {/* ── White draggable dot (starts over the sound box) ── */}
                        <Animated.View
                            {...circlePanResponders[index].panHandlers}
                            style={[
                                localStyles.dot,
                                {
                                    width:  BOX_WIDTH  - screenWidth  * 0.04,
                                    height: BOX_HEIGHT - screenHeight * 0.05,
                                    left:   left + dotOffset,
                                    top:    soundRowTop,
                                    transform: circlePositions[index].getTranslateTransform(),
                                },
                            ]}
                        />

                        {/* ── Empty drop-target box (lower row) ── */}
                        <View
                            style={[
                                localStyles.targetBox,
                                {
                                    width:  BOX_WIDTH,
                                    height: BOX_HEIGHT,
                                    top:    targetRowTop,
                                    left,
                                },
                            ]}
                        />

                    </React.Fragment>
                );
            })}
        </>
    );

    // ── Toolbar (sound button, eraser, crayon) ───────────────────────────────
    const renderToolbar = (containerStyle, leftStyle, rightStyle) => (
        <View style={containerStyle}>
            <View style={leftStyle}>
                <TouchableOpacity
                    style={localStyles.toolButton}
                    onPress={() => console.log('sound button pressed')}
                >
                    <Image
                        source={require('../assets/traceViews/sound.png')}
                        style={localStyles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={rightStyle}>
                <TouchableOpacity
                    style={localStyles.toolButton}
                    onPress={() => setPaths([])}
                >
                    <Image
                        source={require('../assets/traceViews/eraser.png')}
                        style={localStyles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={localStyles.toolButton}
                    onPress={() => setShowColorPicker(v => !v)}
                >
                    <Image
                        source={require('../assets/traceViews/crayonBox.png')}
                        style={localStyles.toolImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <View
            ref={backgroundRef}
            style={styles.background}
            {...drawPanResponder.panHandlers}
            onLayout={() => {
                backgroundRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
                    viewOffset.current = { x: pageX, y: pageY };
                });
            }}
        >

            {/* SVG drawing layer — renders strokes, sits behind interactive elements */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <Svg height={screenHeight} width={screenWidth}>
                    {paths.map((path, i) => (
                        <Path
                            key={i}
                            d={path}
                            stroke={color}
                            fill="none"
                            strokeWidth={aspectRatio < 1.4 ? 12 : 7}
                        />
                    ))}
                </Svg>
            </View>

            {/* Main content area */}
            <View
                style={styles.middle}
                onLayout={e => setMiddleContainerWidth(e.nativeEvent.layout.width)}
                pointerEvents="box-none"
            >
                {renderBoxRows()}
            </View>

            {/* Toolbar */}
            {renderToolbar(
                styles.toolbar,
                styles.toolbarLeft,
                styles.toolbarRight,
            )}

            {/* Color picker overlay */}
            {showColorPicker && (
                <View style={localStyles.colorPicker}>
                    {colorOptions.map((c, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[localStyles.colorSwatch, { backgroundColor: c }]}
                            onPress={() => { setColor(c); setShowColorPicker(false); }}
                        />
                    ))}
                </View>
            )}

        </View>
    );
};

// ─── Layout styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#0CCFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    toolbarLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    toolbarRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

// ─── Local element styles ─────────────────────────────────────────────────────

const localStyles = StyleSheet.create({
    // Box that displays the grapheme/sound text
    soundBox: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    soundText: {
        fontWeight: '800',
        color: '#1a1a1a',
        textAlign: 'center',
    },
    // Draggable white dot — starts on top of the sound box
    dot: {
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#ccc',
        zIndex: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    // Empty box below — the drop target
    targetBox: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        zIndex: 1,
    },
    // Toolbar buttons
    toolButton: {
        width: 80,
        height: 80,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolImage: {
        width: '100%',
        height: '100%',
    },
    // Color picker popup
    colorPicker: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    colorSwatch: {
        width: 44,
        height: 44,
        margin: 5,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default BoxesView;
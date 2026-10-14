
import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  PanResponder,
  useWindowDimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';

import Svg, { Path } from 'react-native-svg';
import boxesWordMapping from '../utils/boxesWordMapping';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useProgress } from '../components/ProgressContext';

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

const initializeCirclePositions = (length) =>
  Array.from({ length }, () => new Animated.ValueXY());

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------

const BoxesView = ({ navigation, route }) => {
  const {
    width: screenWidth,
    height: screenHeight,
  } = useWindowDimensions();

  const aspectRatio = screenWidth / screenHeight;
  const isLandscape = screenWidth > screenHeight;

  const { batch, activity, selectedWord } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  // ------------------------------------------------
  // WORD DATA
  // ------------------------------------------------

  const wordData = boxesWordMapping[selectedWord] || {
    sounds: ['?'],
    colors: ['#ffffffff'],
  };

  const soundsList = wordData.sounds;
  const colorsList = wordData.colors;
  const NUM_COLUMNS = soundsList.length;

  // ------------------------------------------------
  // BOX SIZING
  // ------------------------------------------------

  const BOX_WIDTH = aspectRatio < 1.4 ? 145 : 75;
  const BOX_HEIGHT = aspectRatio < 1.4 ? 145 : 75;
  const BOX_MARGIN = aspectRatio < 1.4 ? 15 : 5;

  // ------------------------------------------------
  // PROGRESS CONTEXT
  // ------------------------------------------------

  const {
    markActivityCompleted,
    checkFlyingHigh,
    checkSunnyIsland,
    checkSpringtimeFun,
    checkAlienAdventure,
    checkOuterSpace,
    checkPlanetsAndBeyond,
    checkDivingDeep,
  } = useProgress();

  // ------------------------------------------------
  // BACK BUTTON
  // ------------------------------------------------

  const handleCustomBackAction = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await markActivityCompleted(activity, selectedWord);

      if (batch === 'Flying High') {
        await checkFlyingHigh('Flying High');
      } else if (batch === 'Sunny Island') {
        await checkSunnyIsland('Sunny Island');
      } else if (batch === 'SpringTime Fun') {
        await checkSpringtimeFun('SpringTime Fun');
      } else if (batch === 'Alien Adventures') {
        await checkAlienAdventure('Alien Adventures');
      } else if (batch === 'Outer Space') {
        await checkOuterSpace('Outer Space');
      } else if (batch === 'Planets and Beyond') {
        await checkPlanetsAndBeyond('Planets and Beyond');
      } else if (batch === 'Diving Deep') {
        await checkDivingDeep('Diving Deep');
      }

      Alert.alert(
        'Congrats!',
        "You've completed the Sounds activity."
      );

      navigation.goBack();

    } catch (error) {
      console.error('Error completing activity:', error);

      Alert.alert(
        'Error',
        'Something went wrong. Please try again.'
      );

    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------
  // NAVIGATION HEADER
  // ------------------------------------------------

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleCustomBackAction}
          disabled={isLoading}
          style={{
            marginLeft: 10,
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <Image
            source={require('../assets/back.png')}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isLoading]);

  // ------------------------------------------------
  // DRAWING STATE
  // ------------------------------------------------

  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState('black');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorOptions = [
    'black',
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
  ];

  const backgroundRef = useRef(null);
  const viewOffset = useRef({ x: 0, y: 0 });

  // ------------------------------------------------
  // LAYOUT STATE
  // ------------------------------------------------

  const [middleContainerWidth, setMiddleContainerWidth] =
    useState(0);

  const [orientationStyles, setOrientationStyles] =
    useState({});

  // ------------------------------------------------
  // DRAGGABLE DOT STATE
  // ------------------------------------------------

  const [circlePositions] = useState(() =>
    initializeCirclePositions(soundsList.length)
  );

  // ------------------------------------------------
  // ORIENTATION
  // ------------------------------------------------

  useEffect(() => {
    const update = async () => {
      const o = await ScreenOrientation.getOrientationAsync();

      const landscape =
        o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;

      setOrientationStyles(
        landscape ? styles.landscape : styles.portrait
      );
    };

    update();

    const sub =
      ScreenOrientation.addOrientationChangeListener(update);

    return () =>
      ScreenOrientation.removeOrientationChangeListener(sub);
  }, []);

  // ------------------------------------------------
  // BOX LAYOUT HELPER
  // ------------------------------------------------

  const calculateBoxLeftPosition = (index) => {
    const totalWidth =
      NUM_COLUMNS * (BOX_WIDTH + BOX_MARGIN) - BOX_MARGIN;

    const startX =
      (middleContainerWidth - totalWidth) / 2;

    return startX + index * (BOX_WIDTH + BOX_MARGIN);
  };

  // ------------------------------------------------
  // DRAWING PAN RESPONDER
  // ------------------------------------------------

  const currentPath = useRef('');

  const drawPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isLoading,

      onPanResponderGrant: (evt) => {
        const x =
          evt.nativeEvent.pageX - viewOffset.current.x;

        const y =
          evt.nativeEvent.pageY - viewOffset.current.y;

        currentPath.current = `M${x},${y}`;

        setPaths((prev) => [
          ...prev,
          currentPath.current,
        ]);
      },

      onPanResponderMove: (evt) => {
        const x =
          evt.nativeEvent.pageX - viewOffset.current.x;

        const y =
          evt.nativeEvent.pageY - viewOffset.current.y;

        currentPath.current += ` L${x},${y}`;

        setPaths((prev) => [
          ...prev.slice(0, -1),
          currentPath.current,
        ]);
      },
    })
  ).current;

  // ------------------------------------------------
  // DOT PAN RESPONDERS
  // ------------------------------------------------

  const circlePanResponders = useRef(
    circlePositions.map((pos) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isLoading,

        onPanResponderGrant: () => {
          pos.setOffset({
            x: pos.x._value,
            y: pos.y._value,
          });

          pos.setValue({
            x: 0,
            y: 0,
          });
        },

        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: pos.x,
              dy: pos.y,
            },
          ],
          {
            useNativeDriver: false,
          }
        ),

        onPanResponderRelease: () => {
          pos.flattenOffset();
        },
      })
    )
  ).current;

  // ------------------------------------------------
  // VERTICAL POSITIONS
  // ------------------------------------------------

  const soundRowTop =
    aspectRatio < 1.4 ? '28%' : '22%';

  const targetRowTop =
    aspectRatio < 1.4 ? '55%' : '50%';

  // ------------------------------------------------
  // RENDER BOX ROWS
  // ------------------------------------------------

  const renderBoxRows = () => (
    <>
      {soundsList.map((sound, index) => {
        const left =
          calculateBoxLeftPosition(index);

        const dotOffset =
          screenWidth * 0.02;

        return (
          <React.Fragment key={index}>

            {/* SOUND BOX */}

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
              <Text
                style={[
                  localStyles.soundText,
                  {
                    fontSize: BOX_WIDTH * 0.32,
                  },
                ]}
              >
                {sound}
              </Text>
            </View>

            {/* DRAGGABLE DOT */}

            <Animated.View
              {...circlePanResponders[index].panHandlers}
              style={[
                localStyles.dot,
                {
                  width:
                    BOX_WIDTH - screenWidth * 0.04,

                  height:
                    BOX_HEIGHT - screenHeight * 0.05,

                  left:
                    left + dotOffset,

                  top:
                    soundRowTop,

                  transform:
                    circlePositions[index]
                      .getTranslateTransform(),
                },
              ]}
            />

            {/* TARGET BOX */}

            <View
              style={[
                localStyles.targetBox,
                {
                  width: BOX_WIDTH,
                  height: BOX_HEIGHT,
                  top: targetRowTop,
                  left,
                },
              ]}
            />

          </React.Fragment>
        );
      })}
    </>
  );

  // ------------------------------------------------
  // TOOLBAR
  // ------------------------------------------------

  const renderToolbar = (
    containerStyle,
    leftStyle,
    rightStyle
  ) => (
    <View style={containerStyle}>

      {/* LEFT SIDE - INSTRUCTIONS */}

      <View style={leftStyle}>

        <Pressable
          onPress={() =>
            navigation.navigate('Sounds Instructions')
          }
          style={localStyles.toolButton}
          disabled={isLoading}
        >
          <Image
            source={require('../assets/instructionsVideo.png')}
            style={localStyles.toolImage}
            resizeMode="contain"
          />
        </Pressable>

      </View>

      {/* RIGHT SIDE - ERASER AND COLORS */}

      <View style={rightStyle}>

        <TouchableOpacity
          style={localStyles.toolButton}
          disabled={isLoading}
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
          disabled={isLoading}
          onPress={() =>
            setShowColorPicker((v) => !v)
          }
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

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <View
      ref={backgroundRef}
      style={styles.background}
      {...drawPanResponder.panHandlers}
      onLayout={() => {
        backgroundRef.current?.measure(
          (
            _x,
            _y,
            _w,
            _h,
            pageX,
            pageY
          ) => {
            viewOffset.current = {
              x: pageX,
              y: pageY,
            };
          }
        );
      }}
    >

      {/* DRAWING LAYER */}

      <View
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Svg
          height={screenHeight}
          width={screenWidth}
        >
          {paths.map((path, i) => (
            <Path
              key={i}
              d={path}
              stroke={color}
              fill="none"
              strokeWidth={
                aspectRatio < 1.4 ? 12 : 7
              }
            />
          ))}
        </Svg>
      </View>

      {/* SOUND BOXES AND DOTS */}

      <View
        style={styles.middle}
        onLayout={(e) =>
          setMiddleContainerWidth(
            e.nativeEvent.layout.width
          )
        }
        pointerEvents="box-none"
      >
        {renderBoxRows()}
      </View>

      {/* TOOLBAR */}

      {renderToolbar(
        styles.toolbar,
        styles.toolbarLeft,
        styles.toolbarRight
      )}

      {/* COLOR PICKER */}

      {showColorPicker && (
        <View style={localStyles.colorPicker}>
          {colorOptions.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={[
                localStyles.colorSwatch,
                {
                  backgroundColor: c,
                },
              ]}
              disabled={isLoading}
              onPress={() => {
                setColor(c);
                setShowColorPicker(false);
              }}
            />
          ))}
        </View>
      )}

      {/* LOADING OVERLAY */}

      {isLoading && (
        <View
          style={localStyles.loadingOverlay}
          pointerEvents="auto"
        >
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />

          <Text style={localStyles.loadingText}>
            Saving Progress...
          </Text>
        </View>
      )}

    </View>
  );
};

// ------------------------------------------------
// LAYOUT STYLES
// ------------------------------------------------

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

// ------------------------------------------------
// LOCAL ELEMENT STYLES
// ------------------------------------------------

const localStyles = StyleSheet.create({
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

  targetBox: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    zIndex: 1,
  },

  toolButton: {
    width: 120,
    height: 100,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  toolImage: {
    width: '100%',
    height: '100%',
  },

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

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    zIndex: 999,
    elevation: 999,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default BoxesView;

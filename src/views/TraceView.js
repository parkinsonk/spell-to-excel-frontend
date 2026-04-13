import React, { useState, useEffect, useRef } from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  Alert,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import traceWordMapping from '../utils/traceWordMapping';
import { useProgress } from '../components/ProgressContext';
import * as ScreenOrientation from 'expo-screen-orientation';

const TraceView = ({ navigation, route }) => {
  const { batch, activity, selectedWord } = route.params;
  const traceBackground = traceWordMapping[selectedWord] || traceWordMapping.default;
  const coverBackground = require('../assets/traceViews/blankTraceBackground.png');

  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState('black');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackground, setBackground] = useState(traceBackground);
  const [orientationStyles, setOrientationStyles] = useState({});

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const aspectRatio = screenWidth / screenHeight;

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

  const currentPath = useRef('');
  const currentStrokeColor = useRef(color);

  const handleCustomBackAction = async () => {
    Alert.alert("Congrats!", "You've completed the Trace, Copy, Cover activity.");
    await markActivityCompleted(activity, selectedWord);

    if (batch === 'Flying High') await checkFlyingHigh('Flying High');
    else if (batch === 'Sunny Island') await checkSunnyIsland('Sunny Island');
    else if (batch === 'SpringTime Fun') await checkSpringtimeFun('SpringTime Fun');
    else if (batch === 'Alien Adventures') await checkAlienAdventure('Alien Adventures');
    else if (batch === 'Outer Space') await checkOuterSpace('Outer Space');
    else if (batch === 'Planets and Beyond') await checkPlanetsAndBeyond('Planets and Beyond');
    else if (batch === 'Diving Deep') await checkDivingDeep('Diving Deep');

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

  useEffect(() => {
    currentStrokeColor.current = color;
  }, [color]);

  const setTraceBackground = () => setBackground(traceBackground);
  const setCoverBackground = () => setBackground(coverBackground);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const { locationX: x, locationY: y } = evt.nativeEvent;
        currentPath.current = `M${x},${y}`;

        setPaths((prev) => [
          ...prev,
          {
            d: currentPath.current,
            color: currentStrokeColor.current,
          },
        ]);
      },

      onPanResponderMove: (evt) => {
        const { locationX: x, locationY: y } = evt.nativeEvent;
        currentPath.current += ` L${x},${y}`;

        setPaths((prev) => {
          if (prev.length === 0) return prev;
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            d: currentPath.current,
          };
          return updated;
        });
      },

      onPanResponderRelease: () => {
        currentPath.current = '';
      },

      onPanResponderTerminate: () => {
        currentPath.current = '';
      },
    })
  ).current;

  useEffect(() => {
    const update = async () => {
      const o = await ScreenOrientation.getOrientationAsync();
      const landscape =
        o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;

      setOrientationStyles(
        landscape ? styles(aspectRatio).landscape : styles(aspectRatio).portrait
      );
    };

    update();
    const sub = ScreenOrientation.addOrientationChangeListener(update);

    return () => ScreenOrientation.removeOrientationChangeListener(sub);
  }, [aspectRatio]);

  const colorOptions = ['black', 'red', 'blue', 'green', 'yellow', 'purple'];

  const renderCanvas = (containerStyle) => (
    <View {...panResponder.panHandlers} style={containerStyle}>
      <Svg
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path.d}
            stroke={path.color}
            fill="none"
            strokeWidth={15}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    </View>
  );

  const renderToolbar = (s) => (
    <View style={s.lowerContainer}>
      <View style={s.lowerContainerLeft}>
        <TouchableOpacity style={s.eraser} onPress={() => setPaths([])}>
          <Image source={require('../assets/traceViews/eraser.png')} style={s.eraserImage} />
        </TouchableOpacity>

        <TouchableOpacity style={s.crayonBox} onPress={() => setShowColorPicker((v) => !v)}>
          <Image source={require('../assets/traceViews/crayonBox.png')} style={s.crayonBoxImage} />
        </TouchableOpacity>
      </View>

      <View style={s.lowerContainerMiddle}>
        <TouchableOpacity style={s.sound} onPress={() => console.log('Sound button pressed')}>
          <Image source={require('../assets/traceViews/sound.png')} style={s.soundImage} />
        </TouchableOpacity>
      </View>

      <View style={s.lowerContainerRight}>
        <TouchableOpacity style={s.trace} onPress={setTraceBackground}>
          <Image source={require('../assets/traceViews/trace.png')} style={s.traceImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={s.cover}
          onPress={() => {
            setCoverBackground();
            setPaths([]);
          }}
        >
          <Image source={require('../assets/traceViews/try.png')} style={s.coverImage} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const s = orientationStyles;
  if (!s.background) return null;

  return (
    <ImageBackground source={showBackground} resizeMode="cover" style={s.background}>
      {renderCanvas(s.svgContainer)}

      {showColorPicker && (
        <View style={s.colorPickerContainer}>
          {colorOptions.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={[s.colorOption, { backgroundColor: c }]}
              onPress={() => {
                setColor(c);
                setShowColorPicker(false);
              }}
            />
          ))}
        </View>
      )}

      {renderToolbar(s)}
    </ImageBackground>
  );
};

const styles = (aspectRatio) => ({
  landscape: {
    background: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    svgContainer: {
      flex: 1,
      width: '100%',
      alignSelf: 'stretch',
      position: 'relative',
    },
    lowerContainer: {
      flex: 0.25,
      flexDirection: 'row',
      width: '100%',
    },
    lowerContainerLeft: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    lowerContainerMiddle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lowerContainerRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    eraser: {
      width: aspectRatio > 1.75 ? '27%' : '40%',
      height: aspectRatio > 1.75 ? '70%' : '20%',
      marginLeft: '5%',
    },
    eraserImage: { width: '100%', height: '100%' },
    crayonBox: {
      width: aspectRatio > 1.75 ? '16%' : '25%',
      height: aspectRatio > 1.75 ? '90%' : '70%',
      marginLeft: '15%',
    },
    crayonBoxImage: { width: '100%', height: '100%' },
    colorPickerContainer: {
      position: 'absolute',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    colorOption: { width: 50, height: 50, margin: 5 },
    trace: {
      width: aspectRatio > 1.75 ? '35%' : '43%',
      height: aspectRatio > 1.75 ? '90%' : '74%',
      marginRight: '5%',
    },
    traceImage: { width: '100%', height: '100%' },
    cover: {
      width: aspectRatio > 1.75 ? '32%' : '40%',
      height: aspectRatio > 1.75 ? '94%' : '75%',
      marginRight: '15%',
    },
    coverImage: { width: '100%', height: '100%' },
    sound: {
      width: '20%',
      height: aspectRatio > 1.75 ? '50%' : '35%',
      marginLeft: '5%',
    },
    soundImage: { width: '100%', height: '100%' },
  },

  portrait: {
    background: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    svgContainer: {
      flex: 1,
      width: '100%',
      alignSelf: 'stretch',
      position: 'relative',
    },
    lowerContainer: {
      flex: 0.25,
      flexDirection: 'row',
      width: '100%',
    },
    lowerContainerLeft: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    lowerContainerMiddle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lowerContainerRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    eraser: {
      width: aspectRatio > 1.75 ? '27%' : '40%',
      height: aspectRatio > 1.75 ? '70%' : '30%',
      marginLeft: '5%',
    },
    eraserImage: { width: '100%', height: '100%' },
    crayonBox: {
      width: aspectRatio > 1.75 ? '16%' : '35%',
      height: aspectRatio > 1.75 ? '90%' : '45%',
      marginLeft: '15%',
    },
    crayonBoxImage: { width: '100%', height: '100%' },
    colorPickerContainer: {
      position: 'absolute',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    colorOption: { width: 50, height: 50, margin: 5 },
    trace: {
      width: aspectRatio > 1.75 ? '35%' : '48%',
      height: aspectRatio > 1.75 ? '90%' : '40%',
      marginRight: '5%',
    },
    traceImage: { width: '100%', height: '100%' },
    cover: {
      width: aspectRatio > 1.75 ? '32%' : '45%',
      height: aspectRatio > 1.75 ? '94%' : '41%',
      marginRight: '15%',
    },
    coverImage: { width: '100%', height: '100%' },
    sound: {
      width: aspectRatio > 1.75 ? '20%' : '30%',
      height: aspectRatio > 1.75 ? '50%' : '30%',
      marginLeft: '5%',
    },
    soundImage: { width: '100%', height: '100%' },
  },
});

export default TraceView;
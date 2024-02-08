import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import activitiesWordMapping from '../utils/activitiesWordMapping';
import { SafeAreaView } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TraceView = ({ navigation, route }) => {
  const { batch, activity, selectedWord } = route.params;
  const background = activitiesWordMapping[batch]?.[activity]?.[selectedWord] || activitiesWordMapping.default;
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState("black"); // Ensure color state is defined

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      // Start a new path with M command    
      correctionFactor = 20;
      const correctedY0 = gestureState.y0 - correctionFactor;
      const newPoint = `M${gestureState.x0},${correctedY0}`;
      setPaths((prevPaths) => [...prevPaths, newPoint]);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Add line to command to the current path
      correctionFactor = 20;
      const correctedMoveY = gestureState.moveY - correctionFactor;
      const newPoint = `L${gestureState.moveX},${correctedMoveY}`;
      setPaths((prevPaths) => [...prevPaths.slice(0, -1), prevPaths[prevPaths.length - 1] + ' ' + newPoint]);
    },
    onPanResponderRelease: () => {
      // Path finalization logic (if any) can go here
    },
  });

  const handleClearButtonClick = () => {
    setPaths([]);
  };

  const handleChangeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    
    <ImageBackground source={background} resizeMode="cover" style={styles.background}>
      <View {...panResponder.panHandlers} style={styles.svgContainer}>
        <Svg height={screenHeight} width={screenWidth}>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke={color}
              fill="none"
              strokeWidth={15}
            />
          ))}
        </Svg>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleClearButtonClick}>
        <Image source={require('../assets/traceViews/eraser.png')} style={styles.Image} />
      </TouchableOpacity>
      {/* Additional buttons for changing color */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 4,
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  Image: {
    width: 50,
    height: 50,
  },
});

export default TraceView;
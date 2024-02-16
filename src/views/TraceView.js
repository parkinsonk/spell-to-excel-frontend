import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Dimensions, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import activitiesWordMapping from '../utils/activitiesWordMapping';
import { SafeAreaView } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TraceView = ({ navigation, route }) => {
  const { batch, activity, selectedWord } = route.params;
  const traceBackground = activitiesWordMapping[batch]?.[activity]?.[selectedWord] || activitiesWordMapping.default;
  const coverBackground = require('../assets/traceViews/blankTraceBackground.png')
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState("black"); // Ensure color state is defined
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackground, setBackground] = useState(traceBackground);

  
  const setTraceBackground = () => {
    setBackground(traceBackground); // Set the background to trace image
  };
  
  const setCoverBackground = () => {
    setBackground(coverBackground); // Set the background to cover image
  };

  const colorOptions = ["black", "red", "blue", "green", "yellow", "purple"];

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

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
    <ImageBackground source={showBackground} resizeMode="cover" style={styles.background}>
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
      
      <TouchableOpacity style={styles.eraser} onPress={handleClearButtonClick}>
        <Image source={require('../assets/traceViews/eraser.png')} style={styles.eraserImage} />
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.crayonBox} onPress={toggleColorPicker}>
        <Image source={require('../assets/traceViews/crayonBox.png')} style={styles.crayonBoxImage} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.trace} onPress={setTraceBackground}>
        <Image source={require('../assets/traceViews/trace.png')} style={styles.traceImage} />
      </TouchableOpacity>

      <View style={styles.copy} onPress={onPress={toggleColorPicker}}>  
        <Image source={require('../assets/traceViews/copy.png')} style={styles.copyImage} />
      </View>

      <TouchableOpacity style={styles.cover} onPress={setCoverBackground}>
        <Image source={require('../assets/traceViews/cover.png')} style={styles.coverImage} />
      </TouchableOpacity>
  
      {/* Color Picker Overlay */}
      {showColorPicker && (
        <View style={styles.colorPickerContainer}>
          {colorOptions.map((optionColor, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorOption, {backgroundColor: optionColor}]}
              onPress={() => {
                handleChangeColor(optionColor);
                toggleColorPicker(); // Hide color picker after selection
              }}
            />
          ))}
        </View>
      )}
  
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
    resizeMode: 'contain',
    
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eraser: {
    position: 'absolute',
    left: 200,
    bottom: 20,
  },
crayonBox: {
    position: 'absolute',
    left: 0,
    bottom: 20,
},
crayonBoxImage: {
    width: 100,
    height: 100,
    borderColor: 'black',
    marginLeft: 50,
},
  eraserImage: {
    width: 100,
    height: 50,
    borderColor: 'black',

  },
  colorPickerContainer: {
    position: 'absolute',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOption: {
    width: 50,
    height: 50,
    margin: 5,
  },
  trace: {
    position: 'absolute',
    right: screenWidth * .05,
    top: screenHeight * .2,
  },
  traceImage: {
    width: screenWidth * .12,
    height: screenHeight * .12,
    borderColor: 'black',
    marginRight: 50,
  },
  copy: {
    position: 'absolute',
    right: screenWidth * .05,
    top: screenHeight * .45,
  },
  copyImage: {
    width: screenWidth * .12,
    height: screenHeight * .12,
    borderColor: 'black',
    marginRight: 50,
  },

  cover: {
    position: 'absolute',
    right: screenWidth * .05,
    top: screenHeight * .7,
  },
  coverImage: {
    width: screenWidth * .12,
    height: screenHeight * .125,
    borderColor: 'black',
    marginRight: 50,
  },
});

export default TraceView;
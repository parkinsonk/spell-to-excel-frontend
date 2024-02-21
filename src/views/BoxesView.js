import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Dimensions, PanResponder, useWindowDimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import boxesWordMapping from '../utils/boxesWordMapping';

const BoxesView = ({ navigation, route  }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;
    const { batch, activity, selectedWord } = route.params;
    const lettersList = boxesWordMapping[selectedWord] || boxesWordMapping.default;
    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState("black"); // Ensure color state is defined
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [boxesLayout, setBoxesLayout] = useState({});

    const BOX_WIDTH = 150; // Width of each box
    const BOX_HEIGHT = 150; // Height of each box
    const BOX_MARGIN = 10; // Margin between boxes
    const NUM_COLUMNS = lettersList.length; // Number of boxes per row
    
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

      const handleBoxPositioning = (index) => (event) => {
        const {x, y, width, height} = event.nativeEvent.layout;
        setBoxesLayout(prevLayout => ({
          ...prevLayout,
          [index]: { x, y, width, height }
        }));
      };

        // Calculates the left position of a box based on its index
    const calculateBoxLeftPosition = (index, screenWidth) => {
        const rowPosition = index % NUM_COLUMNS; // Position of the box in the row (0, 1, 2, etc.)
        const totalMargin = BOX_MARGIN * (NUM_COLUMNS - 1); // Total margin between boxes in a row
        const totalWidth = BOX_WIDTH * NUM_COLUMNS + totalMargin; // Total width used by boxes and margins
        const startX = (screenWidth - totalWidth) / 2; // Starting X position to center boxes
        
        return startX + (BOX_WIDTH + BOX_MARGIN) * rowPosition; // Calculate left position
    };

    // Calculates the top position of a box based on its index
    const calculateTopPosition = (index, screenHeight) => {
        return screenHeight - screenHeight * .32; // Calculate top position
    };
    

      const styles = StyleSheet.create({
        background: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'contain',
            borderColor: 'blue',
            borderWidth: 5,
            
          },
          svgContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            borderColor: 'green',
            borderWidth: 2,
          },
          eraser: {
            position: 'absolute',
            left: 200,
            bottom: 20,
            zIndex: 3,
          },
        crayonBox: {
            position: 'absolute',
            left: 0,
            bottom: 20,
            zIndex: 3,
            borderColor: 'black',
            borderWidth: 2,
        },
        crayonBoxImage: {
            width: 100,
            height: 100,
            borderColor: 'black',
            marginLeft: 50,
            zIndex: 3,
        },
          eraserImage: {
            width: 100,
            height: 50,
            borderColor: 'black',
            borderWidth: 2,
            zIndex: 3,
        
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
            zIndex: 3,
          },
          colorOption: {
            width: 50,
            height: 50,
            margin: 5,
          },
          sound: {
            position: 'absolute',
            left: screenWidth * .17,
            top: screenHeight * .20,
            zIndex: 3,
          },
          soundImage: {
            width: aspectRatio > 1.5 ?  screenWidth * .10 : screenWidth * .10,
            height: aspectRatio > 1.5 ?  screenHeight * .15 : screenHeight * .10,
            borderColor: 'black',
            marginRight: 50,
          },
        box: {
            position: 'absolute',
            width: BOX_WIDTH,
            height: BOX_HEIGHT,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 10,
            margin: BOX_MARGIN, // Add margin to space out the boxes
            top: screenHeight * .6,
            zIndex: 1,
          },
    });

    return (

        <ImageBackground
            source={require('../assets/boxesViews/boxesBackground.png')}
            resizeMode="cover"
            style={styles.background}
        >
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

      <TouchableOpacity style={styles.sound} onPress={() => navigation.navigate('Boxes', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
        <Image source={require('../assets/traceViews/sound.png')} style={styles.soundImage} />
      </TouchableOpacity>

    
      {lettersList.map((letter, index) => (
    <React.Fragment key={index}>
        <View
            style={[styles.box, {
                left: calculateBoxLeftPosition(index, screenWidth),
            }]}
            onLayout={handleBoxPositioning(index)}
        />
        <View style={[styles.box, {
            top: screenHeight * .41,
            left: calculateBoxLeftPosition(index, screenWidth),
        }]} />
    </React.Fragment>
    ))}

  
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
      </ImageBackground>

    );
};



export default BoxesView;
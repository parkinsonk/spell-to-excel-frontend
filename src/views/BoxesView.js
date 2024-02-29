import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Dimensions, PanResponder, useWindowDimensions, Animated} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import boxesWordMapping from '../utils/boxesWordMapping';

// Initialize with Animated.Value for each circle position
const initializeCirclePositions = (length) => Array.from({ length }, () => new Animated.ValueXY());

const BoxesView = ({ navigation, route  }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;
    const { batch, activity, selectedWord } = route.params;
    const lettersList = boxesWordMapping[selectedWord]?.images || boxesWordMapping['default'].images;
    const colorsList = boxesWordMapping[selectedWord]?.colors || boxesWordMapping['default'].colors;
    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState("black"); // Ensure color state is defined
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [boxesLayout, setBoxesLayout] = useState({});
    const [circlePositions, setCirclePositions] = useState(initializeCirclePositions(lettersList.length));

    const BOX_WIDTH = aspectRatio > 1.5 ? 100: 150; // Width of each box
    const BOX_HEIGHT = aspectRatio > 1.5 ? 100: 150; // Height of each box
    const BOX_MARGIN = aspectRatio > 1.5 ? 5: 10; // Margin between boxes
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

     // Create PanResponder for each circle
        const circlePanResponders = circlePositions.map((pos, index) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                // Get the current position of the circle
                pos.setOffset({
                    x: pos.x._value,
                    y: pos.y._value,
                });
                // Initialize the position for this gesture
                pos.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([
                null,
                { dx: pos.x, dy: pos.y }, // Directly map dx and dy to the Animated.ValueXY
            ], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                // Clear the offset and keep the circle at its last position
                pos.flattenOffset();
            },
        })
        );
    
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
            bottom: 0,
            zIndex: 3,
            left: aspectRatio > 1.5 ? screenWidth * .87 : screenWidth * .13,
            top: aspectRatio > 1.5 ? screenHeight * .03 : screenHeight * .79,
          },
        crayonBox: {
            position: 'absolute',
            left: aspectRatio > 1.5 ? screenWidth * .8 : 0,
            bottom: 0,
            top: aspectRatio > 1.5 ? 0 : screenHeight * .75,
            zIndex: 3,
        },
        crayonBoxImage: {
            width: aspectRatio > 1.5 ? screenWidth * .07 : screenWidth * .08,
            height: aspectRatio > 1.5 ? screenHeight * .15 : screenHeight * .13,
            marginLeft: aspectRatio > 1.5 ? 0 : 50,
            zIndex: 3,
        },
          eraserImage: {
            width: aspectRatio > 1.5 ? screenWidth * .1 : screenWidth * .09,
            height: aspectRatio > 1.5 ? screenHeight * .1 : screenHeight * .08,
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
            zIndex: 10,
          },
          colorOption: {
            width: 50,
            height: 50,
            margin: 5,
          },
          sound: {
            position: 'absolute',
            left: aspectRatio > 1.5 ? screenWidth * .08 : screenWidth * .05,
            top: aspectRatio > 1.5 ? screenHeight * .08 :screenHeight * .18,
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
            zIndex: 1,
          },
        lettersImage: {
            position: 'absolute',
            width: BOX_WIDTH - screenWidth * .03, // Match the box width or adjust as needed
            height: BOX_HEIGHT - screenHeight * .03, // Match the box height or adjust as needed
            zIndex: 2,
          },
        circle: {
            position: 'absolute',
            width: BOX_WIDTH - screenWidth * .04,
            height: BOX_HEIGHT - screenHeight * .05,
            borderRadius: 100,
            zIndex: 4,
            transform: [{ translateX: 0 }, { translateY: 0 }],
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

      <TouchableOpacity style={styles.sound} onPress={() => console.log('sound button pressed')}>
        <Image source={require('../assets/traceViews/sound.png')} style={styles.soundImage} />
      </TouchableOpacity>

    
      {lettersList.map((letter, index) => (
    <React.Fragment key={index}>
        <View
            style={[styles.box, {
                top: aspectRatio > 1.5 ?  screenHeight * .55 : screenHeight * .55,
                left: calculateBoxLeftPosition(index, screenWidth),
            }]}
            onLayout={handleBoxPositioning(index)}
        />
        <View style={[styles.box, {
            top: aspectRatio > 1.5 ?  screenHeight * .28 : screenHeight * .35,
            left: calculateBoxLeftPosition(index, screenWidth),
        }]} />
        {lettersList && lettersList[index] &&
            <Image
                source={lettersList[index]}
                style={[styles.lettersImage, { // Match the box height or adjust as needed
                    top: aspectRatio > 1.5 ?  screenWidth * .02 : screenHeight * .18,
                    left: calculateBoxLeftPosition(index, screenWidth) + screenWidth * .015,
                    
                }]}
            />}

        {circlePositions.map((pos, index) => (
                <Animated.View
                    {...circlePanResponders[index].panHandlers}
                    key={index}
                    style={[
                        styles.circle,
                        {
                            left: calculateBoxLeftPosition(index, screenWidth) + screenWidth * .015,
                            top: aspectRatio > 1.5 ?  screenWidth * .02 : screenHeight * .18,
                            transform: pos.getTranslateTransform(), // Use the Animated.Value for smooth animation
                            fill: colorsList[index],
                            backgroundColor: colorsList[index],
                        },
                    ]}
                />
            ))}
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
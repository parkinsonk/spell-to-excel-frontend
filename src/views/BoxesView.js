import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Alert, Dimensions, PanResponder, useWindowDimensions, Animated} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import boxesWordMapping from '../utils/boxesWordMapping';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useProgress } from '../components/ProgressContext';

// Initialize with Animated.Value for each circle position
const initializeCirclePositions = (length) => Array.from({ length }, () => new Animated.ValueXY());

const BoxesView = ({ navigation, route  }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;
    const isLandscape = screenWidth > screenHeight;
    const { batch, activity, selectedWord } = route.params;
    const lettersList = boxesWordMapping[selectedWord]?.images || boxesWordMapping['default'].images;
    const colorsList = boxesWordMapping[selectedWord]?.colors || boxesWordMapping['default'].colors;
    const BOX_WIDTH = aspectRatio > 1.5 ? 100: 150; // Width of each box
    const BOX_HEIGHT = aspectRatio > 1.5 ? 100: 150; // Height of each box
    const BOX_MARGIN = aspectRatio > 1.5 ? 5: 10; // Margin between boxes
    const NUM_COLUMNS = lettersList.length; // Number of boxes per row
    const { markActivityCompleted, checkFlyingHigh, isLoading } = useProgress();


    const handleCustomBackAction = async () => {
      // Call your function before navigating back
      Alert.alert("Congrats!", "You've completed the Sounds activity.");
  
      await markActivityCompleted(activity, selectedWord);
      await checkFlyingHigh('Flying High');
      
      // Then navigate back
      
      navigation.goBack();
    };
  
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={handleCustomBackAction} style={{ marginLeft: 10 }}>
            {/* Custom back button icon */}
            <Image source={require('../assets/back.png')} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);

    const styles = StyleSheet.create({
      landscape: {
        background: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          resizeMode: 'contain',
          backgroundColor: 'white',
          
        },
        svgContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        },
        eraser: {
          position: 'absolute',
          bottom: 0,
          zIndex: 3,
          bottom: '1%',
          right: '8%',
          width: 160,
          height: 100,
          
        },
      crayonBox: {
          position: 'absolute',
          bottom: '3%',
          right: '27%',
          zIndex: 3,
          width: 110,
          height: 100,
      },
      crayonBoxImage: {
          width: '100%',
          height: '100%',
          marginLeft: aspectRatio > 1.5 ? 0 : 50,
          zIndex: 3,
      },
        eraserImage: {
          width: '80%',
          height: '80%',
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
          zIndex: 3,
          bottom: '5%',
          width: 116,
          height: 100,
          left: '12%',
        },
        soundImage: {
          width: '100%',
          height: '100%',
          borderColor: 'black',
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
        leftBackground: {
          position: 'absolute',
          left: 0,
        },
        rightBackground: {
          position: 'absolute',
          right: 0
        },
  },
  portrait: {
    background: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'contain',
      backgroundColor: 'white',
      
    },
    svgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    eraser: {
      position: 'absolute',
      bottom: '9%',
      zIndex: 3,
      right: '1%',
      width: 160,
      height: 100,

    },
  crayonBox: {
      position: 'absolute',
      right: '23%',
      bottom: '10%',
      width: 100,
      height: 100,
      zIndex: 3,
  },
  crayonBoxImage: {
      width: '100%',
      height: '100%',
      zIndex: 3,
  },
    eraserImage: {
      width: '80%',
      height: '80%',
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
      bottom: '12%',
      left: '5%',
      width: 116,
      height: 100,
      zIndex: 3,
    },
    soundImage: {
      width: '100%',
      height: '100%',
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
    topBackground: {
      position: 'absolute',
      top: 0,
    },
    bottomBackground: {
      position: 'absolute',
      bottom: 0
    },
  }});

    

    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState("black"); // Ensure color state is defined
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [boxesLayout, setBoxesLayout] = useState({});
    const [circlePositions, setCirclePositions] = useState(initializeCirclePositions(lettersList.length));

    
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

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);

    useEffect(() => {
      // Function to update styles based on current orientation
      const updateOrientationStyles = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
          setOrientationStyles(styles.landscape);
        } else {
          setOrientationStyles(styles.portrait);
        }
      };
  
      // Initial update when component mounts
      updateOrientationStyles();
  
      // Subscribe to orientation changes
      const subscription = ScreenOrientation.addOrientationChangeListener(() => {
        updateOrientationStyles();
      });
  
      // Cleanup subscription on unmount
      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      };
    }, []);

    return (

      <View style={orientationStyles.background}>
      <View {...panResponder.panHandlers} style={orientationStyles.svgContainer}>
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
      
      <TouchableOpacity style={orientationStyles.eraser} onPress={handleClearButtonClick}>
        <Image source={require('../assets/traceViews/eraser.png')} style={orientationStyles.eraserImage} />
      </TouchableOpacity>
  
      <TouchableOpacity style={orientationStyles.crayonBox} onPress={toggleColorPicker}>
        <Image source={require('../assets/traceViews/crayonBox.png')} style={orientationStyles.crayonBoxImage} />
      </TouchableOpacity>

      <TouchableOpacity style={orientationStyles.sound} onPress={() => console.log('sound button pressed')}>
        <Image source={require('../assets/traceViews/sound.png')} style={orientationStyles.soundImage} />
      </TouchableOpacity>

      {isLandscape ? (

        <>
          <Image source={require('../assets/boxesViews/leftBackgroundLandscape.png')} style={orientationStyles.leftBackground} />
          <Image source={require('../assets/boxesViews/rightBackgroundLandscape.png')} style={orientationStyles.rightBackground} />

        </>) : (

        <>
          <Image source={require('../assets/boxesViews/bottomBackgroundPortrait.png')} style={orientationStyles.topBackground} />
          <Image source={require('../assets/boxesViews/topBackgroundPortrait.png')} style={orientationStyles.bottomBackground} />
        
        </>)}

    
      {lettersList.map((letter, index) => (
    <React.Fragment key={index}>
        <View
            style={[orientationStyles.box, {
                top: aspectRatio > 1.5 ?  screenHeight * .55 : screenHeight * .55,
                left: calculateBoxLeftPosition(index, screenWidth),
            }]}
            onLayout={handleBoxPositioning(index)}
        />
        <View style={[orientationStyles.box, {
            top: isLandscape ? (aspectRatio > 1.5 ?  screenHeight * .28 : screenHeight * .35) : (aspectRatio > 1.5 ?  screenHeight * .28 : screenHeight * .41),
            left: calculateBoxLeftPosition(index, screenWidth),
        }]} />
        {lettersList && lettersList[index] &&
            <Image
                source={lettersList[index]}
                style={[orientationStyles.lettersImage, { // Match the box height or adjust as needed
                    top: aspectRatio > 1.5 ?  screenWidth * .02 : screenHeight * .18,
                    left: calculateBoxLeftPosition(index, screenWidth) + screenWidth * .015,
                    
                }]}
            />}

        {circlePositions.map((pos, index) => (
                <Animated.View
                    {...circlePanResponders[index].panHandlers}
                    key={index}
                    style={[
                      orientationStyles.circle,
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
        <View style={orientationStyles.colorPickerContainer}>
          {colorOptions.map((optionColor, index) => (
            <TouchableOpacity
              key={index}
              style={[orientationStyles.colorOption, {backgroundColor: optionColor}]}
              onPress={() => {
                handleChangeColor(optionColor);
                toggleColorPicker(); // Hide color picker after selection
              }}
            />
          ))}
        </View>
      )}
      </View>

    );
};



export default BoxesView;
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
    const BOX_WIDTH = aspectRatio < 1.4 ? 145 : 75; // Width of each box
    const BOX_HEIGHT = aspectRatio < 1.4 ? 145 : 75; // Height of each box
    const BOX_MARGIN = aspectRatio < 1.4 ? 15 : 5; // Margin between boxes
    const NUM_COLUMNS = lettersList.length; // Number of boxes per row
    const { markActivityCompleted, checkFlyingHigh, checkSunnyIsland, checkSpringtimeFun, checkAlienAdventure, 
      checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep, isLoading } = useProgress();


    const handleCustomBackAction = async () => {
      // Call your function before navigating back
      Alert.alert("Congrats!", "You've completed the Sounds activity.");
  
      await markActivityCompleted(activity, selectedWord);
      if (batch == 'Flying High') {
        await checkFlyingHigh('Flying High');
      } else if (batch == 'Sunny Island') {
        await checkSunnyIsland('Sunny Island');
      } else if (batch == 'SpringTime Fun') {
        await checkSpringtimeFun('SpringTime Fun');
      } else if (batch == 'Alien Adventures') {
        await checkAlienAdventure('Alien Adventures');
      } else if (batch == 'Outer Space') {
        await checkOuterSpace('Outer Space');
      } else if (batch == 'Planets and Beyond') {
        await checkPlanetsAndBeyond('Planets and Beyond');
      } else if (batch == 'Diving Deep') {
        await checkDivingDeep('Diving Deep');
      }
      
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
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0CCFFF',
          
        },
        leftBackground: {
          flex: .1,
          alignItems: 'flex-start',
          height: '100%',
        },
        middleBackground: {
          flex: .8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        rightBackground: {
          flex: .1,
          alignItems: 'flex-end',
          height: '100%',
        },
        svgContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        },
        lowerContainer: {
          flex: .25,
          flexDirection: 'row',
        },
        lowerContainerLeft: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        lowerContainerRight: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        eraser: {
          width: aspectRatio > 1.75 ? '35%': '45%',
          height: aspectRatio > 1.75 ? '40  %': '30%',
          marginLeft: '5%',
        },
        eraserImage: {
          width: '100%',
          height: '100%',
        },
        crayonBox: {
          width: aspectRatio > 1.75 ? '16%': '25%',
          height: aspectRatio > 1.75 ? '90%': '80%',
          marginLeft: '15%',
          
        },
        crayonBoxImage: {
          width: '100%',
          height: '100%',
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
          width: aspectRatio > 1.75 ? '20%': '20%',
          height: aspectRatio > 1.75 ? '50%': '40%',
          marginLeft: '5%',
        },
        soundImage: {
          width: '100%',
          height: '100%',
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
      blueBox: {
        position: 'absolute',
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        backgroundColor: '#0CCFFF',
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
        landscapeBackgroundImage: {
          height: '100%',
          width: '80%',
        },
  },
  portrait: {
    background: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      
    },
    topBackground: {
      flex: .1,
      width: '125%',
      alignItems: 'center',

    },
    middleBackground: {
      flex: .8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomBackground: {
      flex: .1,
      width: '125%',
      alignItems: 'center',
    },
    svgContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    lowerContainer: {
      flex: .25,
      flexDirection: 'row',
    },
    lowerContainerLeft: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    lowerContainerRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    eraser: {
      width: aspectRatio > 1.7 ? '27%': '35%',
      height: aspectRatio > 1.7 ? '70%': '50%',
      marginLeft: '5%',
    },
    eraserImage: {
      width: '100%',
      height: '100%',
    },
    crayonBox: {
      width: aspectRatio > 1.7 ? '16%': '25%',
      height: aspectRatio > 1.7 ? '90%': '80%',
      marginLeft: '15%',
      marginRight: '5%',
      
    },
    crayonBoxImage: {
      width: '100%',
      height: '100%',
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
      width: aspectRatio > 1.7 ? '20%': '22%',
      height: aspectRatio > 1.7 ? '50%': '40%',
      marginLeft: '5%',
    },
    soundImage: {
      width: '100%',
      height: '100%',
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
    landscapeBackgroundImage: {
      height: '100%',
      width: '80%',
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
          correctionFactor = aspectRatio < 1.4 ? -55 : -20;
          const correctedY0 = gestureState.y0 - correctionFactor;
          const newPoint = `M${gestureState.x0},${correctedY0}`;
          setPaths((prevPaths) => [...prevPaths, newPoint]);
        },
        onPanResponderMove: (evt, gestureState) => {
          // Add line to command to the current path
          correctionFactor = aspectRatio < 1.4 ? -55 : -20;
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

      const [middleContainerWidth, setMiddleContainerWidth] = useState(0);

    // Function to handle layout change of the middle container
    const handleMiddleContainerLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setMiddleContainerWidth(width);
    };

        // Calculate the left position of the boxes based on the middle container width
    const calculateBoxLeftPosition = (index) => {
      const totalWidth = NUM_COLUMNS * (BOX_WIDTH + BOX_MARGIN) - BOX_MARGIN; // Total width occupied by boxes and margins
      const startX = (middleContainerWidth - totalWidth) / 2; // Starting X position to center boxes
      const rowPosition = index % NUM_COLUMNS; // Position of the box in the row (0, 1, 2, etc.)
      return startX + rowPosition * (BOX_WIDTH + BOX_MARGIN); // Calculate left position
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
      

      {isLandscape ? (

        <>

        {/*Start of Landscape View*/}
        <View style={orientationStyles.leftBackground}>


        </View>

        <View style={orientationStyles.middleBackground} onLayout={handleMiddleContainerLayout}>

        <View {...panResponder.panHandlers} style={orientationStyles.svgContainer}>
            <Svg height={screenHeight} width={screenWidth}>
              {paths.map((path, index) => (
                <Path
                  key={index}
                  d={path}
                  stroke={color}
                  fill="none"
                  strokeWidth={aspectRatio > 1.7 ? 7 : 12}
                />
              ))}
            </Svg>
          </View>

          {/* Other code remains unchanged */}
          {lettersList.map((letter, index) => (
                    <React.Fragment key={index}>
                        <View
                            style={[orientationStyles.box, {
                                top: aspectRatio < 1.4 ? '55%' : '50%',
                                left: calculateBoxLeftPosition(index),
                            }]}
                            onLayout={handleBoxPositioning(index)}
                        />
                        <View
                            style={[orientationStyles.blueBox, {
                              top: aspectRatio < 1.4 ? '33%' : '27%',
                                left: calculateBoxLeftPosition(index),
                            }]}
                            onLayout={handleBoxPositioning(index)}
                        />

        {lettersList && lettersList[index] &&
                    <Image
                        source={lettersList[index]}
                        style={[orientationStyles.lettersImage, { // Match the box height or adjust as needed
                          left: calculateBoxLeftPosition(index) + screenWidth * .02,
                          top: aspectRatio < 1.4 ? '15%' : '10%',
                        }]}
                    />}

      
        {circlePositions.map((pos, index) => (
                <Animated.View
                    {...circlePanResponders[index].panHandlers}
                    key={index}
                    style={[
                      orientationStyles.circle,
                        {
                            left: calculateBoxLeftPosition(index) + screenWidth * .02,
                            top: aspectRatio < 1.4 ? '15%' : '10%',
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

          <View style={orientationStyles.lowerContainer}>

            <View style={orientationStyles.lowerContainerLeft}>
          
              <TouchableOpacity style={orientationStyles.sound} onPress={() => console.log('sound button pressed')}>
                <Image source={require('../assets/traceViews/sound.png')} style={orientationStyles.soundImage} />
              </TouchableOpacity>

            </View>

            <View style={orientationStyles.lowerContainerRight}>

              <TouchableOpacity style={orientationStyles.eraser} onPress={handleClearButtonClick}>
                <Image source={require('../assets/traceViews/eraser.png')} style={orientationStyles.eraserImage} />
              </TouchableOpacity>
          
              <TouchableOpacity style={orientationStyles.crayonBox} onPress={toggleColorPicker}>
                <Image source={require('../assets/traceViews/crayonBox.png')} style={orientationStyles.crayonBoxImage} />
              </TouchableOpacity>
            
            </View>

          </View>

        </View>

        <View style={orientationStyles.rightBackground}>

        </View>
          

        </>) : (

        <>

        {/*Start of Portrait View*/}
        <View style={orientationStyles.topBackground}>

        <Image source={require('../assets/boxesViews/portraitBackgroundImage.png')} style={orientationStyles.landscapeBackgroundImage} />

        </View>

        <View style={orientationStyles.middleBackground} onLayout={handleMiddleContainerLayout}>

        <View {...panResponder.panHandlers} style={orientationStyles.svgContainer}>
            <Svg height={screenHeight} width={screenWidth}>
              {paths.map((path, index) => (
                <Path
                  key={index}
                  d={path}
                  stroke={color}
                  fill="none"
                  strokeWidth={aspectRatio < 1.4 ? 12 : 7}
                />
              ))}
            </Svg>
          </View>

          {/* Other code remains unchanged */}
          {lettersList.map((letter, index) => (
                    <React.Fragment key={index}>
                        <View
                            style={[orientationStyles.box, {
                                top: aspectRatio < 1.4 ? '52%' : '0%',
                                left: calculateBoxLeftPosition(index),
                            }]}
                            onLayout={handleBoxPositioning(index)}
                        />
                        <View
                            style={[orientationStyles.box, {
                              top: aspectRatio < 1.4 ? '32%' : '0%',
                                left: calculateBoxLeftPosition(index),
                            }]}
                            onLayout={handleBoxPositioning(index)}
                        />

        {lettersList && lettersList[index] &&
                    <Image
                        source={lettersList[index]}
                        style={[orientationStyles.lettersImage, { // Match the box height or adjust as needed
                          left: calculateBoxLeftPosition(index) + screenWidth * .02,
                          top: aspectRatio < 1.4 ? '15%' : '0%',
                        }]}
                    />}

      
        {circlePositions.map((pos, index) => (
                <Animated.View
                    {...circlePanResponders[index].panHandlers}
                    key={index}
                    style={[
                      orientationStyles.circle,
                        {
                            left: calculateBoxLeftPosition(index) + screenWidth * .02,
                            top: aspectRatio < 1.4 ? '15%' : '0%',
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

          <View style={orientationStyles.lowerContainer}>

            <View style={orientationStyles.lowerContainerLeft}>
          
              <TouchableOpacity style={orientationStyles.sound} onPress={() => console.log('sound button pressed')}>
                <Image source={require('../assets/traceViews/sound.png')} style={orientationStyles.soundImage} />
              </TouchableOpacity>

            </View>

            <View style={orientationStyles.lowerContainerRight}>

              <TouchableOpacity style={orientationStyles.eraser} onPress={handleClearButtonClick}>
                <Image source={require('../assets/traceViews/eraser.png')} style={orientationStyles.eraserImage} />
              </TouchableOpacity>
          
              <TouchableOpacity style={orientationStyles.crayonBox} onPress={toggleColorPicker}>
                <Image source={require('../assets/traceViews/crayonBox.png')} style={orientationStyles.crayonBoxImage} />
              </TouchableOpacity>
            
            </View>

          </View>

        </View>

        <View style={orientationStyles.bottomBackground}>

          <Image source={require('../assets/boxesViews/portraitBackgroundImage.png')} style={orientationStyles.landscapeBackgroundImage} />

        </View>
        
        </>)}

      </View>

    );
};



export default BoxesView;
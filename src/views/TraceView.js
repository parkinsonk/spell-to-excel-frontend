import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Dimensions, Alert, PanResponder, useWindowDimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import traceWordMapping from '../utils/traceWordMapping';
import { useProgress } from '../components/ProgressContext';
import * as ScreenOrientation from 'expo-screen-orientation';


const TraceView = ({ navigation, route }) => {
  const { batch, activity, selectedWord } = route.params;
  const traceBackground = traceWordMapping[selectedWord] || traceWordMapping.default;
  const coverBackground = require('../assets/traceViews/blankTraceBackground.png')
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState("black"); // Ensure color state is defined
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackground, setBackground] = useState(traceBackground);
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = screenWidth / screenHeight;
  const { markActivityCompleted, checkFlyingHigh, isLoading } = useProgress();


  // Back Button Functionality
  const handleCustomBackAction = async () => {
    // Call your function before navigating back
    Alert.alert("Congrats!", "You've completed the Trace, Copy, Cover activity.");

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
  // End Of Back Button Functionality

  // Set the background to trace image
  const setTraceBackground = () => {
    setBackground(traceBackground); 
  };
  
  // Set the background to cover image
  const setCoverBackground = () => {
    setBackground(coverBackground); 
  };

  const colorOptions = ["black", "red", "blue", "green", "yellow", "purple"];

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      // Start a new path with M command    
      if (screenHeight > screenWidth) {
        correctionFactor = -70;
      } 
      else {
      aspectRatio > 1.7 ? correctionFactor = -20 : correctionFactor = -50;
    }

      const correctedY0 = gestureState.y0 - correctionFactor;
      const newPoint = `M${gestureState.x0},${correctedY0}`;
      setPaths((prevPaths) => [...prevPaths, newPoint]);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Add line to command to the current path
      if (screenHeight > screenWidth) {
        correctionFactor = -70;
      } 
      else {
      aspectRatio > 1.7 ? correctionFactor = -20 : correctionFactor = -50;
    }
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

  const styles = StyleSheet.create({

    landscape: {
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
        width: aspectRatio > 1.75 ? '27%': '40%',
        height: aspectRatio > 1.75 ? '70%': '60%',
        marginLeft: '5%',
      },
      eraserImage: {
        width: '100%',
        height: '100%',
      },
      crayonBox: {
        width: aspectRatio > 1.75 ? '16%': '25%',
        height: aspectRatio > 1.75 ? '90%': '85%',
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
      },
      colorOption: {
        width: 50,
        height: 50,
        margin: 5,
      },
      trace: {
        width: aspectRatio > 1.75 ? '35%': '43%',
        height: aspectRatio > 1.75 ? '90%': '74%',
        marginRight: '5%',
      },
      traceImage: {
        width: '100%',
        height: '100%',
      },
      cover: {
        width: aspectRatio > 1.75 ? '32%': '40%',
        height: aspectRatio > 1.75 ? '94%': '75%',
        marginRight: '15%',
      },
      coverImage: {
        width: '100%',
        height: '100%',
      },
      sound: {
        width: aspectRatio > 1.75 ? '20%': '20%',
        height: aspectRatio > 1.75 ? '50%': '35%',
        marginLeft: '5%',
      },
      soundImage: {
        width: '100%',
        height: '100%',
      },
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
      justifyContent: 'center',
      alignItems: 'center',
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
      width: aspectRatio > 1.75 ? '27%': '40%',
      height: aspectRatio > 1.75 ? '70%': '30%',
      marginLeft: '5%',
    },
    eraserImage: {
      width: '100%',
      height: '100%',
    },
    crayonBox: {
      width: aspectRatio > 1.75 ? '16%': '35%',
      height: aspectRatio > 1.75 ? '90%': '45%',
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
    },
    colorOption: {
      width: 50,
      height: 50,
      margin: 5,
    },
    trace: {
      width: aspectRatio > 1.75 ? '35%': '48%',
      height: aspectRatio > 1.75 ? '90%': '45%',
      marginRight: '5%',
    },
    traceImage: {
      width: '100%',
      height: '100%',
    },
    cover: {
      width: aspectRatio > 1.75 ? '32%': '45%',
      height: aspectRatio > 1.75 ? '94%': '46%',
      marginRight: '15%',
    },
    coverImage: {
      width: '100%',
      height: '100%',
    },
    sound: {
      width: aspectRatio > 1.75 ? '20%': '30%',
      height: aspectRatio > 1.75 ? '50%': '30%',
      marginLeft: '5%',
    },
    soundImage: {
      width: '100%',
      height: '100%',
    },
  }});


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
    <ImageBackground source={showBackground} resizeMode="cover" style={orientationStyles.background}>

    {isLandscape ? (

    <>
    {/* Start of Landscape Views*/}
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

          <TouchableOpacity style={orientationStyles.eraser} onPress={handleClearButtonClick}>
            <Image source={require('../assets/traceViews/eraser.png')} style={orientationStyles.eraserImage} />
          </TouchableOpacity>
      
          <TouchableOpacity style={orientationStyles.crayonBox} onPress={toggleColorPicker}>
            <Image source={require('../assets/traceViews/crayonBox.png')} style={orientationStyles.crayonBoxImage} />
          </TouchableOpacity>

        </View>

        <View style={orientationStyles.lowerContainerMiddle}>

          <TouchableOpacity style={orientationStyles.sound} onPress={() => console.log('Sound button pressed')}>
            <Image source={require('../assets/traceViews/sound.png')} style={orientationStyles.soundImage} />
          </TouchableOpacity>

        </View>

        <View style={orientationStyles.lowerContainerRight}>

          <TouchableOpacity style={orientationStyles.trace} onPress={setTraceBackground}>
            <Image source={require('../assets/traceViews/trace.png')} style={orientationStyles.traceImage} />
          </TouchableOpacity>

          <TouchableOpacity style={orientationStyles.cover} onPress={() => {setCoverBackground(); handleClearButtonClick();}}>
            <Image source={require('../assets/traceViews/try.png')} style={orientationStyles.coverImage} />
          </TouchableOpacity>

        </View>

      </View>
  
      {/* Additional buttons for changing color */}

      

      
      </>) : (

          <>
            {/* Start of Portrait Views*/}

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

                <TouchableOpacity style={orientationStyles.eraser} onPress={handleClearButtonClick}>
                  <Image source={require('../assets/traceViews/eraser.png')} style={orientationStyles.eraserImage} />
                </TouchableOpacity>
            
                <TouchableOpacity style={orientationStyles.crayonBox} onPress={toggleColorPicker}>
                  <Image source={require('../assets/traceViews/crayonBox.png')} style={orientationStyles.crayonBoxImage} />
                </TouchableOpacity>

              </View>

              <View style={orientationStyles.lowerContainerMiddle}>

                <TouchableOpacity style={orientationStyles.sound} onPress={() => console.log('Sound button pressed')}>
                  <Image source={require('../assets/traceViews/sound.png')} style={orientationStyles.soundImage} />
                </TouchableOpacity>

              </View>

              <View style={orientationStyles.lowerContainerRight}>

                <TouchableOpacity style={orientationStyles.trace} onPress={setTraceBackground}>
                  <Image source={require('../assets/traceViews/trace.png')} style={orientationStyles.traceImage} />
                </TouchableOpacity>

                <TouchableOpacity style={orientationStyles.cover} onPress={() => {setCoverBackground(); handleClearButtonClick();}}>
                  <Image source={require('../assets/traceViews/try.png')} style={orientationStyles.coverImage} />
                </TouchableOpacity>

              </View>

            </View>


            </>)}

    </ImageBackground>
  );
};



export default TraceView;
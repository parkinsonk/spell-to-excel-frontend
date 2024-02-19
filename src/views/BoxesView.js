import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import boxesWordMapping from '../utils/boxesWordMapping';
import DrawableBox from '../components/DrawableBox';

const BoxesView = ({ navigation, route  }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;
    const { batch, activity, selectedWord } = route.params;
    const lettersList = boxesWordMapping[selectedWord] || boxesWordMapping.default;
    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState("black"); // Ensure color state is defined
    const [showColorPicker, setShowColorPicker] = useState(false);
    
      const colorOptions = ["black", "red", "blue", "green", "yellow", "purple"];
    
      const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
      };

    
      const handleClearButtonClick = () => {
        setPaths([]);
      };
    
      const handleChangeColor = (newColor) => {
        setColor(newColor);
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
          sound: {
            position: 'absolute',
            left: screenWidth * .17,
            top: screenHeight * .20,
          },
          soundImage: {
            width: aspectRatio > 1.5 ?  screenWidth * .10 : screenWidth * .10,
            height: aspectRatio > 1.5 ?  screenHeight * .15 : screenHeight * .10,
            borderColor: 'black',
            marginRight: 50,
          },
          boxesContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          },
          box: {
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 10,
            margin: 10,
            // Make sure the box can contain the SVG drawing
            overflow: 'hidden',
          },
    });

    return (
        <ImageBackground
          source={require('../assets/boxesViews/boxesBackground.png')}
          resizeMode="cover"
          style={styles.background}
        >
          {/* Other UI elements like eraser, crayonBox remain unchanged */}
          <TouchableOpacity style={styles.eraser} onPress={handleClearButtonClick}>
            <Image source={require('../assets/traceViews/eraser.png')} style={styles.eraserImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.crayonBox} onPress={toggleColorPicker}>
            <Image source={require('../assets/traceViews/crayonBox.png')} style={styles.crayonBoxImage} />
        </TouchableOpacity>
    
          <View style={styles.boxesContainer}>
            {lettersList.map((_, index) => (
              <DrawableBox key={index} boxStyle={styles.box} />
            ))}
          </View>

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
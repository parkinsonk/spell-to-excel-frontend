import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, Alert, PanResponder, useWindowDimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useProgress } from '../components/ProgressContext';
import readWordMapping from '../utils/readWordMapping';




const ReadView = ({ navigation, route }) => {

  const { batch, activity, selectedWord } = route.params;
  const { markActivityCompleted, checkFlyingHigh, isLoading } = useProgress();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

  const readingImage = readWordMapping[selectedWord]?.image || readWordMapping.default.image;

  const handleCustomBackAction = async () => {
    // Call your function before navigating back
    Alert.alert("Congrats!", "You've completed the Read activity.");

    await markActivityCompleted(activity, selectedWord);
    

    if (batch == 'Flying High') {
      await checkFlyingHigh('Flying High');
  }
  else if (batch == 'Sunny Island') {
    await checkSunnyIsland('Sunny Island');
  }
  else if (batch == 'Springtime Fun') {
    await checkSpringtimeFun('SpringTime Fun');
  }
  else if (batch == 'Alien Adventure') {
    await checkAlienAdventure('Alien Adventures');
  }
  else if (batch == 'Outer Space') {
    await checkOuterSpace('Outer Space');
  }
  else if (batch == 'Planets and Beyond') {
    await checkPlanetsAndBeyond('Planets and Beyond');
  }
  else if (batch == 'Diving Deep') {
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
    background: {
      flex: 1,
      width: '100%', // Ensure it covers the full width
      height: '100%' // Ensure it covers the full height
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: isLandscape ? '80%' : '85%',
      height: isLandscape ? '80%' : '50%',
    },
  });

  return (
    <ImageBackground
      source={require('../assets/readView/readBackground.png')}
      style={styles.background}
    >
      <View style={styles.imageContainer}>
        <Image source={readingImage} style={styles.image} resizeMode='contain' />
      </View>
    </ImageBackground>
  );
};



export default ReadView;
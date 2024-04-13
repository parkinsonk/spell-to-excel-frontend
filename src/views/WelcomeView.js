import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const aspectRatio = screenWidth / screenHeight;

  const handleLearnMorePress = () => {
    navigation.navigate('LearnMoreScreen');
  };

  const landscapeBackgroundGif = require('../assets/welcomeView/welcomeBlueWB.gif');
  const portraitBackgroundGif = require('../assets/welcomeView/pwelcomeBlueWBP.gif');

  const landscapeStyles = StyleSheet.create({
    background: {
      flex: 1,
      width: screenWidth,
      height: '100%',
    },
    image: {
      flex: 1,
      width: screenWidth,
      height: '100%',
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    loginButton: {
      position: 'absolute',
      right: 50,
      bottom: 5,
      width: aspectRatio > 1.5 ? screenWidth * 0.2 : screenWidth * 0.4,
      height: aspectRatio > 1.5 ? screenHeight * 0.15 : screenHeight * 0.3,
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
      width: '75%',
      height: '100%',
      resizeMode: 'contain',
    },
    learnMoreButton: {
      position: 'absolute',
      left: 50,
      bottom: 5,
      width: aspectRatio > 1.5 ? screenWidth * 0.2 : screenWidth * 0.4,
      height: aspectRatio > 1.5 ? screenHeight * 0.15 : screenHeight * 0.3,
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const portraitStyles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    image: {
      flex: 1,
      width: screenWidth,
      height: '100%',
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    loginButton: {
      position: 'absolute',
      right: 50,
      bottom: 5,
      width: aspectRatio > 1.5 ? screenWidth * 0.2 : screenWidth * 0.4,
      height: aspectRatio > 1.5 ? screenHeight * 0.15 : screenHeight * 0.3,
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
      width: '75%',
      height: '100%',
      resizeMode: 'contain',
    },
    learnMoreButton: {
      position: 'absolute',
      left: 50,
      bottom: 5,
      width: aspectRatio > 1.5 ? screenWidth * 0.2 : screenWidth * 0.4,
      height: aspectRatio > 1.5 ? screenHeight * 0.15 : screenHeight * 0.3,
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const styles = aspectRatio > 1.5 ? landscapeStyles : portraitStyles;

  return (
    <ImageBackground
      source={aspectRatio > 1.5 ? landscapeBackgroundGif : portraitBackgroundGif}
      resizeMode="cover"
      style={styles.background}
    >
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Image source={require('../assets/welcomeView/loginp.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.learnMoreButton} onPress={handleLearnMorePress}>
        <Image source={require('../assets/welcomeView/learnMore.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeScreen;

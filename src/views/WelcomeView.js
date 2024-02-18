import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const aspectRatio = screenWidth / screenHeight;

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
  source={require('../assets/welcomeView/welcomeBlueWB.gif')}
  resizeMode="cover"
  style={styles.background}
>

    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
      <Image source={require('../assets/welcomeView/loginp.png')} style={styles.buttonImage} />
    </TouchableOpacity>

    <Image source={require('../assets/welcomeView/letterFriends.png')} style={styles.image} />


</ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
  image: {
    width: '80%', 
    height: '80%', 
    marginTop: screenHeight * 0.1,
    resizeMode: 'contain',
    alignSelf: 'center',
    
  },
  loginButton: {
    position: 'absolute',
    right: 50,
    bottom: 5,
    width: aspectRatio > 1.5 ? screenWidth * 0.3: screenWidth * 0.2, 
    height: aspectRatio > 1.5 ? screenHeight * 0.15: screenHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;
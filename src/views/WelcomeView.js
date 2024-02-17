import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
  source={require('../assets/welcomeView/blueBackground.png')}
  resizeMode="cover"
  style={styles.background}
>
    <View style={styles.container}>
      <Image
        source={require('../assets/welcomeView/welcomeBlueWB.gif')}
        style={styles.image}
      />
    </View>


    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
      <Image source={require('../assets/welcomeView/loginp.png')} style={styles.buttonImage} />
    </TouchableOpacity>


</ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  image: {
    width: '100%', 
    height: '100%', 
    aspectRatio: 2, 
    resizeMode: 'contain',
    alignSelf: 'center',
    
  },
  loginButton: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    width: screenWidth * 0.2, 
    height: screenHeight * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

export default WelcomeScreen;
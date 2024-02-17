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
    <View style={styles.upperHalf}>
      <Image
        source={require('../assets/welcomeView/welcomeBlueWB.gif')}
        style={styles.image}
      />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Image
          source={require('../assets/welcomeView/loginp.png')}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  </View>
</ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set the background color for the whole page
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center', // Center the image vertically
    borderColor: 'white',
    borderWidth: 0.1,
  },
  image: {
    width: '100%', 
    height: '100%', 
    aspectRatio: 2, 
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'white',
    
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16, // Adjust the bottom spacing
    left: screenWidth / 2 - 25 + screenWidth / 5, // Move halfway more to the right
  },
  loginButton: {
    width: 100, 
    height: 40, 
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
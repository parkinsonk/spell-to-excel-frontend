import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WelcomeScreen = ({ navigation }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Set the background to transparent
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center', // Center the image vertically
    borderColor: 'transparent',
    borderWidth: 0.1,
  },
  image: {
    width: '100%',
    height: '100%', // Make the image take up the entire screen height
    aspectRatio: 16 / 9, // Set the aspect ratio to maintain the original image's proportions
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
    width: 100, // Make the button twice as big (adjust as needed)
    height: 40, // Make the button twice as big (adjust as needed)
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

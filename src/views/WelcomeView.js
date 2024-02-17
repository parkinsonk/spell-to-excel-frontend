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
    backgroundColor: '#0c3fb', // Set the background color for the whole page
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center', // Center the image vertically
    borderColor: 'white',
    borderWidth: 0.1,
  },
  image: {
    width: '100%', // Make the image take up the entire width
    height: '100%', // Make the image take up the entire height
    aspectRatio: 2, // Adjust the aspect ratio as needed to make the image wider
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
});

export default WelcomeScreen;
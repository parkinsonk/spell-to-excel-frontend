import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WelcomeScreen = ({ navigation }) => {
  // Define your landscape and portrait background GIFs here
  const landscapeBackgroundGif = require('../assets/welcomeView/welcomeBlueWB.gif');
  const portraitBackgroundGif = require('../assets/welcomeView/pwelcomeBlueWBP.gif');

  const handleLearnMorePress = () => {
    // Handle button press for Learn More
    // For example, navigate to another screen
    navigation.navigate('LearnMoreScreen'); // Replace 'LearnMoreScreen' with the actual screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalf}>
        <Image
          source={screenWidth > screenHeight ? landscapeBackgroundGif : portraitBackgroundGif}
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
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={handleLearnMorePress}
          >
            <Image
              source={require('../assets/welcomeView/learnMore.png')}
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
      backgroundColor: 'white'
    },
    upperHalf: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    lowerHalf: {
      flex: 1,
      // Styles for the bottom half of the screen
    },
    image: {
      width: '100%',
      height: screenHeight / 1.2,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: screenHeight * 0.1,
      backgroundColor: 'white',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%', // Adjust width of the container as needed
    },
    buttonContainerPortrait: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%', // Adjust width of the container as needed
      position: 'absolute', // Position the container absolutely if needed
      bottom: screenHeight * 0.1,
    },
    buttonContainerLandscape: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%', // Adjust width of the container as needed
    },
    loginButton: {
      width: screenWidth * 0.5, // 40% of the screen width
      height: screenHeight * 0.1, // 10% of the screen height
      justifyContent: 'center',
      alignItems: 'center',
      // Removed absolute positioning
    },
    learnMoreButton: {
      width: screenWidth * 0.5,
      height: screenHeight * 0.1,
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
  
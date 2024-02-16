import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const WelcomeScreen = ({ navigation }) => {
    const handleLearnMorePress = () => {
      // Handle button press for Learn More
      // For example, navigate to another screen
      navigation.navigate('LearnMoreScreen'); // Replace 'LearnMoreScreen' with the actual screen name
    };
  
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
        justifyContent: 'flex-start', // Aligns content to the start, pushing the image up
        borderColor: 'black',
        borderWidth: 2,
        },
    lowerHalf: {
        flex: 1,
        // Styles for the bottom half of the screen
    },
    image: {
        width: '100%',
        height: screenHeight / 1,
        resizeMode: 'contain',
        alignSelf: 'center', // Ensures the image is centered horizontally
        marginTop: screenHeight * 0.1, // Adjust this value to shift the image higher as needed
        backgroundColor: 'white', // Set background color to match the page's background color
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Adjust as needed
        alignItems: 'center',
        width: '80%', // Adjust width of the container as needed
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Adjust as needed
        alignItems: 'center',
        width: '100%', // Adjust width of the container as needed
        position: 'absolute', // Position the container absolutely if needed
        bottom: screenHeight * 0.1
    },
    loginButton: {
        width: screenWidth * 0.5, // 40% of the screen width
        height: screenHeight * 0.1, // 10% of the screen height
        justifyContent: 'center',
        alignItems: 'center',
        // Removed absolute positioning
    },
    learnMoreButton: {
        // Style for your Learn More button
        //Maybe change to percentage width=50 percent 
        ///i
        width: '50%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage: {
        width: '100%', // Make the image fill the button
        height: '100%', // Make the image fill the button
        resizeMode: 'contain', // This ensures the image scales correctly within the button
    },
});

export default WelcomeScreen;
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;

    const styles = StyleSheet.create({
        background: {
          flex: 1,
          width: '100%',
          height: '100%',
      
        },
        image: {
          width: '80%', 
          height: '80%', 
          marginBottom: screenHeight * 0.1,
          resizeMode: 'contain',
          alignSelf: 'center',
        },
        loginButton: {
          position: 'absolute',
          right: 15,
          bottom: 5,
          width: aspectRatio > 1.5 ? screenWidth * 0.2: screenWidth * 0.2, 
          height: aspectRatio > 1.5 ? screenHeight * 0.15: screenHeight * 0.15,
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        getStartedButton: {
          position: 'absolute',
          left: 15,
          bottom: 5,
          width: aspectRatio > 1.5 ? screenWidth * 0.2: screenWidth * 0.2, 
          height: aspectRatio > 1.5 ? screenHeight * 0.15: screenHeight * 0.15,
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonImage: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        },
      });

  return (
    <ImageBackground
  source={require('../assets/welcomeView/blueBackground.png')}
  resizeMode="cover"
  style={styles.background}
>

    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
      <Image source={require('../assets/welcomeView/loginp.png')} style={styles.buttonImage} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('Get Started')}>
      <Image source={require('../assets/welcomeView/getStarted.png')} style={styles.buttonImage} />
    </TouchableOpacity>

    <Image source={require('../assets/welcomeView/trickyWords.png')} style={styles.image} />


</ImageBackground>
  );
};


export default WelcomeScreen;
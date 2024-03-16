import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, useWindowDimensions } from 'react-native';
import axios from 'axios';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isStudentMode, setStudentMode] = useState(true);
  const [getStartedPressed, setGetStartedPressed] = useState(false);
  const [forgotPasswordPressed, setForgotPasswordPressed] = useState(false);
  const aspectRatio = screenWidth / screenHeight;

  const styles = StyleSheet.create({

    // Landscape styles
      landscape:{
        
        background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
      },
      leftSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      },
      middleSide: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
      rightSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      },
      letterImage: {
        width: '100%',
        height: '30%',
        resizeMode: 'contain',

      },
      input: {
        width: '100%',
        color: 'black', 
        fontSize: aspectRatio > 1.5 ? 25 : 25, // Adjust the font size as needed
        textAlign: 'center', 
        fontWeight: 'bold', // Make the text bold
      },
      inputBox: {
        width: '90%',
        height: aspectRatio > 1.5 ? '35%' : '28%',
        marginBottom: '2%',
        borderColor: 'black',
        borderWidth: 2.5,
        borderRadius: '100%',
        
      },
      inputBoxContainer: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',

        
      },
      loginButtonContainer: {
        width: '50%',
        height: '10%', 
        borderRadius: '50%', // Make it a circle

      },
      loginButton: {
        width: '100%', // Adjust the width as needed
        height: '95%', // Adjust the height as needed
        resizeMode: 'contain',
      },
      forgotPasswordButtonContainer: {
        width: '50%',
        height: '6%',
        marginTop: '5%', // Adjust the marginTop value to make it lower
        borderRadius: '30%', // Make it a circle or adjust as needed
      },
      forgotPasswordButton: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },

    },

    // Portrait styles
    portrait: {
      background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      },
      container: {
        width: '60%', // Adjust the width as needed
        height: '35%', // Adjust the height as needed
        borderRadius: '50', // Numeric value for borderRadius
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        height:55,
        width: '100%',
        padding: 25,
        color: 'black', 
        fontSize: 25, // Adjust the font size as needed
        textAlign: 'center', 
        fontWeight: 'bold', // Make the text bold
      },
      inputBox: {
        width: '100%',
        marginBottom: '2%',
        borderColor: 'black', 
        borderWidth: 2.5,
        borderRadius: '100%',
      },
      loginButtonContainer: {
        width: '40%',
        height: '50%',
        marginTop: '3%', 
        borderRadius: '50%', // Make it a circle
      },
      loginButton: {
        width: '100%', // Adjust the width as needed
        height: '100%', // Adjust the height as needed
        resizeMode: 'contain',
      },
    },
    getStartedButtonContainer: {
      width: '30%',
      height: '10%',
      marginTop: '10%', // Increase marginTop to move it lower
      borderRadius: '50%', // Make it a circle or adjust as needed
    },
    getStartedButton: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    forgotPasswordButtonContainer: {
      width: '100%',
      height: '5%',
      marginTop: '5%', // Adjust the marginTop value to make it lower
      borderRadius: '30%', // Make it a circle or adjust as needed
    },
    forgotPasswordButton: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    
    });

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  
  const isLandscape = screenWidth > screenHeight;

  const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
  const [landscapeBackground, setLandscapeBackground] = useState(
    require('../assets/loginview/loginBackground.gif')
  );
  const [portraitBackground, setPortraitBackground] = useState(
    require('../assets/loginview/pbackground.gif')
  );

  useEffect(() => {
    // Function to update styles based on current orientation
    const updateOrientationStyles = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setOrientationStyles(styles.landscape);
      } else {
        setOrientationStyles(styles.portrait);
      }
    };

    // Initial update when component mounts
    updateOrientationStyles();

    // Subscribe to orientation changes
    const subscription = ScreenOrientation.addOrientationChangeListener(() => {
      updateOrientationStyles();
    });

    // Cleanup subscription on unmount
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  useEffect(() => {
    if (getStartedPressed) {
      // Add functionality for the "Get Started" button here
      console.log("Get Started button pressed!");
      // Reset the state to handle future presses
      setGetStartedPressed(false);
    }
  }, [getStartedPressed]);

  useEffect(() => {
    if (forgotPasswordPressed) {
      // Add functionality for the "Forgot Password" button here
      console.log("Forgot Password button pressed!");
      // Reset the state to handle future presses
      setForgotPasswordPressed(false);
    }
  }, [forgotPasswordPressed]);

  const handleLogin = () => {
    // Logic to handle login
    const apiEndpoint = isStudentMode
      ? 'https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/student-login/'
      : 'https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/teacher-login/';

    axios
      .post(apiEndpoint, {
        email: email,
        student_name: name,
        pin: pin,
      })
      .then(async (response) => {
        // Handle success
        console.log(response.data);
        const { refresh, access } = response.data;
        await SecureStore.setItemAsync('access_token', access);
        await SecureStore.setItemAsync('refresh_token', refresh);
        navigation.navigate('Word Batches');
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        Alert.alert('Login failed', 'Invalid credentials');
      });
  };

  const handleGetStarted = () => {
    setGetStartedPressed(true);
  };

  const handleForgotPassword = () => {
    setForgotPasswordPressed(true);
  };



  return (
    <ImageBackground
      source={isLandscape ? landscapeBackground : portraitBackground}
      style={orientationStyles.background}
    >
      {isLandscape ? (
        <>
          {/* Start of Landscape Views*/}

            <View style={orientationStyles.leftSide}> 

            </View>
            
          <View style={orientationStyles.middleSide}>

            <Image source={require('../assets/loginview/letter.png')} style={orientationStyles.letterImage} />


            <View style={orientationStyles.inputBoxContainer}>

              <View style={orientationStyles.inputBox}>
                <TextInput
                  style={orientationStyles.input}
                  placeholder={'Teacher Email'}
                  value={email}
                  onChangeText={setEmail}
                  importantForAutofill="no"
                  textAlignVertical="center"
                  placeholderTextColor="black" // placeholder text color
                />

              </View>

              <View style={orientationStyles.inputBox}>
                <TextInput
                  style={orientationStyles.input}
                  placeholder={'Student Name'}
                  value={name}
                  onChangeText={setName}
                  importantForAutofill="no"
                  textAlignVertical="center"
                  placeholderTextColor="black" // placeholder text color
                />
              </View>

              <View style={orientationStyles.inputBox}>
                <TextInput
                  style={orientationStyles.input}
                  placeholder={'Student PIN'}
                  value={pin}
                  onChangeText={setPin}
                  importantForAutofill="no"
                  textAlignVertical="center"
                  placeholderTextColor="black" // placeholder text color
                />

            </View>

            </View>

            <TouchableOpacity style={orientationStyles.loginButtonContainer} onPress={console.log(aspectRatio)}>
              <Image source={require('../assets/welcomeView/loginp.png')} style={orientationStyles.loginButton} />
            </TouchableOpacity>

            <Image source={require('../assets/loginview/friend.png')} style={orientationStyles.letterImage} />

            <TouchableOpacity style={orientationStyles.forgotPasswordButtonContainer} onPress={handleForgotPassword}>
              <Image source={require('../assets/loginview/fpass.png')} style={orientationStyles.forgotPasswordButton} />
            </TouchableOpacity>
           

          </View>

          <View style={orientationStyles.rightSide}>
          </View>
           
        </>
      ) : (
        <>
          {/* Start of Portrait Views*/}
          <View style={orientationStyles.container}>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black' }]}
                placeholder={isStudentMode ? 'Student Email' : 'Teacher Email'}
                value={email}
                onChangeText={setEmail}
                importantForAutofill="no"
                textAlignVertical="center"
                placeholderTextColor="black" //placeholder text color
                
              />
            </View>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black' }]}
                placeholder={isStudentMode ? 'Student Name' : 'Teacher Name'}
                value={name}
                onChangeText={setName}
                importantForAutofill="no"
                textAlignVertical="center"
                placeholderTextColor="black" //placeholder text color
              />
            </View>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black' }]}
                placeholder="Pin"
                value={pin}
                secureTextEntry
                onChangeText={setPin}
                importantForAutofill="no"
                textAlignVertical="center"
                placeholderTextColor="black" //placeholder text color
              />
            </View>
            <TouchableOpacity style={orientationStyles.forgotPasswordButtonContainer} onPress={handleForgotPassword}>
              <Image source={require('../assets/loginview/fpass.png')} style={orientationStyles.forgotPasswordButton} />
            </TouchableOpacity>
            <TouchableOpacity style={orientationStyles.loginButtonContainer} onPress={handleLogin}>
              <Image source={require('../assets/welcomeView/loginp.png')} style={orientationStyles.loginButton} />
            </TouchableOpacity>
            <TouchableOpacity style={orientationStyles.getStartedButtonContainer} onPress={handleGetStarted}>
              <Image source={require('../assets/loginview/gets.png')} style={orientationStyles.getStartedButton} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </ImageBackground>
  );
};


export default LoginScreen;

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
  const [showPassword, setShowPassword] = useState(false); // State for managing password visibility


  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
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
        height: '29%',
        resizeMode: 'contain',

      },
      input: {
        width: '100%',
        height: '100%',
        color: 'black', 
        fontSize: aspectRatio > 1.5 ? 20 : 30, // Adjust the font size as needed
        textAlign: 'center', 
        fontWeight: 'bold', // Make the text bold
      },
      inputBox: {
        width: '100%',
        height: aspectRatio > 1.5 ? '35%' : '30%',
        marginBottom: '2%',
        borderColor: 'black',
        borderWidth: 2.3,
        borderRadius: '100%',
        
      },
      inputBoxContainer: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',

        
      },
      loginButtonContainer: {
        width: '50%',
        height: '10%', 
        borderRadius: '50%', // Make it a circle
        marginTop: aspectRatio > 1.5 ? '4%' : '5%',

      },
      loginButton: {
        width: '100%', // Adjust the width as needed
        height: '100%', // Adjust the height as needed
        resizeMode: 'contain',
      },
      forgotPasswordButtonContainer: {
        width: '100%',
        height: '80%',
      },
      forgotPasswordButton: {
        width: aspectRatio > 1.5 ? '45%' : '55%',
        height: '10%',
        marginTop: '3.5%'
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
        flexDirection: 'column',
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
        justifyContent: 'center',
      },
      rightSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        width: '100%',
        color: 'black', 
        fontSize: 35, // Adjust the font size as needed
        textAlign: 'center', 
        fontWeight: 'bold', // Make the text bold
      },
      inputBox: {
        width: '70%',
        height: '50%',
        marginBottom: '2%',
        borderColor: 'black',
        borderWidth: 2.5,
        borderRadius: 500, // Use a large value to make it circular

      },
      inputBoxContainer: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%', 
      },
      loginButtonContainer: {
        width: '50%',
        height: '20%', // Increase the height to make the container higher
        borderRadius: '50%', // Make it a circle
        marginTop: '10%', // Adjust the marginTop value to raise the button
      },
      loginButton: {
        width: '100%', // Adjust the width as needed
        height: '80%', // Decrease the height to make the button smaller
        resizeMode: 'contain',
      },
      forgotPasswordButtonContainer: {
        width: '100%',
        height: '10%',
        marginTop: '3%', // Adjust the marginTop value to make it lower
        borderRadius: '30%', // Make it a circle or adjust as needed
      },
      forgotPasswordButton: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
    }
    
    
    });
  
  const isLandscape = screenWidth > screenHeight;

  const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
  const [landscapeBackground, setLandscapeBackground] = useState(
    require('../assets/loginview/loginBackground.gif')
  );
  const [portraitBackground, setPortraitBackground] = useState(
    require('../assets/loginview/loginportrait.gif')
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
    if (forgotPasswordPressed) {
      // Add functionality for the "Forgot Password" button here
      console.log("Forgot Password button pressed!");
      // Reset the state to handle future presses
      setForgotPasswordPressed(false);
    }
  }, [forgotPasswordPressed]);
/* Start of Login Logic. Sends a message over to the backend to authenticate student */


  const handleLogin = () => {
      // Logic to handle login
  axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/student-login/', {
      email: email,
      student_name: studentName, 
      pin: pin 
  })
  .then(async response => {
      // Handle success
      console.log(response.data);
      const { refresh, access } = response.data;
      // You can store these tokens in AsyncStorage or your state management solution
      // Navigate to next screen or show success message

      await SecureStore.setItemAsync('access_token', access);
      await SecureStore.setItemAsync('refresh_token', refresh);
     
      
      navigation.navigate('Word Batches');

  })
  .catch(error => {
      // Handle error
      console.log(error);
      
      // Show error message
      Alert.alert("Login failed", "Invalid credentials")
  });
      
  };
  /* End of Login Logic. */



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
                  secureTextEntry={!showPassword}
                  importantForAutofill="no"
                  textAlignVertical="center"
                  placeholderTextColor="black" // placeholder text color
                />

            </View>

            </View>

            <TouchableOpacity style={orientationStyles.loginButtonContainer} onPress={() => console.log(aspectRatio)}>
              <Image source={require('../assets/welcomeView/loginp.png')} style={orientationStyles.loginButton} />
            </TouchableOpacity>
            <Image source={require('../assets/loginview/fpass.png')} style={orientationStyles.forgotPasswordButton} />
            <TouchableOpacity style={orientationStyles.forgotPasswordButtonContainer} onPress={handleForgotPassword}>
              <Image source={require('../assets/loginview/friend.png')} style={orientationStyles.letterImage} />
            </TouchableOpacity>

            

           
           

          </View>

          <View style={orientationStyles.rightSide}>
          </View>
           
        </>
      ) : (
        <>
          {/* Start of Portrait Views*/}
          
          <View style={orientationStyles.leftSide}> 

</View>

<View style={orientationStyles.middleSide}>


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
      secureTextEntry={!showPassword}
      importantForAutofill="no"
      textAlignVertical="center"
      placeholderTextColor="black" // placeholder text color
    />

</View>

</View>

<TouchableOpacity style={orientationStyles.loginButtonContainer} onPress={() => console.log(aspectRatio)}>
  <Image source={require('../assets/welcomeView/loginp.png')} style={orientationStyles.loginButton} />
</TouchableOpacity>

<TouchableOpacity style={orientationStyles.forgotPasswordButtonContainer} >
  <Image source={require('../assets/loginview/fpass.png')} style={orientationStyles.forgotPasswordButton} />
</TouchableOpacity>


</View>

<View style={orientationStyles.rightSide}>
</View>
        </>
      )}
    </ImageBackground>
  );
};


export default LoginScreen;
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

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;

  const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
  const [landscapeBackground, setLandscapeBackground] = useState(
    require('../assets/loginview/login.gif')
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

  return (
    <ImageBackground
      source={isLandscape ? landscapeBackground : portraitBackground}
      style={orientationStyles.background}
    >
      {isLandscape ? (
        <>
          {/* Start of Landscape Views*/}
          <View style={orientationStyles.container}>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder={isStudentMode ? 'Student Email' : 'Teacher Email'}
                value={email}
                onChangeText={setEmail}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder={isStudentMode ? 'Student Name' : 'Teacher Name'}
                value={name}
                onChangeText={setName}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder="Pin"
                value={pin}
                secureTextEntry
                onChangeText={setPin}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <TouchableOpacity style={orientationStyles.loginButtonContainer} onPress={handleLogin}>
              <Image source={require('../assets/welcomeView/loginp.png')} style={orientationStyles.loginButton} />
            </TouchableOpacity>
          </View>

          </>) : (

                        <>
           {/* Start of Portrait Views*/}
           <View style={orientationStyles.container}>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder={isStudentMode ? 'Student Email' : 'Teacher Email'}
                value={email}
                onChangeText={setEmail}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder={isStudentMode ? 'Student Name' : 'Teacher Name'}
                value={name}
                onChangeText={setName}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <View style={orientationStyles.inputBox}>
              <TextInput
                style={[orientationStyles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder="Pin"
                value={pin}
                secureTextEntry
                onChangeText={setPin}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <TouchableOpacity style={orientationStyles.loginButtonContainer} onPress={handleLogin}>
              <Image
                source={require('../assets/welcomeView/loginp.png')}
                style={orientationStyles.loginButton}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

// Landscape styles
  landscape:{
    
    background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '50%', // Adjust the width as needed
    height: '50%', // Adjust the height as needed
    borderRadius: '50', // Numeric value for borderRadius
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    padding: 25,
    color: 'black', 
  },
  inputBox: {
    width: '100%',
    marginBottom: '3%',
    borderColor: 'black', 
    borderWidth: 1.5,
    borderRadius: '50%',
  },
  loginButtonContainer: {
    width: '30%',
    height: '40%',
    marginTop: '2%', 
    borderRadius: '50%', // Make it a circle
  },
  loginButton: {
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the height as needed
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
    height: '50%', // Adjust the height as needed
    borderRadius: '50', // Numeric value for borderRadius
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    padding: 25,
    color: 'black', 
  },
  inputBox: {
    width: '100%',
    marginBottom: '3%',
    borderColor: 'black', 
    borderWidth: 1.5,
    borderRadius: '50%',
  },
  loginButtonContainer: {
    width: '30%',
    height: '25%',
    marginTop: '3%', 
    borderRadius: '50%', // Make it a circle
  },
  loginButton: {
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the height as needed
    resizeMode: 'contain',
  },
},
});
export default LoginScreen;

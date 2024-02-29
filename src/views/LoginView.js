import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, useWindowDimensions} from 'react-native';
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
  const [backgroundImage, setBackgroundImage] = useState(require('../assets/loginview/login.gif'));

  useEffect(() => {
    // Function to update styles based on current orientation
    const updateOrientationStyles = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        setOrientationStyles(styles.landscape);
        setBackgroundImage(require('../assets/loginview/login.gif'));
      } else {
        setOrientationStyles(styles.portrait);
        setBackgroundImage(require('../assets/loginview/login.gif'));
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
          source={backgroundImage}
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
                        <View></View>

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
    width: '60%', // Adjust the width as needed
    height: '20%', // Adjust the height as needed
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'right',
    alignItems: 'center',
  },
  input: {
    height: 9,
    width: '100%',
    padding: 15,
    color: 'black', 
  },
  inputBox: {
    width: '100%',
    marginBottom: '2%',
    borderColor: 'black', 
    borderWidth: 1.5,
    borderRadius: 3,
  },
  loginButtonContainer: {
    width: '20%',
    height: '40%',
    marginTop: '2%', 
  },
  loginButton: {
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the height as needed
    resizeMode: 'contain',
  },
},
// Portrait styles
portrait: StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

})


});

export default LoginScreen;

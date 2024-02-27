import React, { useState } from 'react';
import { ImageBackground, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [isStudentMode, setStudentMode] = useState(true);

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
          source={require('../assets/loginview/login.gif')}
          style={styles.background}
        >
          <View style={styles.container}>
            <View style={[styles.inputContainer, styles.inputBox]}>
              <TextInput
                style={styles.input}
                placeholder={isStudentMode ? 'Student Email' : 'Teacher Email'}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={[styles.inputContainer, styles.inputBox]}>
              <TextInput
                style={styles.input}
                placeholder={isStudentMode ? 'Student Name' : 'Teacher Name'}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={[styles.inputContainer, styles.inputBox]}>
              <TextInput
                style={styles.input}
                placeholder="Pin"
                value={pin}
                secureTextEntry
                onChangeText={setPin}
              />
            </View>
            <TouchableOpacity onPress={handleLogin}>
              <Image source={require('../assets/welcomeView/loginp.png')} style={styles.loginButton} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      );
    };      

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '14%', // Adjust the width as needed
    height: '3%', // Adjust the height as needed
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 20,
    width: '100%',
    padding: 10,
    color: 'black', 
  },
  inputBox: {
    borderColor: 'black', 
    borderWidth: 3,
    borderRadius: 8,
  },
  loginButtonContainer: {
    marginBottom: 20, // Adjust the margin as needed
  },
  loginButton: {
    width: '100%', // Adjust the width as needed
    height: '25%', // Adjust the height as needed
    resizeMode: 'contain',
  },
});

export default LoginScreen;

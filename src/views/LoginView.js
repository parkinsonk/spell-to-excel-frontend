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
                style={[styles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder={isStudentMode ? 'Student Email' : 'Teacher Email'}
                value={email}
                onChangeText={setEmail}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <View style={[styles.inputContainer, styles.inputBox]}>
              <TextInput
                style={[styles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder={isStudentMode ? 'Student Name' : 'Teacher Name'}
                value={name}
                onChangeText={setName}
                importantForAutofill="no"
                textAlignVertical="center"
              />
            </View>
            <View style={[styles.inputContainer, styles.inputBox]}>
              <TextInput
                style={[styles.input, { color: 'black', fontWeight: 'bold' }]}
                placeholder="Pin"
                value={pin}
                secureTextEntry
                onChangeText={setPin}
                importantForAutofill="no"
                textAlignVertical="center"
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
    width: '60%', // Adjust the width as needed
    height: '20%', // Adjust the height as needed
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'right',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 9,
    width: '100%',
    padding: 15,
    color: 'black', 
  },
  inputBox: {
    borderColor: 'black', 
    borderWidth: 1.5,
    borderRadius: 3,
  },
  loginButtonContainer: {
    marginBottom: 9, 
  },
  loginButton: {
    width: '100%', // Adjust the width as needed
    height: '25%', // Adjust the height as needed
    resizeMode: 'contain',
  },
});

export default LoginScreen;

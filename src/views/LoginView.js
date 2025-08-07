import React, { useState } from 'react';
import { ImageBackground, View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from expo-secure-store
import { useProgress } from '../components/ProgressContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and @expo/vector-icons

/* Start of Login Logic. Sends a message over to the backend to authenticate student */
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    //const [studentName, setStudentName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const { checkFlyingHigh, checkSpringtimeFun, checkSunnyIsland,
        checkAlienAdventure, checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep } = useProgress();

    const handleLogin = () => {
        // Logic to handle login
    axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/student-login/', {
        email: email,
        student_name: 'Student Placeholder', // Hardcoded for now
        password: password
    })
    .then(async response => {
        // Handle success
        console.log(response.data);
        const { refresh, access } = response.data;
        // You can store these tokens in AsyncStorage or your state management solution
        // Navigate to next screen or show success message

        await SecureStore.setItemAsync('access_token', access);
        await SecureStore.setItemAsync('refresh_token', refresh);
        await checkFlyingHigh('Flying High');
        await checkSpringtimeFun('SpringTime Fun');
        await checkSunnyIsland('Sunny Island');
        await checkAlienAdventure('Alien Adventures');
        await checkOuterSpace('Outer Space');
        await checkPlanetsAndBeyond('Planets and Beyond');
        await checkDivingDeep('Diving Deep');
        
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

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) {
            return iPhoneValue;
        } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
            return iPadMiniValue;
        } else {
            return iPadValue;
        }
    };

    const styles = StyleSheet.create({
        background: {
            flex: 1, // Fill the entire screen
            width: '100%',
            height: '100%',
            flexDirection: 'row',
        },
        left: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            borderColor: 'red',
            borderWidth: 2,
        },
        middle: {
            flex: 1.5,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            borderColor: 'red',
            borderWidth: 2,
            alignContent: 'center',
            justifyContent: 'center',
        },
        right: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            borderColor: 'red',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        input: {
            height: isLandscape ? aspectRatio > 1.7 ? '12%' : '8%' : '5%',
            marginVertical: '1%',
            borderWidth: 2,
            fontSize: 15,
            padding: 10,
            borderRadius: 20,
            fontWeight: 'bold',
            borderColor: 'green',
            borderWidth: 2,
        },
        textStyles: {
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        loginOpacity: {
            width: '45%',
            height: '9%',
            marginTop: '2%',
            alignSelf: 'center',
        },
        Image: {
            width: '100%',
            height: '100%',
        },
        trickyImage: {
            width: '100%',
            height: isLandscape ? aspectRatio > 1.7 ? '20%' : '30%' : '30%',
            borderColor: 'green',
            borderWidth: 2,
        },
        friendsImage: {
            width: '100%',
            height: '30%',
            borderColor: 'green',
            borderWidth: 2,
        },
        forgotLogin: {
            width: '100%',
            height: '3%',
            marginVertical: '2%',
            justifyContent: 'center',
            alignItems: 'center',

        },
        forgotLoginText: {
            color: 'black',
            fontSize: isLandscape ? aspectRatio > 1.7 ? 10 : 15 : 15,
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationLine: 'underline',
        },
        sunAndCloudImage: {
            width: '100%',
            height: '80%',
            borderColor: 'green',
            borderWidth: 2,
        },
        cloudImage: {
            width: '80%',
            height: '30%',
            borderColor: 'green',
            borderWidth: 2,
        },
        eyeIcon: {
            borderColor: 'blue',
            borderWidth: 2,
        },
        passwordInput: {
            flexDirection: 'row', // To place the eye icon next to the TextInput
            height: isLandscape ? aspectRatio > 1.7 ? '12%' : '8%' : '5%',
            marginVertical: '1%',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 20,
            padding: 10,
        },
        passwordText: {
            flex: 1, // Take up all available space
            borderColor: 'red',
            borderWidth: 2,
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
        },
    });

    return (
        <ImageBackground
                source={require('../assets/loginView/loginBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >

            <SafeAreaView style={styles.left}>

               <Image source={require('../assets/loginView/sunAndCloud.png')} style={styles.sunAndCloudImage} resizeMode='contain'/>

            </SafeAreaView>

            <View style={styles.middle}>

                <Image source={require('../assets/loginView/tricky.png')} style={styles.trickyImage} resizeMode='contain'/>

                <Text style={styles.textStyles}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.textStyles}>Password</Text>
                <View style={styles.passwordInput}>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} // Toggle between hidden and visible Password
                        style={styles.passwordText} // Take up all available space
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-off'}
                            color="black"
                            style={styles.eyeIcon}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginOpacity} onPress={handleLogin}>
                    <Image source={require('../assets/loginView/loginButton.png')} style={styles.Image} resizeMode='contain'/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotLogin} onPress={() => navigation.navigate('Create Letter Friends Account')}>
                    <Text style={styles.forgotLoginText}> Don't have an account?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotLogin} onPress={() => navigation.navigate('Forgot Password')}>
                    <Text style={styles.forgotLoginText}> Forgot Password?</Text>
                </TouchableOpacity>

                <Image source={require('../assets/loginView/words.png')} style={styles.trickyImage} resizeMode='contain'/>

            </View>

            <SafeAreaView style={styles.right}>
                <Image source={require('../assets/loginView/cloud.png')} style={styles.cloudImage} resizeMode='contain'/>
            </SafeAreaView>
        </ImageBackground>
    );
};



export default LoginScreen;
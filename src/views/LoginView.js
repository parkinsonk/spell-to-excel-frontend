import React, { useState, useCallback } from 'react';
import { ImageBackground, View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator} from 'react-native';
import api from '../components/api'; // Import the configured axios instance
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from expo-secure-store
import { useProgress } from '../components/ProgressContext';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and @expo/vector-icons

/* Start of Login Logic. Sends a message over to the backend to authenticate student */
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    //const [studentName, setStudentName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [isLoading, setIsLoading] = useState(false);
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const { checkFlyingHigh, checkSpringtimeFun, checkSunnyIsland,
        checkAlienAdventure, checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep } = useProgress();


    const handleLogin = () => {
        // Logic to handle login
        setIsLoading(true);
        api.post('/student-login/', {
            email: email,
            password: password
        })
    .then(async response => {
        // Handle success
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

        // Preserve the current email to pass to the next screen, then clear inputs
        const emailToSend = email;
        setEmail('');
        setPassword('');

        navigation.navigate('Word Batches', { email: emailToSend });
        })
        .catch(error => {
            // Show only two user-facing messages: 'Invalid credentials' or 'Network error'
            if (error.response) {
                // Server responded with a status code
                if (error.response.status === 401) {
                    Alert.alert('Invalid credentials', 'Please check your email and password.');
                } else {
                    // For any other server error, surface a generic network/server message
                    Alert.alert('Network error', 'Server error. Please try again later.');
                }
            } else if (error.request) {
                // Request made but no response received
                Alert.alert('Network error', 'No response from server. Check your connection and try again.');
            } else {
                // Something happened setting up the request
                Alert.alert('Network error', 'An unexpected error occurred. Please try again.');
            }
        })
        .finally(() => {
            setIsLoading(false);
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
        },
        middle: {
            flex: 1.5,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
        },
        right: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
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
        },
        friendsImage: {
            width: '100%',
            height: '30%',
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
        },
        cloudImage: {
            width: '80%',
            height: '30%',
        },
        eyeIcon: {
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
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
        },
        loadingOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 10,
        },
        loadingText: {
            marginTop: 12,
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
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

            {isLoading && (
                <View style={styles.loadingOverlay} pointerEvents="none">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Logging You Into Your Account</Text>
                </View>
            )}
        </ImageBackground>
    );
};



export default LoginScreen;
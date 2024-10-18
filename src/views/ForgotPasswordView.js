import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, useWindowDimensions, Image} from 'react-native';
import axios from 'axios';

const ForgotPasswordView = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }
    
        // Using axios without CSRF
        axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/forgot-password/', { email })
            .then(response => {
                Alert.alert('Success', 'Password reset link has been sent to your email');
                navigation.navigate('Password Reset Code', { email });
            })
            .catch(error => {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'Failed to send reset link';
                    Alert.alert('Error', errorMessage);
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    Alert.alert('Error', 'No response from server. Please try again.');
                    console.error('Request error:', error.request);
                } else {
                    Alert.alert('Error', 'Failed to send reset link. Please try again.');
                    console.error('Error:', error.message);
                }
            });
    };

    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: '#fff',
        },
        title: {
            fontSize: calculateImageDimensions(aspectRatio, 24, 40, 40),
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
        },
        instructions: {
            fontSize: calculateImageDimensions(aspectRatio, 12, 20, 20),
            textAlign: 'center',
            marginBottom: 20,
        },
        input: {
            width: '80%',
            height: '12%',
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 10,
            fontSize: calculateImageDimensions(aspectRatio, 12, 35, 35),
            borderRadius: 8,
            marginBottom: 20,
        },
        resetbuttonOpacity: {
            width: '30%',
            height: '15%',
            alignSelf: 'center',
        },
        Image: {
            width: '100%',
            height: '100%',
        },
    });

    return (
        <ImageBackground
                source={require('../assets/loginView/loginBackground.png')}
                resizeMode="cover"
                style={styles.background}
        >
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.instructions}>Enter your email address to reset your password.</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.resetbuttonOpacity} onPress={handleForgotPassword}>
                <Image source={require('../assets/forgotPasswordView/sendResetLink.png')} style={styles.Image} resizeMode='contain'/>
            </TouchableOpacity>

        </ImageBackground>
    );
};

export default ForgotPasswordView;
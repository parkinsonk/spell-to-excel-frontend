import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, useWindowDimensions, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

const PasswordResetCodeView = ({ navigation, route }) => {
    const { email } = route.params;
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

    const handleResetPassword = () => {
        if (!resetCode || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please enter the reset code and both password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match. Please try again.');
            return;
        }

        axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/reset-password/', { reset_code: resetCode, new_password: newPassword, email: email })
            .then(response => {
                Alert.alert('Success', 'Your password has been reset.');
                navigation.navigate('Login');
            })
            .catch(error => {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'Failed to reset password';
                    Alert.alert('Error', errorMessage);
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    Alert.alert('Error', 'No response from server. Please try again.');
                    console.error('Request error:', error.request);
                } else {
                    Alert.alert('Error', 'Failed to reset password. Please try again.');
                    console.error('Error:', error.message);
                }
            });
    };

    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = isLandscape ? screenWidth / screenHeight : screenHeight / screenWidth;

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
            padding: 10,
            fontSize: calculateImageDimensions(aspectRatio, 12, 24, 35),
            borderRadius: 8,
            marginBottom: 20,
        },
        passwordInput: {
            flexDirection: 'row',
            width: '80%',
            height: '12%',
            padding: 10,
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            alignItems: 'center',
        },
        passwordText: {
            flex: 1,
            fontSize: calculateImageDimensions(aspectRatio, 12, 24, 35),
        },
        resetButtonOpacity: {
            width: '25%',
            height: '15%',
            alignSelf: 'center',
        },
        image: {
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
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.instructions}>Enter the reset code you received in your email and set a new password.</Text>
            <TextInput
                style={styles.input}
                value={resetCode}
                onChangeText={setResetCode}
                placeholder="Reset Code"
                keyboardType="numeric"
            />
            
            {/* Password Field with Toggle */}
            <View style={styles.passwordInput}>
                <TextInput
                    style={styles.passwordText}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        color="black"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            {/* Confirm Password Field with Toggle */}
            <View style={styles.passwordInput}>
                <TextInput
                    style={styles.passwordText}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                        name={showConfirmPassword ? 'eye' : 'eye-off'}
                        color="black"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetButtonOpacity} onPress={handleResetPassword}>
                <Image source={require('../assets/passwordResetCodeView/resetPassword.png')} style={styles.image} resizeMode='contain'/>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default PasswordResetCodeView;
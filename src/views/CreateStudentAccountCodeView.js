import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, useWindowDimensions, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

const CreateStudentAccountCodeView = ({ navigation, route }) => {
    const { email, password} = route.params;
    const [accountConfirmationCode, setAccountConfirmationCode] = useState('');

    const handleResetPassword = () => {
        if (!accountConfirmationCode) {
            Alert.alert('Error', 'Please fill Confirmation Code field.');
            return;
        }

        axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/create-student-account/', {
            email: email,
            password: password,
            confirmation_code: accountConfirmationCode,
        })
            .then(response => {
                Alert.alert('Success!', 'Your account has been set up.');
                navigation.navigate('Login');
            })
            .catch(error => {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'Failed to validate confirmation code';
                    Alert.alert('Error', errorMessage);
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    Alert.alert('Error', 'No response from server. Please try again.');
                    console.error('Request error:', error.request);
                } else {
                    Alert.alert('Error', 'Failed to validate confirmation code. Please try again.');
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
        confirmationButtonOpacity: {
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
            <Text style={styles.title}>Account Confirmation Code</Text>
            <Text style={styles.instructions}>Enter the confirmation code sent to your email to finish setting up your account.</Text>

            <TextInput
                style={styles.input}
                value={accountConfirmationCode}
                onChangeText={setAccountConfirmationCode}
                placeholder="Confirmation Code"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.confirmationButtonOpacity} onPress={handleResetPassword}>
                <Image source={require('../assets/createStudentAccountCodeView/validateConfirmationCode.png')} style={styles.image} resizeMode='contain'/>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default CreateStudentAccountCodeView;
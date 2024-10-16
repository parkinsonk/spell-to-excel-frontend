import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ImageBackground, Image, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility
    const navigation = useNavigation();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const handleRegister = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password || !confirmPassword) {
            Alert.alert("Missing Information", "Please fill out all fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/create-student-account/', {
            email: email,
            password: password,
            teacher_name: 'Teacher Placeholder', // Hardcoded for now
            classroom_name: 'Classroom Placeholder', // Hardcoded for now
            student_name: 'Student Placeholder', // Hardcoded for now
        })
        .then(response => {
            Alert.alert("Success", "Account created successfully!");
            navigation.navigate('Login');
        })
        .catch(error => {
            console.error(error);
            Alert.alert("Registration failed", "Please try again.");
        });
    };

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
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        title: {
            fontSize: calculateImageDimensions(aspectRatio, 24, 24, 40),
            fontWeight: 'bold',
            marginBottom: 20,
        },
        input: {
            width: '80%',
            height: '12%',
            fontSize: calculateImageDimensions(aspectRatio, 12, 24, 35),
            padding: 10,
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
        },
        createAccountOpacity: {
            width: '20%',
            height: '15%',
            alignSelf: 'center',
        },
        buttonImage: {
            width: '100%',
            height: '100%',
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
        }
    });

    return (
        <ImageBackground
                source={require('../assets/loginView/loginBackground.png')}
                resizeMode="cover"
                style={styles.background}
        >
            <Text style={styles.title}>Create Letter Friends Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            {/* Password Field with Toggle */}
            <View style={styles.passwordInput}>
                <TextInput
                    style={styles.passwordText}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
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
                    placeholder="Confirm Password"
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

            <TouchableOpacity style={styles.createAccountOpacity} onPress={handleRegister}>
                <Image source={require('../assets/createAccountView/createAccount.png')} style={styles.buttonImage} resizeMode='contain'/>
            </TouchableOpacity>
        </ImageBackground>
    );
};



export default RegisterScreen;
import React, { useState } from 'react';
import { ImageBackground, View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from expo-secure-store
import { useProgress } from '../components/ProgressContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and @expo/vector-icons

/* Start of Login Logic. Sends a message over to the backend to authenticate student */
const DeleteProgramView = ({ navigation, route }) => {

    const { email } = route.params;
    const [accountPassword, setAccountPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [isLoading, setIsLoading] = useState(false);
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) {
            return iPhoneValue;
        } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
            return iPadMiniValue;
        } else {
            return iPadValue;
        }
    };

    const handleDeleteAccount = () => {

        setIsLoading(true);
        axios.delete('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/delete-student-account/', { data: { email: email, password: accountPassword } })
            .then(response => {
                setIsLoading(false);
                Alert.alert('Success', 'Your account has been deleted.');
                navigation.navigate('Login');
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response) {
                    const errorMessage = error.response.data.error || 'Failed to delete account';
                    Alert.alert('Error', errorMessage);
                    console.error('Response error:', error.response.data);
                } else if (error.request) {
                    Alert.alert('Error', 'No response from server. Please try again.');
                    console.error('Request error:', error.request);
                } else {
                    Alert.alert('Error', 'Failed to delete account. Please try again.');
                    console.error('Error:', error.message);
                }
            });
    };

    const styles = StyleSheet.create({
        background: {
            flex: 1, // Fill the entire screen
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            
        },
        screen: {
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        passwordInput: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 2,
            paddingHorizontal: 10,
            width: isLandscape ? '40%' : '80%',
            height: 50,
            backgroundColor: 'white',
            borderRadius: 5,
        },
        passwordText: {
            flex: 1,
            height: '100%',
            fontSize: 16,
        },
        
        imageOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '14%', '8%', '8%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '22%', '20%', '20%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
            marginTop: '2%'},
        image: {
            height: '100%',
            width: '100%',
        },

    });

    return (
        <ImageBackground
                source={require('../assets/loginView/loginBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                
            
            <View style={styles.screen}>


                <Text style={{fontSize: calculateImageDimensions(aspectRatio, 20, 30, 40), fontWeight: 'bold', marginBottom: '5%'}}>Enter your account password to delete your account:</Text>
                <Text style={{fontSize: calculateImageDimensions(aspectRatio, 12, 20, 20), fontWeight: 'bold', textAlign: 'center', marginBottom: '5%', color: 'red'}}>Warning: This action is irreversible and will result in the loss of all your progress and data.</Text>

                    <View style={styles.passwordInput}>
                        <TextInput
                            style={styles.passwordText}
                            placeholder="Account Password"
                            value={accountPassword}
                            onChangeText={setAccountPassword}
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
                    <TouchableOpacity style={styles.imageOpacity} onPress={handleDeleteAccount}>
                        <Image source={require('../assets/accountSettingsView/deleteAccount.png')}  style={styles.image} resizeMode='contain' />
                    </TouchableOpacity>


            </View>


        </ImageBackground>
    );
};



export default DeleteProgramView;
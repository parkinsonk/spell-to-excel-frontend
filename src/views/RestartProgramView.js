import React, { useState } from 'react';
import { ImageBackground, View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useProgress } from '../components/ProgressContext';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and @expo/vector-icons
import api from '../components/api'; // Import the configured axios instance

/* Start of Login Logic. Sends a message over to the backend to authenticate student */
const RestartProgramView = ({ navigation, route }) => {

    const { email } = route.params;
    const [accountPassword, setAccountPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const { checkFlyingHigh, checkSpringtimeFun, checkSunnyIsland,
            checkAlienAdventure, checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep } = useProgress();

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) {
            return iPhoneValue;
        } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
            return iPadMiniValue;
        } else {
            return iPadValue;
        }
    };

    const handleRestartProgram = () => {
        setIsLoading(true);

        api.post('/restart-program/', { email: email, password: accountPassword })
            .then(async response => {
                
                await checkFlyingHigh('Flying High');
                await checkSpringtimeFun('SpringTime Fun');
                await checkSunnyIsland('Sunny Island');
                await checkAlienAdventure('Alien Adventures');
                await checkOuterSpace('Outer Space');
                await checkPlanetsAndBeyond('Planets and Beyond');
                await checkDivingDeep('Diving Deep');   
                setIsLoading(false);
                Alert.alert('Success', 'Your program has been restarted.');
                navigation.navigate('Word Batches', { email: email });
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response) {
                    const errorMessage = error.response.data.error || 'Failed to restart program';
                    Alert.alert('Error', errorMessage);
                } else if (error.request) {
                    Alert.alert('Error', 'No response from server. Please try again.');
                } else {
                    Alert.alert('Error', 'Failed to restart program. Please try again.');
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
                
            
            <View style={styles.screen}>


                <Text style={{fontSize: calculateImageDimensions(aspectRatio, 20, 30, 40), fontWeight: 'bold', marginBottom: '5%'}}>Enter your account password to restart your account:</Text>
                <Text style={{fontSize: calculateImageDimensions(aspectRatio, 12, 20, 20), fontWeight: 'bold', textAlign: 'center', marginBottom: '5%', color: 'red'}}>Warning: This action cannot be undone. Your account stays intact, but all progress will reset.</Text>

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
                    <TouchableOpacity style={[styles.imageOpacity, isLoading && { opacity: 0.6 }]} onPress={handleRestartProgram} disabled={isLoading}>
                        <Image source={require('../assets/accountSettingsView/restartProgram.png')}  style={styles.image} resizeMode='contain' />
                    </TouchableOpacity>

                    {isLoading && (
                        <View style={styles.loadingOverlay} pointerEvents="none">
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.loadingText}>Restarting your program…</Text>
                        </View>
                    )}


            </View>


        </ImageBackground>
    );
};



export default RestartProgramView;
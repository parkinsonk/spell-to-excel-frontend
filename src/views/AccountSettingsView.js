import React, { useState } from 'react';
import { ImageBackground, View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from expo-secure-store
import { useProgress } from '../components/ProgressContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo and @expo/vector-icons

/* Start of Login Logic. Sends a message over to the backend to authenticate student */
const AccountSettings = ({ navigation, route }) => {

    const { email } = route.params;
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
            justifyContent: 'space-evenly',
            flexDirection: 'column',
        },
        imageOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '18%', '18%', '13%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '33%', '48%', '35%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
        },
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

                    <TouchableOpacity style={styles.imageOpacity} onPress={() => navigation.navigate('Restart Program', { email: email })}>
                        <Image source={require('../assets/accountSettingsView/restartProgram.png')}  style={styles.image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.imageOpacity} onPress={() => navigation.navigate('Delete Program', { email: email })}>
                        <Image source={require('../assets/accountSettingsView/deleteAccount.png')}  style={styles.image} resizeMode='contain' />
                    </TouchableOpacity>


            </View>


        </ImageBackground>
    );
};



export default AccountSettings;
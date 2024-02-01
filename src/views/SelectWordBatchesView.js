import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const SelectWordBatchesView = ({ navigation }) => {

    return (
        <View style={[
            styles.container, 
            ]}>
                {/* Batch 1-13 */}
                <ImageBackground 
                    source={require('../assets/SelectWordBatchesView/BatchesBackground.png')} 
                    resizeMode="cover"
                    style={styles.background}
                >
                    <TouchableOpacity 
                    style={[styles.button, { top: 50, left: 30 }]} // Adjust position as needed
                    onPress={() => console.log('Button 1 pressed')} // Handle button press
                >
                    <Image source={require('../assets/SelectWordBatchesView/1-13.png')} style={styles.buttonImage} />
                </TouchableOpacity>

                </ImageBackground>
                
        </View>
     
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    background: {
    flex: 1, // Take up all available space
    width: '100%', // Ensure full width
    height: '100%', // Ensure full height
}
});

export default SelectWordBatchesView;
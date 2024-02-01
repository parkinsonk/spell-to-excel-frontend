import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
                    style={styles.batch1opacity} // Adjust position as needed
                    onPress={() => console.log('Button 1 pressed')} // Handle button press
                >
                    <Image source={require('../assets/SelectWordBatchesView/1-13.png')} style={styles.batch1Image}/>
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
},
    batch1opacity: {
        marginTop: screenHeight * 0.05,
        resizeMode: 'contain',
    },
    batch1Image: {
        width: screenWidth * .25,
        height: screenHeight * .25,
        resizeMode: 'contain',
    },
});

export default SelectWordBatchesView;
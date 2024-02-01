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
                
                <ImageBackground 
                    source={require('../assets/SelectWordBatchesView/BatchesBackground.png')} 
                    resizeMode="cover"
                    style={styles.background}
                >
                    {/* Batch 1-13 */}
                    <TouchableOpacity 
                    style={styles.batch1opacity} // Adjust position as needed
                    onPress={() => console.log('Button 1 pressed')} // Handle button press
                >
                    <Image source={require('../assets/SelectWordBatchesView/1-13.png')} style={styles.batch1Image}/>
                </TouchableOpacity>

                {/* Batch 14-28 */}
                <TouchableOpacity 
                    style={styles.batch2opacity} // Adjust position as needed
                    onPress={() => console.log('Button 2 pressed')} // Handle button press
                >
                    <Image source={require('../assets/SelectWordBatchesView/14-28.png')} style={styles.batch2Image}/>
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
        marginLeft: screenWidth * 0.15,
        width: screenWidth * .3,
        height: screenHeight * .3,
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
    },
    batch1Image: {
        width: screenWidth * .3,
        height: screenHeight * .3,
        resizeMode: 'contain',
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
        
    },
    batch2opacity: {
        marginTop: screenHeight * 0.005,
        resizeMode: 'contain',
        marginLeft: -20,
        width: screenWidth * .35,
        height: screenHeight * .4,
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
    },
    batch2Image: {
        width: screenWidth * .35,
        height: screenHeight * .4,
        alignSelf: 'flex-start',
        resizeMode: 'contain',
    },
});

export default SelectWordBatchesView;
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
                    

                <View style={styles.batchRow}>
                    {/* Flying High Batch */}
                    <TouchableOpacity 
                        style={styles.FlyingHighOpacity} // Adjust position as needed
                        onPress={() => console.log('Button 1 pressed')} // Handle button press
                    >
                        <Image source={require('../assets/SelectWordBatchesView/FlyingHigh.png')} style={styles.FlyingHighImage}/>
                    </TouchableOpacity>
                    
                    {/* Sunny Island Batch */}
                    <TouchableOpacity 
                        style={styles.SunnyIslandOpacity} // Adjust position as needed
                        onPress={() => console.log('Button 3 pressed')} // Handle button press
                    >
                        <Image source={require('../assets/SelectWordBatchesView/SunnyIsland.gif')} style={styles.SunnyIslandImage}/>
                    </TouchableOpacity>
                </View>

                {/* Springtime Fun Batch */}
                <TouchableOpacity 
                        style={styles.SpringtimeFunOpacity} // Adjust position as needed
                        onPress={() => console.log('Button 2 pressed')} // Handle button press
                    >
                        <Image source={require('../assets/SelectWordBatchesView/SpringtimeFun.png')} style={styles.SpringtimeFunImage}/>
                </TouchableOpacity>

                <TouchableOpacity 
                        style={styles.AlienAdventuresOpacity} // Adjust position as needed
                        onPress={() => console.log('Button 4 pressed')} // Handle button press
                    >
                        <Image source={require('../assets/SelectWordBatchesView/AlienAdventures.png')} style={styles.AlienAdventuresImage}/>
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
    batchRow: {
        flexDirection: 'row', // Layout children in a row
        alignItems: 'center', // Align items vertically
        justifyContent: 'flex-start', // Align items to the start of the row
    },
    FlyingHighOpacity: {
        marginTop: screenHeight * 0.05,
        resizeMode: 'contain',
        marginLeft: screenWidth * 0.1,
        width: screenWidth * .25,
        height: screenHeight * .3,
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
    },
    FlyingHighImage: {
        width: screenWidth * .25,
        height: screenHeight * .3,
        resizeMode: 'contain',
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
        
    },
    SpringtimeFunOpacity: {
        marginTop: screenHeight * 0.005,
        resizeMode: 'contain',
        marginLeft: -20,
        width: screenWidth * .35,
        height: screenHeight * .4,
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
    },
    SpringtimeFunImage: {
        width: screenWidth * .35,
        height: screenHeight * .4,
        alignSelf: 'flex-start',
        resizeMode: 'contain',
    },
    SunnyIslandOpacity: {
        marginTop: screenHeight * 0.005,
        resizeMode: 'contain',
        marginLeft: screenWidth * 0.05,
        width: screenWidth * .2,
        height: screenHeight * .4,
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
    },
    SunnyIslandImage: {
        width: screenWidth * .2,
        height: screenHeight * .4,
        alignSelf: 'flex-start',
        resizeMode: 'contain'
    },
    AlienAdventuresOpacity: {
        marginTop: screenHeight * 0.005,
        resizeMode: 'contain',
        marginLeft: screenWidth * 0.05,
        width: screenWidth * .2,
        height: screenHeight * .4,
        borderColor: 'red', // Temporary for visual debugging
        borderWidth: 1
    },
    AlienAdventuresImage: {
        width: screenWidth * .2,
        height: screenHeight * .4,
        alignSelf: 'flex-start',
        resizeMode: 'contain'
    },
    
});

export default SelectWordBatchesView;
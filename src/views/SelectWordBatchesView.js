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
                    <View style={styles.upperHalf}>
               
                        {/* Flying High Batch */}
                        <TouchableOpacity 
                            style={styles.FlyingHighOpacity} // Adjust position as needed
                            onPress={() => console.log('Button 1 pressed')} // Handle button press
                        >
                            <Image source={require('../assets/SelectWordBatchesView/FlyingHigh.png')} style={styles.FlyingHighImage}/>
                        </TouchableOpacity>

                        {/* Sunny Island */}
                        <TouchableOpacity 
                            style={styles.SunnyIslandOpacity}
                            onPress={() => console.log('Button 1 pressed')}
                        >
                            <Image source={require('../assets/SelectWordBatchesView/SunnyIsland.gif')} style={styles.SunnyIslandImage}/>
                        </TouchableOpacity>

                        {/* Planets and Beyond */}
                        <TouchableOpacity 
                            style={styles.PlanetsAndBeyondOpacity} // Adjust position as needed
                            onPress={() => console.log('Button 1 pressed')} // Handle button press
                        >
                            <Image source={require('../assets/SelectWordBatchesView/PlanetsAndBeyond.png')} style={styles.PlanetsAndBeyondImage}/>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.bottomHalf}>

                        {/* Springtime Fun */}
                        <TouchableOpacity 
                            style={styles.SpringtimeFunOpacity} // Adjust position as needed
                            onPress={() => console.log('Button 1 pressed')} // Handle button press
                        >
                            <Image source={require('../assets/SelectWordBatchesView/SpringtimeFun.png')} style={styles.SpringtimeFunImage}/>
                        </TouchableOpacity>

                        {/* Alien Adventures */}
                        <TouchableOpacity 
                            style={styles.AlienAdventuresOpacity} // Adjust position as needed
                            onPress={() => console.log('Button 1 pressed')} // Handle button press
                        >
                            <Image source={require('../assets/SelectWordBatchesView/AlienAdventures.png')} style={styles.AlienAdventuresImage}/>
                        </TouchableOpacity>

                        {/* Outer Space */}
                        <TouchableOpacity 
                            style={styles.OuterSpaceOpacity} // Adjust position as needed
                            onPress={() => console.log('Button 1 pressed')} // Handle button press
                        >
                            <Image source={require('../assets/SelectWordBatchesView/OuterSpace.png')} style={styles.OuterSpaceImage}/>
                        </TouchableOpacity>

                        

                        {/* Diving Deep */}
                        <TouchableOpacity 
                            style={styles.DivingDeepOpacity} // Adjust position as needed
                            onPress={() => console.log('Button 1 pressed')} // Handle button press
                        >
                            <Image source={require('../assets/SelectWordBatchesView/DivingDeep.png')} style={styles.DivingDeepImage}/>
                        </TouchableOpacity>

                    </View>

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

    upperHalf: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    bottomHalf: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    FlyingHighOpacity: {
        marginTop: '5%',
        marginLeft: '15%',
        height: '70%',
        width: '20%',
    },

    FlyingHighImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    SunnyIslandOpacity: {
        marginTop: '2%',
        marginLeft: '10%',
        height: '70%',
        width: '20%',
    },

    SunnyIslandImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    SpringtimeFunOpacity: {
        height: '70%',
        width: '25%',
    },

    SpringtimeFunImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    AlienAdventuresOpacity: {
        marginTop: '10%',
        marginRight: '5%',
        height: '70%',
        width: '20%',
    },

    AlienAdventuresImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    OuterSpaceOpacity: {
        marginTop: '3%',
        height: '70%',
        width: '20%',
    },

    OuterSpaceImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    PlanetsAndBeyondOpacity: {
        marginTop: '8%',
        marginLeft: '10%',
        height: '90%',
        width: '20%',
    },

    PlanetsAndBeyondImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',

    },

    DivingDeepOpacity: {
        marginTop: '8%',
        marginLeft: '8%',
        height: '70%',
        width: '20%',
    },

    DivingDeepImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },



    
});

export default SelectWordBatchesView;
import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SunnyIslandWordsView = ({ navigation }) => {

    const { sunnyIslandStatus, isLoading } = useProgress();

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = sunnyIslandStatus[word] ? sunnyIslandStatus[word].test_correct : false; // Check if word exists.
        const key = isCompleted ? `${word}completed` : word; // If word is completed, append 'completed' to the word to get the image key.
        return wordImageMapping[key];
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        
            <ImageBackground
                source={require('../assets/sunnyIslandWordsView/sunnyIslandLandscapeBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                </View>

                <View style={styles.middle}>

                </View>

                <View style={styles.bottom}>

                    <View style={styles.bottomLeft}>
                        <Image source={require('../assets/sunnyIslandWordsView/surferDude.gif')} style={styles.surferImage} resizeMode='contain' />
                    </View>

                    <View style={styles.bottomMiddle}>
                    </View>

                    <View style={styles.bottomRight}>
                    </View>
                    
                </View>
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        
        flexDirection: 'column',
    },
    top: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    middle: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bottomLeft: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bottomMiddle: {
        flex: 1,
    },
    surferImage: {
        width: '100%',
        height: '100%',
    },
    bottomRight: {
        flex: 1,
    },
    theOpacity: {
        height: '55%',
        width: '15%',
        resizeMode: 'contain',
        marginTop: '6%',
        marginLeft: '15%',
    },
    toOpacity: {
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '8%',
        marginTop: '1%'
    },
    PlaneSun: {
        height: '90%',
        width: '30%',
        resizeMode: 'contain',
        marginLeft: '4%',
        marginTop: '1%',
    },
    ofOpacity: {
        height: '50%',
        width: '12%',
        resizeMode: 'contain',
        marginLeft: '1%',
        marginTop: '10%',
    },
    isOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '2%',
        marginTop: '1%',
    },

    youOpacity: {
        height: '70%',
        width: '17%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },

    inOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '5%',
    },
    andOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '4%',
    },
    thatOpacity: { 
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '3%',
        marginTop: '8%',
    },
    itOpacity: {
        height: '50%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },
    heOpacity: {
        height: '40%',
        width: '13%',
        resizeMode: 'contain',
        marginLeft: '10%',
        marginTop: '3%',
    },
    wasOpacity: {
        height: '50%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },
    aOpacity: {
        height: '50%',
        width: '13%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '3%',
    },
    forOpacity: {
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '3%',
        marginTop: '6%',
    },


});

export default SunnyIslandWordsView;
import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';

const OuterSpaceWordsView = ({ navigation }) => {

    const { alienAdventureStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const getImageSource = (word) => {
        // Check if the word is completed using the alienAdventureStatus.
        const isCompleted = alienAdventureStatus[word] ? alienAdventureStatus[word].test_correct : false; // Check if word exists.
        const key = isCompleted ? `${word}completed` : word; // If word is completed, append 'completed' to the word to get the image key.
        return wordImageMapping[key];
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
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'green',
            borderWidth: 2,
        },
        middleTop: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'green',
            borderWidth: 2,
        },
        middleBottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'green',
            borderWidth: 2,
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'green',
            borderWidth: 2,
        },
        aboutOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '45%') : calculateImageDimensions(aspectRatio, '25%', '25%', '25%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '15%', '15%') : calculateImageDimensions(aspectRatio, '17%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '0%', '0%', '0%'),
        },
        doOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '65%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '15%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '5%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        sheOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '55%', '50%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        theirOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '45%') : calculateImageDimensions(aspectRatio, '35%', '30%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '19%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '8%', '8%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        ifOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '65%', '60%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '3%') : calculateImageDimensions(aspectRatio, '5%', '10%', '10%'),
        },
        otherOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '45%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
        },
        upOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '60%', '55%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '5%', '8%') : calculateImageDimensions(aspectRatio, '5%', '15%', '15%'),
        },
        willOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '55%', '45%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        howOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '50%') : calculateImageDimensions(aspectRatio, '35%', '25%', '25%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '20%', '25%') : calculateImageDimensions(aspectRatio, '9%', '26%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '3%', '3%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        outOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '50%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '9%', '9%') : calculateImageDimensions(aspectRatio, '20%', '5%', '5%'),
        },
        manyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '25%', '25%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '14%', '15%', '19%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '10%', '0%', '0%'),
        },
        thenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '65%', '65%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '15%', '15%'),
        },
        themOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '45%', '55%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '5%', '5%'),
        },
        whichOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '25%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '10%', '10%') : calculateImageDimensions(aspectRatio, '8%', '15%', '15%'),
        },
        eachOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '1%', '1%') : calculateImageDimensions(aspectRatio, '15%', '0%', '0%'),
        },
        Image: {
            height: '100%',
            width: '100%',
        },
    });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        
            <ImageBackground
                source={require('../assets/outerSpaceView/outerSpaceBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                </View>

                <View style={styles.middleTop}>

                </View>

                <View style={styles.middleBottom}>

                </View>


                <View style={styles.bottom}>

                </View>
            
                
            </ImageBackground>

    );
};



export default OuterSpaceWordsView;
import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, threeton, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';

const SpringtimeFundWordsView = ({ navigation }) => {

    const { springtimeFunStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = springtimeFunStatus[word] ? springtimeFunStatus[word].test_correct : false; // Check if word exists.
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
            justifyContent: 'center',
            alignItems: 'flex-end',
            borderColor: 'red',
            borderWidth: 2,

            marginRight: 5
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
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
            borderColor: 'blue',
            borderWidth: 2,
        },
        oneOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
            marginRight: '5%'
            
        },
        twoOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
            marginRight: '5%'
        },
        blueOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
        },
        threeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
            marginRight: '5%'
        },
        yellowOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
            marginRight: '5%'
        },
        nineOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '56%', '41%', '32%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '17%', '15%') : calculateImageDimensions(aspectRatio, '25%', '25%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
        },
        greenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '7%', '8%', '9%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),

        },
        fourOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        purpleOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        fiveOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        pinkOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        sevenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        whiteOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        blackOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        eightOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '8%', '9%', '10%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
        },
        notOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        
        
        
        birdImage: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '75%', '80%', '80%') : calculateImageDimensions(aspectRatio, '50%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '18%', '22%') : calculateImageDimensions(aspectRatio, '22%', '27%', '24%'),
        },
        sunImage: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '100%', '100%') : calculateImageDimensions(aspectRatio, '50%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '20%', '22%') : calculateImageDimensions(aspectRatio, '22%', '22%', '22%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
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
                source={require('../assets/springtimeFunView/springtimeFunBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <TouchableOpacity style={styles.oneOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'when', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('one', springtimeFunStatus['one'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.twoOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'two', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('two', springtimeFunStatus['two'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'blue', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('blue', springtimeFunStatus['blue'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.threeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'three', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('three', springtimeFunStatus['three'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.yellowOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'yellow', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('yellow', springtimeFunStatus['yellow'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nineOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'nine', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('nine', springtimeFunStatus['nine'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.greenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'four', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('green', springtimeFunStatus['green'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fourOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'four', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('four', springtimeFunStatus['four'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.purpleOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'by', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('purple', springtimeFunStatus['purple'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fiveOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'five', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('five', springtimeFunStatus['five'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pinkOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'we', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('pink', springtimeFunStatus['pink'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.sevenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'an', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('seven', springtimeFunStatus['seven'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.eightOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'eight', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('eight', springtimeFunStatus['eight'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whiteOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'all', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('white', springtimeFunStatus['white'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blackOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'can', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('black', springtimeFunStatus['black'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>
            
                
            </ImageBackground>

    );
};



export default SpringtimeFundWordsView;
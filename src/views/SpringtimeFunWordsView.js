import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
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
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end', 
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        girlBeeImage: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '100%', '100%') : calculateImageDimensions(aspectRatio, '70%', '70%', '70%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '18%', '20%') : calculateImageDimensions(aspectRatio, '25%', '25%', '25%'),
        },
        yourOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        byOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        saidOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        weOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        anOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        allOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        whatOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        canOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        notOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '60%') : calculateImageDimensions(aspectRatio, '35%', '30%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '7%', '8%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '3%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        butOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '69%', '58%') : calculateImageDimensions(aspectRatio, '40%', '35%', '40%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '21%', '21%') : calculateImageDimensions(aspectRatio, '25%', '26%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
        },
        wereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '69%', '58%') : calculateImageDimensions(aspectRatio, '40%', '35%', '40%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '21%', '21%') : calculateImageDimensions(aspectRatio, '25%', '26%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
        },
        useOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '69%', '58%') : calculateImageDimensions(aspectRatio, '40%', '35%', '40%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '21%', '21%') : calculateImageDimensions(aspectRatio, '25%', '26%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
        },
        whenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '69%', '58%') : calculateImageDimensions(aspectRatio, '40%', '35%', '40%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '21%', '21%') : calculateImageDimensions(aspectRatio, '25%', '26%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
        },
        wordsOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '69%', '58%') : calculateImageDimensions(aspectRatio, '40%', '35%', '40%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '21%', '21%') : calculateImageDimensions(aspectRatio, '25%', '26%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
        },
        thereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '69%', '58%') : calculateImageDimensions(aspectRatio, '40%', '35%', '40%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '21%', '21%') : calculateImageDimensions(aspectRatio, '25%', '26%', '26%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
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

                    <TouchableOpacity style={styles.whenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'when', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('when', springtimeFunStatus['when'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'there', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('there', springtimeFunStatus['there'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wordsOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'words', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('words', springtimeFunStatus['words'])} style={styles.Image} />
                    </TouchableOpacity>

                    <Image source={require('../assets/springtimeFunView/sun.png')} style={styles.sunImage} />

                </View>

                <View style={styles.middle}>

                    <Image source={require('../assets/springtimeFunView/bird.png')} style={styles.birdImage} />

                    <TouchableOpacity style={styles.butOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'but', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('but', springtimeFunStatus['but'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'were', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('were', springtimeFunStatus['were'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.useOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'use', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('use', springtimeFunStatus['use'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.yourOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'your', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('your', springtimeFunStatus['your'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.byOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'by', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('by', springtimeFunStatus['by'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saidOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'said', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('said', springtimeFunStatus['said'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'we', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('we', springtimeFunStatus['we'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.anOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'an', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('an', springtimeFunStatus['an'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.allOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'all', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('all', springtimeFunStatus['all'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whatOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'what', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('what', springtimeFunStatus['what'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.canOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'can', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('can', springtimeFunStatus['can'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.notOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'not', batch: 'SpringTime Fun'})}>
                        <Image source={getImageSource('not', springtimeFunStatus['not'])} style={styles.Image} />
                    </TouchableOpacity>

                    

                    <Image source={require('../assets/springtimeFunView/beeGirl.gif')} style={styles.girlBeeImage} />

                </View>
            
                
            </ImageBackground>

    );
};



export default SpringtimeFundWordsView;
import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';

const SpringtimeFundWordsView = ({ navigation }) => {

    const { springtimeFunStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = springtimeFunStatus[word] ? springtimeFunStatus[word].test_correct : false; // Check if word exists.
        const key = isCompleted ? `${word}completed` : word; // If word is completed, append 'completed' to the word to get the image key.
        return wordImageMapping[key];
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
            borderColor: 'black',
            borderWidth: 2,
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'black',
            borderWidth: 2,
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'black',
            borderWidth: 2,
        },
        girlBeeImage: {
            height: isLandscape ? aspectRatio > 1.7 ? '10%' : '100%' : '70%',
            width: isLandscape ? aspectRatio > 1.7 ? '10%' : '20%' : '25%',
            borderColor: 'black',
            borderWidth: 2,
        },
        yourOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '60%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            marginBottom: '5%',
            borderColor: 'black',
            borderWidth: 2,
        },
        byOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            borderColor: 'black',
            borderWidth: 2,
        },
        saidOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            marginBottom: '5%',
            borderColor: 'black',
            borderWidth: 2,
        },
        weOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            borderColor: 'black',
            borderWidth: 2,
        },
        anOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            marginBottom: '5%',
            borderColor: 'black',
            borderWidth: 2,
        },
        allOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            borderColor: 'black',
            borderWidth: 2,
        },
        whatOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            marginBottom: '5%',
            borderColor: 'black',
            borderWidth: 2,
        },
        canOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            borderColor: 'black',
            borderWidth: 2,
        },
        notOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '6%' : '8%',
            marginBottom: '5%',
            borderColor: 'black',
            borderWidth: 2,
        },
        butOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '58%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '20%' : '25%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '5%' : '5%' : '20%',
            borderColor: 'black',
            borderWidth: 2,
        },
        wereOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '58%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '20%' : '25%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '10%',
            borderColor: 'black',
            borderWidth: 2,
        },
        useOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '58%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '20%' : '25%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '5%' : '5%' : '20%',
            borderColor: 'black',
            borderWidth: 2,
        },
        whenOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '58%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '20%' : '25%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '8%',
            borderColor: 'black',
            borderWidth: 2,
        },
        wordsOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '58%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '20%' : '25%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '8%',
            borderColor: 'black',
            borderWidth: 2,
        },
        thereOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '58%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '6%' : '20%' : '25%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '5%' : '5%' : '15%',
            borderColor: 'black',
            borderWidth: 2,
        },
        birdImage: {
            height: isLandscape ? aspectRatio > 1.7 ? '10%' : '80%' : '50%',
            width: isLandscape ? aspectRatio > 1.7 ? '10%' : '20%' : '22%',
            borderColor: 'black',
            borderWidth: 2,
        },
        sunImage: {
            height: isLandscape ? aspectRatio > 1.7 ? '10%' : '80%' : '50%',
            width: isLandscape ? aspectRatio > 1.7 ? '10%' : '20%' : '22%',
            marginBottom: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '10%',
            borderColor: 'black',
            borderWidth: 2,
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

                    <TouchableOpacity style={styles.whenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'when', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('when', springtimeFunStatus['when'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'there', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('there', springtimeFunStatus['there'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wordsOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'words', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('words', springtimeFunStatus['words'])} style={styles.Image} />
                    </TouchableOpacity>

                    <Image source={require('../assets/springtimeFunView/sun.png')} style={styles.sunImage} />

                </View>

                <View style={styles.middle}>

                    <Image source={require('../assets/springtimeFunView/bird.png')} style={styles.birdImage} />

                    <TouchableOpacity style={styles.butOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'but', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('but', springtimeFunStatus['but'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'were', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('were', springtimeFunStatus['were'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.useOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'use', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('use', springtimeFunStatus['use'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.yourOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'your', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('your', springtimeFunStatus['your'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.byOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'by', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('by', springtimeFunStatus['by'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saidOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'said', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('said', springtimeFunStatus['said'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.weOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'we', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('we', springtimeFunStatus['we'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.anOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'an', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('an', springtimeFunStatus['an'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.allOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'all', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('all', springtimeFunStatus['all'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whatOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'what', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('what', springtimeFunStatus['what'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.canOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'can', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('can', springtimeFunStatus['can'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.notOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'not', batch: 'Springtime Fun'})}>
                        <Image source={getImageSource('not', springtimeFunStatus['not'])} style={styles.Image} />
                    </TouchableOpacity>

                    

                    <Image source={require('../assets/springtimeFunView/beeGirl.gif')} style={styles.girlBeeImage} />

                </View>
            
                
            </ImageBackground>

    );
};



export default SpringtimeFundWordsView;
import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlanetsAndBeyondView = ({ navigation }) => {

    const { planetsAndBeyondStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const getImageSource = (word) => {
        // Check if the word is completed using the alienAdventureStatus.
        const isCompleted = planetsAndBeyondStatus[word] ? planetsAndBeyondStatus[word].test_correct : false; // Check if word exists.
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
        pleaseOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '25%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '17%', '16%', '16%'),
        },
        herOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        waterOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '17%'),
        },
        beenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        ourOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        calledOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        askOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        anyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        longOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
        },
        knowOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
        },
        putOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
        },
        everyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
        },
        thinkOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
        },
        flyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
        },
        giveOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '14%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
        },
        wayOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
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
                source={require('../assets/planetsAndBeyondView/planetsAndBeyondBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.top}>

                    <TouchableOpacity style={styles.pleaseOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'please', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('please', planetsAndBeyondStatus['please'])}  style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.herOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'her', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('her', planetsAndBeyondStatus['her'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.waterOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'water', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('water', planetsAndBeyondStatus['water'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.beenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'been', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('been', planetsAndBeyondStatus['been'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ourOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'our', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('our', planetsAndBeyondStatus['our'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                </SafeAreaView>

                <SafeAreaView style={styles.middle}>
                    <TouchableOpacity style={styles.calledOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'called', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('called', planetsAndBeyondStatus['called'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.askOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'ask', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('ask', planetsAndBeyondStatus['ask'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.anyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'any', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('any', planetsAndBeyondStatus['any'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.longOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'long', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('long', planetsAndBeyondStatus['long'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.knowOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'know', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('know', planetsAndBeyondStatus['know'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>
                </SafeAreaView>

                <SafeAreaView style={styles.bottom}>
                
                    <TouchableOpacity style={styles.putOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'put', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('put', planetsAndBeyondStatus['put'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.everyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'every', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('every', planetsAndBeyondStatus['every'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thinkOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'think', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('think', planetsAndBeyondStatus['think'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.flyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'fly', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('fly', planetsAndBeyondStatus['fly'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.giveOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'give', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('give', planetsAndBeyondStatus['give'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default PlanetsAndBeyondView;
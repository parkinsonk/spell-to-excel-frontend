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
        goOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '25%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '17%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '5%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
        },
        theseOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        peopleOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '3%', '3%') : calculateImageDimensions(aspectRatio, '12%', '12%', '12%'),
        },
        myOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '5%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
        },
        thanOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '2%', '2%') : calculateImageDimensions(aspectRatio, '6%', '6%', '6%'),
        },
        calledOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '0%', '0%', '0%'),
        },
        couldOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '5%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        oilOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '4%', '4%') : calculateImageDimensions(aspectRatio, '8%', '8%', '8%'),
        },
        firstOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '2%', '2%') : calculateImageDimensions(aspectRatio, '4%', '4%', '4%'),
        },
        waterOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '12%', '12%', '12%'),
        },
        noOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        seeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '5%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
        },
        whoOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '2%', '2%') : calculateImageDimensions(aspectRatio, '4%', '4%', '4%'),
        },
        numberOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '6%', '6%') : calculateImageDimensions(aspectRatio, '12%', '12%', '12%'),
        },
        beenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '14%') : calculateImageDimensions(aspectRatio, '25%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '3%', '3%') : calculateImageDimensions(aspectRatio, '6%', '6%', '6%'),
        },
        wayOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '70%') : calculateImageDimensions(aspectRatio, '40%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '2%', '2%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
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

                    <TouchableOpacity style={styles.goOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'go', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('go', planetsAndBeyondStatus['go'])}  style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.theseOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'these', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('these', planetsAndBeyondStatus['these'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.peopleOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'people', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('people', planetsAndBeyondStatus['people'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.myOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'my', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('my', planetsAndBeyondStatus['my'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thanOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'than', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('than', planetsAndBeyondStatus['than'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                </SafeAreaView>

                <SafeAreaView style={styles.middle}>
                    <TouchableOpacity style={styles.calledOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'called', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('called', planetsAndBeyondStatus['called'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.couldOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'could', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('could', planetsAndBeyondStatus['could'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.oilOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'oil', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('oil', planetsAndBeyondStatus['oil'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.firstOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'first', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('first', planetsAndBeyondStatus['first'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.waterOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'water', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('water', planetsAndBeyondStatus['water'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>
                </SafeAreaView>

                <SafeAreaView style={styles.bottom}>
                
                    <TouchableOpacity style={styles.noOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'no', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('no', planetsAndBeyondStatus['no'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.seeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'see', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('see', planetsAndBeyondStatus['see'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.whoOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'who', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('who', planetsAndBeyondStatus['who'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.numberOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'number', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('number', planetsAndBeyondStatus['number'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.beenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'been', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('been', planetsAndBeyondStatus['been'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wayOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'way', batch: 'Planets and Beyond' })}>
                        <Image source={getImageSource('way', planetsAndBeyondStatus['way'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default PlanetsAndBeyondView;
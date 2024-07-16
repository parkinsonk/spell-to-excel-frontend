import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';

const AlienAdventuresWordsView = ({ navigation }) => {

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
        middle: {
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
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '45%') : calculateImageDimensions(aspectRatio, '35%', '25%', '25%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        doOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '80%', '65%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '15%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '5%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        sheOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '55%', '50%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        theirOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '45%') : calculateImageDimensions(aspectRatio, '35%', '30%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '19%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '8%', '8%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        ifOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '65%', '60%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '3%') : calculateImageDimensions(aspectRatio, '5%', '10%', '10%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        otherOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '45%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        upOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '60%', '55%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '8%') : calculateImageDimensions(aspectRatio, '5%', '15%', '15%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        willOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '55%', '45%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        howOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '50%') : calculateImageDimensions(aspectRatio, '35%', '25%', '25%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '6%', '20%', '25%') : calculateImageDimensions(aspectRatio, '9%', '26%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '3%', '3%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        outOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '50%', '50%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '9%', '9%') : calculateImageDimensions(aspectRatio, '20%', '5%', '5%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        manyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '25%', '25%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '19%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '10%', '0%', '0%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        thenOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '65%', '65%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '15%', '15%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        themOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '45%', '55%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '5%', '5%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        whichOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '25%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '10%', '10%') : calculateImageDimensions(aspectRatio, '8%', '15%', '15%'),
            borderColor: 'red',
            borderWidth: 2,
        },
        eachOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '2%', '1%', '1%') : calculateImageDimensions(aspectRatio, '15%', '0%', '0%'),
            borderColor: 'red',
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
                source={require('../assets/alienAdventureView/alienAdventuresBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <TouchableOpacity style={styles.aboutOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'about', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('about', alienAdventureStatus['about'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.doOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'do', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('do', alienAdventureStatus['do'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sheOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'she', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('she', alienAdventureStatus['she'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.theirOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'their', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('their', alienAdventureStatus['their'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ifOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'if', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('if', alienAdventureStatus['if'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.otherOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'other', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('other', alienAdventureStatus['other'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.upOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'up', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('up', alienAdventureStatus['up'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.willOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'will', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('will', alienAdventureStatus['will'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.howOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'how', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('how', alienAdventureStatus['how'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'out', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('out', alienAdventureStatus['out'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.manyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'many', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('many', alienAdventureStatus['many'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.thenOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'then', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('then', alienAdventureStatus['then'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'them', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('them', alienAdventureStatus['them'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whichOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'which', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('which', alienAdventureStatus['which'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'each', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('each', alienAdventureStatus['each'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>
            
                
            </ImageBackground>

    );
};



export default AlienAdventuresWordsView;
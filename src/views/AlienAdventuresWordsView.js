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
        allOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '40%', '35%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '15%', '15%') : calculateImageDimensions(aspectRatio, '17%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '0%', '0%', '0%'),
        },
        lookOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '60%', '45%') : calculateImageDimensions(aspectRatio, '35%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '15%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '5%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        littleOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '55%', '50%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        wereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '52%', '45%') : calculateImageDimensions(aspectRatio, '35%', '28%', '33%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '19%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '8%', '8%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        yourOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '40%', '35%') : calculateImageDimensions(aspectRatio, '35%', '20%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '3%') : calculateImageDimensions(aspectRatio, '5%', '10%', '10%'),
        },
        downOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '56%', '45%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
        },
        thereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '60%', '55%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '5%', '8%') : calculateImageDimensions(aspectRatio, '5%', '15%', '15%'),
        },
        doOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '39%', '35%') : calculateImageDimensions(aspectRatio, '35%', '20%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        theirOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '61%', '55%') : calculateImageDimensions(aspectRatio, '35%', '26%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '16%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '15%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '3%', '3%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        hereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '50%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '9%', '9%') : calculateImageDimensions(aspectRatio, '20%', '5%', '5%'),
        },
        otherOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '55%') : calculateImageDimensions(aspectRatio, '40%', '27%', '31%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '14%', '15%', '19%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '10%', '0%', '0%'),
        },
        aboutOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '65%', '65%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '15%', '15%'),
        },
        wantOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '45%', '40%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '5%', '5%'),
        },
        tooOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '35%', '37%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '25%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '10%', '10%') : calculateImageDimensions(aspectRatio, '8%', '15%', '15%'),
        },
        manyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '52%', '45%') : calculateImageDimensions(aspectRatio, '40%', '32%', '35%'),
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
                source={require('../assets/alienAdventureView/alienAdventuresBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <TouchableOpacity style={styles.allOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'about', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('all', alienAdventureStatus['all'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lookOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'do', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('look', alienAdventureStatus['look'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.littleOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'she', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('little', alienAdventureStatus['little'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'their', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('were', alienAdventureStatus['were'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.yourOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'if', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('your', alienAdventureStatus['your'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.downOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'other', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('down', alienAdventureStatus['down'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.thereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'up', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('there', alienAdventureStatus['there'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.doOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'will', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('do', alienAdventureStatus['do'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.theirOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'how', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('their', alienAdventureStatus['their'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.hereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'out', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('here', alienAdventureStatus['here'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>


                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.otherOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'many', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('other', alienAdventureStatus['other'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.aboutOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'then', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('about', alienAdventureStatus['about'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wantOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'them', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('want', alienAdventureStatus['want'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tooOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'which', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('too', alienAdventureStatus['too'])} style={styles.Image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.manyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'each', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('many', alienAdventureStatus['many'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>
            
                
            </ImageBackground>

    );
};



export default AlienAdventuresWordsView;
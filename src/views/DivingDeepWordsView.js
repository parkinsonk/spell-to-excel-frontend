import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';

const DivingDeepWordsView = ({ navigation }) => {

    const { divingDeepStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const getImageSource = (word) => {
        // Check if the word is completed using the alienAdventureStatus.
        const isCompleted = divingDeepStatus[word] ? divingDeepStatus[word].test_correct : false; // Check if word exists.
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
            borderColor: 'black',
            borderBottomWidth: 2,
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: 'black'
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: 'black',
            borderTopWidth: 2,
        },
        onceOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
            marginRight: '20%'
        },
        liveOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        thankOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        shouldOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        veryOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        washOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        doesOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        warmOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
        },
        workOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '60%', '60%', '60%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '15%', '15%', '15%'),
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
                source={require('../assets/divingDeepView/divingDeepBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.top}>



                    <TouchableOpacity style={styles.onceOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'once', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('once', divingDeepStatus['once'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.liveOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'live', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('live', divingDeepStatus['live'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>


                </SafeAreaView>

                <SafeAreaView style={styles.middle}>

                    <TouchableOpacity style={styles.thankOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'thank', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('thank', divingDeepStatus['thank'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shouldOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'should', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('should', divingDeepStatus['should'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.veryOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'very', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('very', divingDeepStatus['very'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    

                </SafeAreaView>

                <SafeAreaView style={styles.bottom}>

                    <TouchableOpacity style={styles.washOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'wash', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('wash', divingDeepStatus['wash'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.doesOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'does', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('does', divingDeepStatus['does'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.warmOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'warm', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('warm', divingDeepStatus['warm'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.workOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'work', batch: 'Diving Deep' })}>
                        <Image source={getImageSource('work', divingDeepStatus['work'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>


                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default DivingDeepWordsView;
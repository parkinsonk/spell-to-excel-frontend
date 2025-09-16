import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderWordPressable } from '../components/wordButtons';

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

                    {/* her */}
                    {renderWordPressable('please', 'her', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('her'))}
                    {/* water */}
                    {renderWordPressable('her', 'water', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('water'))}
                    {/* been */}
                    {renderWordPressable('water', 'been', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('been'))}
                    {/* our */}
                    {renderWordPressable('been', 'our', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('our'))}

                </SafeAreaView>

                <SafeAreaView style={styles.middle}>

                    {/* called */}
                    {renderWordPressable('our', 'called', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('called'))}
                    {/* ask */}
                    {renderWordPressable('called', 'ask', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('ask'))}
                    {/* any */}
                    {renderWordPressable('ask', 'any', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('any'))}
                    {/* long */}
                    {renderWordPressable('any', 'long', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('long'))}
                    {/* know */}
                    {renderWordPressable('long', 'know', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('know'))}

                </SafeAreaView>

                <SafeAreaView style={styles.bottom}>

                    {/* put */}
                    {renderWordPressable('know', 'put', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('put'))}
                    {/* every */}
                    {renderWordPressable('put', 'every', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('every'))}
                    {/* think */}
                    {renderWordPressable('every', 'think', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('think'))}
                    {/* fly */}
                    {renderWordPressable('think', 'fly', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('fly'))}
                    {/* give */}
                    {renderWordPressable('fly', 'give', 'Planets and Beyond', planetsAndBeyondStatus, navigation, styles, getImageSource('give'))}

                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default PlanetsAndBeyondView;
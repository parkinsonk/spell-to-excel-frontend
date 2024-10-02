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
            flex: 2,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            borderColor: 'red',
            borderWidth: 2,
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            borderColor: 'red',
            borderWidth: 2,
        },
        left: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'green',
            borderWidth: 2,
        },
        leftMiddle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderColor: 'green',
            borderWidth: 2,
        },
        rightMiddle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderColor: 'green',
            borderWidth: 2,
        },
        right: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderColor: 'green',
            borderWidth: 2,
        },
        dayOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '25%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '17%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '10%', '10%', '10%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '25%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        mayOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '3%', '0%') : calculateImageDimensions(aspectRatio, '12%', '12%', '12%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        downOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '10%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        partOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        getOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        didOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '10%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginLeft: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        comeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '25%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '35%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        longOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '25%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '15%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        nowOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '25%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        madeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '25%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '25%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        sitOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '0%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
            borderWidth: 2,
        },
        findOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '70%', '30%') : calculateImageDimensions(aspectRatio, '35%', '50%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '50%') : calculateImageDimensions(aspectRatio, '9%', '16%', '16%'),
            marginTop: isLandscape ? calculateImageDimensions(aspectRatio, '20%', '20%', '20%') : calculateImageDimensions(aspectRatio, '9%', '9%', '9%'),
            borderColor: 'blue',
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
                source={require('../assets/divingDeepView/divingDeepBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.top}>


                    <SafeAreaView style={styles.left}>

                        <TouchableOpacity style={styles.dayOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'day', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('day', divingDeepStatus['day'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mayOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'may', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('may', divingDeepStatus['may'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.downOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'down', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('down', divingDeepStatus['down'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>


                    </SafeAreaView>

                    <SafeAreaView style={styles.leftMiddle}>

                        <TouchableOpacity style={styles.partOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'part', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('part', divingDeepStatus['part'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.getOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'get', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('get', divingDeepStatus['get'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.didOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'did', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('did', divingDeepStatus['did'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                    </SafeAreaView>

                    <SafeAreaView style={styles.rightMiddle}>

                        <TouchableOpacity style={styles.comeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'come', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('come', divingDeepStatus['come'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.longOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'long', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('long', divingDeepStatus['long'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nowOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'now', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('now', divingDeepStatus['now'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.madeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'made', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('made', divingDeepStatus['made'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                    </SafeAreaView>

                    <SafeAreaView style={styles.right}>

                        <TouchableOpacity style={styles.sitOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'sit', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('sit', divingDeepStatus['sit'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.findOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'find', batch: 'Diving Deep' })}>
                            <Image source={getImageSource('find', divingDeepStatus['find'])} style={styles.Image} resizeMode='contain' />
                        </TouchableOpacity>


                    </SafeAreaView>

                </SafeAreaView>

                <SafeAreaView style={styles.bottom}>
                    <Image
                    source={require('../assets/divingDeepView/bottomBackground.gif')}
                    style={styles.background}
                    resizeMode="contain"
                >

                    </Image>


                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default DivingDeepWordsView;
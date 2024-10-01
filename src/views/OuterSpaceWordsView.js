import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';

const OuterSpaceWordsView = ({ navigation }) => {

    const { outerSpaceStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const getImageSource = (word) => {
        // Check if the word is completed using the alienAdventureStatus.
        const isCompleted = outerSpaceStatus[word] ? outerSpaceStatus[word].test_correct : false; // Check if word exists.
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
        middleTop: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        middleBottom: {
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
        twoOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%') : calculateImageDimensions(aspectRatio, '25%', '25%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '17%', '17%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '0%', '0%', '0%'),
        },
        herOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '80%', '70%') : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '13%') : calculateImageDimensions(aspectRatio, '9%', '15%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '3%') : calculateImageDimensions(aspectRatio, '5%', '20%', '10%'),
        },
        himOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '55%', '70%') : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '13%') : calculateImageDimensions(aspectRatio, '9%', '17%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '5%') : calculateImageDimensions(aspectRatio, '5%', '5%', '15%'),
        },
        soOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%') : calculateImageDimensions(aspectRatio, '35%', '30%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '9%', '19%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '8%', '3%') : calculateImageDimensions(aspectRatio, '5%', '20%', '10%'),
        },
        hasOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '65%', '70%') : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '9%', '17%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '2%', '0%') : calculateImageDimensions(aspectRatio, '5%', '10%', '0%'),
        },
        timeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%') : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '9%', '20%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
        },
        intoOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '60%', '70%') : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '9%', '17%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '5%', '5%') : calculateImageDimensions(aspectRatio, '5%', '15%', '10%'),
        },
        likeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '55%', '70%') : calculateImageDimensions(aspectRatio, '35%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '9%', '17%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '5%') : calculateImageDimensions(aspectRatio, '5%', '5%', '10%'),
        },
        moreOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%') : calculateImageDimensions(aspectRatio, '35%', '25%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '20%', '12%') : calculateImageDimensions(aspectRatio, '9%', '26%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '3%', '0%') : calculateImageDimensions(aspectRatio, '5%', '20%', '0%'),
        },
        makeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '50%', '70%') : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '9%', '0%') : calculateImageDimensions(aspectRatio, '20%', '5%', '0%'),
            marginLeft: isLandscape ? calculateImageDimensions(aspectRatio, '5%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
        },
        someOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%') : calculateImageDimensions(aspectRatio, '40%', '25%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '25%', '20%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '5%') : calculateImageDimensions(aspectRatio, '10%', '0%', '10%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '0%', '10%') : calculateImageDimensions(aspectRatio, '15%', '0%', '30%'),
        },
        lookOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '65%', '70%') : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '25%', '17%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '15%', '10%'),
            marginLeft: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '10%') : calculateImageDimensions(aspectRatio, '10%', '0%', '5%'),
        },
        writeOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%') : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '25%', '20%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '8%', '5%', '0%'),
            marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '5%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
        },
        theseOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%') : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '10%', '0%') : calculateImageDimensions(aspectRatio, '8%', '15%', '0%'),
        },
        wouldOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '90%', '45%', '70%') : calculateImageDimensions(aspectRatio, '40%', '35%', '50%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '11%', '15%', '12%') : calculateImageDimensions(aspectRatio, '25%', '22%', '16%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '1%', '0%') : calculateImageDimensions(aspectRatio, '15%', '0%', '0%'),
        },
        Image: {
            height: '100%',
            width: '100%',
        },
        astronautImage: {
            height: '100%',
            width: '20%',
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
                source={require('../assets/outerSpaceView/outerSpaceBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.top}>

                    <TouchableOpacity style={styles.twoOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'two', batch: 'Outer Space' })}>
                        <Image source={getImageSource('two', outerSpaceStatus['two'])}  style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.herOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'her', batch: 'Outer Space' })}>
                        <Image source={getImageSource('her', outerSpaceStatus['her'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.himOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'him', batch: 'Outer Space' })}>
                        <Image source={getImageSource('him', outerSpaceStatus['him'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.soOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'so', batch: 'Outer Space' })}>
                        <Image source={getImageSource('so', outerSpaceStatus['so'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.hasOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'has', batch: 'Outer Space' })}>
                        <Image source={getImageSource('has', outerSpaceStatus['has'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                </SafeAreaView>

                <SafeAreaView style={styles.middleTop}>
                    <TouchableOpacity style={styles.timeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'time', batch: 'Outer Space' })}>
                        <Image source={getImageSource('time', outerSpaceStatus['time'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>
                
                
                    <TouchableOpacity style={styles.intoOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'into', batch: 'Outer Space' })}>
                        <Image source={getImageSource('into', outerSpaceStatus['into'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.likeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'like', batch: 'Outer Space' })}>
                        <Image source={getImageSource('like', outerSpaceStatus['like'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moreOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'more', batch: 'Outer Space' })}>
                        <Image source={getImageSource('more', outerSpaceStatus['more'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>
                </SafeAreaView>

                <SafeAreaView style={styles.middleBottom}>
     
                    <TouchableOpacity style={styles.makeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'make', batch: 'Outer Space' })}>
                        <Image source={getImageSource('make', outerSpaceStatus['make'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.someOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'some', batch: 'Outer Space' })}>
                        <Image source={getImageSource('some', outerSpaceStatus['some'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.lookOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'look', batch: 'Outer Space' })}>
                        <Image source={getImageSource('look', outerSpaceStatus['look'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.writeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'write', batch: 'Outer Space' })}>
                        <Image source={getImageSource('write', outerSpaceStatus['write'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                </SafeAreaView>


                <SafeAreaView style={styles.bottom}>
                
                    <TouchableOpacity style={styles.theseOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'these', batch: 'Outer Space' })}>
                        <Image source={getImageSource('these', outerSpaceStatus['these'])} style={styles.Image} resizeMode='contain' />
                    </TouchableOpacity>

                    <Image source={require('../assets/outerSpaceView/astronauts.png')} resizeMode="contain" style={styles.astronautImage}/>

                    <TouchableOpacity style={styles.wouldOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'would', batch: 'Outer Space' })}>
                        <Image source={getImageSource('would', outerSpaceStatus['would'])} style={styles.Image} resizeMode='contain'/>
                    </TouchableOpacity>

                    

                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default OuterSpaceWordsView;
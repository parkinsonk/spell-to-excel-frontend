import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';

const FlyingHighWordsView = ({ navigation }) => {

    const { flyingHighStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = flyingHighStatus[word] ? flyingHighStatus[word].test_correct : false; // Check if word exists.
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
            borderColor: 'red',
            borderWidth: 2,
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: 'red',
            borderWidth: 2,
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: 'red',
            borderWidth: 2,
        },
        theOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '55%' : '55%' : '50%', // If landscape and aspect ratio is greater than 1.7, set height to 55%, else set height to 55%. If portrait, set height to 55%.
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '20%' : '20%', 
            resizeMode: 'contain',
            marginTop: '6%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '10%' : '10%' : '5%',
        },
        toOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '60%' : '60%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '25%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '8%' : '8%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '15%',
        },
        PlaneSun: {
            height: isLandscape ? aspectRatio > 1.7 ? '90%' : '90%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '25%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '4%' : '4%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '5%',
        },
        ofOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '12%' : '12%' : '20%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '5%' : '5%' : '15%',
        },
        isOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '10%',
        },
    
        youOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '12%',
        },
    
        inOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '3%' : '3%' : '6%',
        },
        andOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '8%',
        },
        thatOpacity: { 
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '4%' : '4%' : '14%',
        },
        itOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        heOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '3%',
        },
        wasOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        aOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        forOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '3%' : '3%' : '4%',
        },
        Image: {
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
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
                source={require('../assets/flyingHighWordsView/flyingHighBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <TouchableOpacity style={styles.ofOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'I', batch: 'Flying High'})}>
                        <Image source={getImageSource('I', flyingHighStatus['I'])} style={styles.Image} />
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.theOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'the', batch: 'Flying High' })}>
                        <Image source={getImageSource('the', flyingHighStatus['the'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'to', batch: 'Flying High'  })}>
                        <Image source={getImageSource('to', flyingHighStatus['to'])} style={styles.Image} />
                    </TouchableOpacity>

                    <View style={styles.PlaneSun}>
                        <Image source={require('../assets/flyingHighWordsView/helicopter.png')} style={styles.Image} />
                    </View>

                    <TouchableOpacity style={styles.ofOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'of', batch: 'Flying High'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.isOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'is', batch: 'Flying High'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'in', batch: 'Flying High'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.youOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'you', batch: 'Flying High'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.andOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'and', batch: 'Flying High'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thatOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'that', batch: 'Flying High'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.itOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'it', batch: 'Flying High'})}>
                            <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.heOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'he', batch: 'Flying High'})}>
                            <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wasOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'was', batch: 'Flying High'})}>
                            <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.aOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'a', batch: 'Flying High'})}>
                            <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'for', batch: 'Flying High'})}>
                            <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                    </TouchableOpacity>
                
                </View>
            
                
            </ImageBackground>

    );
};



export default FlyingHighWordsView;
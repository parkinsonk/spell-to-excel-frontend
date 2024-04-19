import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const GetStartedView = ({ navigation }) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const aspectRatio = screenWidth / screenHeight;

    const landscapeBackgroundGif = require('../assets/getstarted/getstarted.gif');
    const portraitBackgroundGif = require('../assets/getstarted/getstartedp.gif');

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
        },
        leftSide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        middleSide: {
            flex: 1.5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        rightSide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loginButton: {
            position: 'absolute',
            right: 150,
            bottom: 150,
            width: '30%',
            height: '15%',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        learnMoreButton: {
            position: 'absolute',
            left: 150,
            bottom: 150,
            width: '30%',
            height: '15%',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonImage: {
            width: '75%',
            height: '100%',
            resizeMode: 'contain',
        },
    });

    const orientationStyles = aspectRatio > 1.5 ? styles.landscape : styles.portrait;

    return (
        <ImageBackground
            source={aspectRatio > 1.5 ? landscapeBackgroundGif : portraitBackgroundGif}
            resizeMode="cover"
            style={[styles.background, orientationStyles]}
        >
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('artists')}>
                <Image source={require('../assets/getstarted/artists.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.learnMoreButton} onPress={() => navigation.navigate('leaRnMoree')}>
                <Image source={require('../assets/getstarted/leaRnMoree.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default GetStartedView;

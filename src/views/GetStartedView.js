import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const GetStartedView = ({ navigation }) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const aspectRatio = screenWidth / screenHeight;

    const landscapeBackgroundGif = require('../assets/getstarted/getstarted.gif');
    const portraitBackgroundGif = require('../assets/getstarted/getstartedp.gif');

    const portraitStyles = StyleSheet.create({
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

    const landscapeStyles = StyleSheet.create({
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            // Landscape-specific styles can be added here
        },
        // Additional landscape-specific styles can be defined here
    });

    const orientationStyles = aspectRatio > 1.5 ? landscapeStyles : portraitStyles;
    const backgroundSource = aspectRatio > 1.5 ? landscapeBackgroundGif : portraitBackgroundGif;

    return (
        <ImageBackground
            source={backgroundSource}
            resizeMode="cover"
            style={[orientationStyles.background]}
        >
            {/* Your portrait-specific components */}
            {aspectRatio <= 1.5 && (
                <>
                    <TouchableOpacity style={portraitStyles.loginButton} onPress={() => navigation.navigate('artists')}>
                        <Image source={require('../assets/getstarted/artists.png')} style={portraitStyles.buttonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={portraitStyles.learnMoreButton} onPress={() => navigation.navigate('leaRnMoree')}>
                        <Image source={require('../assets/getstarted/leaRnMoree.png')} style={portraitStyles.buttonImage} />
                    </TouchableOpacity>
                </>
            )}

            {/* Your landscape-specific components */}
            {aspectRatio > 1.5 && (
                <>
                    {/* Add landscape-specific components here */}
                </>
            )}
        </ImageBackground>
    );
};

export default GetStartedView;

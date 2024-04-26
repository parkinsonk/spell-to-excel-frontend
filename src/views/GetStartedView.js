import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Image, useWindowDimensions } from 'react-native';

const GetStartedView = ({ navigation }) => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;

    const portraitStyles = StyleSheet.create({
        background: {
            flex: 1,
            resizeMode: 'contain',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
        },
        loginButton: {
            position: 'absolute',
            right: 180,
            bottom: 150,
            width: '25%',
            height: '15%',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        learnMoreButton: {
            position: 'absolute',
            left: 180,
            bottom: 150,
            width: '25%',
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
            right: aspectRatio > 1.5 ? screenWidth * 0.39 : screenWidth * 0.3, // Adjust position based on aspect ratio
            bottom: aspectRatio > 1.5 ? screenHeight * 0.35 : screenHeight * 0.3, // Adjust position based on aspect ratio
            width: aspectRatio > 1.5 ? screenWidth * 0.1 : screenWidth * 0.9, // Adjust width based on aspect ratio
            height: aspectRatio > 1.5 ? screenHeight * 0.1 : screenHeight * 0.15, // Adjust height based on aspect ratio
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        learnMoreButton: {
            position: 'absolute',
            left: aspectRatio > 1.5 ? screenWidth * 0.72 : screenWidth * 0.3, // Adjust position based on aspect ratio
            bottom: aspectRatio > 1.5 ? screenHeight * 0.35 : screenHeight * 0.3, // Adjust position based on aspect ratio
            width: aspectRatio > 1.5 ? screenWidth * 0.1 : screenWidth * 0.12, // Adjust width based on aspect ratio
            height: aspectRatio > 1.5 ? screenHeight * 0.1 : screenHeight * 0.15, // Adjust height based on aspect ratio
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
    
    const isLandscape = screenWidth > screenHeight;

    const styles = isLandscape ? landscapeStyles : portraitStyles;
    const backgroundSource = isLandscape
        ? require('../assets/getstarted/getstarted.gif')
        : require('../assets/getstarted/getstartedp.gif');

    return (
        <ImageBackground
            source={backgroundSource}
            resizeMode= "stretch"
            style={styles.background}
        >
            {/* Your portrait-specific components */}
            {!isLandscape && (
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
            {isLandscape && (
                <>
                    <TouchableOpacity style={landscapeStyles.loginButton} onPress={() => navigation.navigate('artists')}>
                        <Image source={require('../assets/getstarted/artists.png')} style={landscapeStyles.buttonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={landscapeStyles.learnMoreButton} onPress={() => navigation.navigate('leaRnMoree')}>
                        <Image source={require('../assets/getstarted/leaRnMoree.png')} style={landscapeStyles.buttonImage} />
                    </TouchableOpacity>
                </>
            )}
        </ImageBackground>
    );
};

export default GetStartedView;

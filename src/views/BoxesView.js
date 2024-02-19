import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import boxesWordMapping from '../utils/boxesWordMapping';

const BoxesView = ({ navigation, route  }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;
    const { batch, activity, selectedWord } = route.params;
    const lettersList = boxesWordMapping[selectedWord] || boxesWordMapping.default;

    return (
            <ImageBackground
                source={require('../assets/boxesViews/boxesBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >

                    {lettersList.map((box, index) => (
                        <View key={index} style={styles.box} />
                    ))}
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10, // Add margin to space out the boxes
      },
});

export default BoxesView;
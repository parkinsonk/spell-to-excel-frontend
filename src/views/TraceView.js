import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import activitiesWordMapping from '../utils/activitiesWordMapping';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TraceView = ({ navigation, route }) => {

    const { batch, activity, selectedWord } = route.params;
    const background = activitiesWordMapping[batch]?.[activity]?.[selectedWord] || activitiesWordMapping.default;


    return (
        
            <ImageBackground
                source={background}
                resizeMode="cover"
                style={styles.background}
            >
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
});

export default TraceView;
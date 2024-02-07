import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FlyingHighWordsView = ({ navigation, route }) => {

    const { selectedWord } = route.params;


    return (
        
            <ImageBackground
                source={require('../assets/ActivitiesView/ActivitiesBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
});

export default FlyingHighWordsView;
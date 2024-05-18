import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SunnyIslandWordsView = ({ navigation }) => {

    const { sunnyIslandStatus, isLoading } = useProgress();

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = sunnyIslandStatus[word] ? sunnyIslandStatus[word].test_correct : false; // Check if word exists.
        const key = isCompleted ? `${word}completed` : word; // If word is completed, append 'completed' to the word to get the image key.
        return wordImageMapping[key];
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        
            <ImageBackground
                source={require('../assets/sunnyIslandView/sunnyIslandLandscapeBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                </View>

                <View style={styles.middle}>

                </View>

                <View style={styles.bottom}>

                    <View style={styles.bottomLeft}>
                        <Image source={require('../assets/sunnyIslandView/surferDude.gif')} style={styles.surferImage} resizeMode='contain' />
                    </View>

                    <View style={styles.bottomMiddle}>

                        <TouchableOpacity style={styles.iOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'I', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('I', sunnyIslandStatus['I'])} style={styles.iImage} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.fromOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'from', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('from', sunnyIslandStatus['from'])} style={styles.fromImage} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.bottomRight}>
                    </View>
                    
                </View>
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        flexDirection: 'column',
    },
    top: {
        flex: 1,
    },
    middle: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,

    },
    bottom: {
        flex: .7,
        flexDirection: 'row',
    },
    bottomLeft: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderColor: 'black',
        borderWidth: 2,
    },
    bottomMiddle: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
    },
    surferImage: {
        width: '100%',
        height: '100%',
    },
    bottomRight: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
    },
    iOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '10%',
    },
    iImage: {
        width: '100%',
        height: '100%',
    },
    fromOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '8%',
        marginLeft: '5%',

    },
    fromImage: {
        width: '100%',
        height: '100%',
    },
});

export default SunnyIslandWordsView;
import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FlyingHighWordsView = ({ navigation }) => {

    const { flyingHighStatus, isLoading } = useProgress();

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = flyingHighStatus[word] ? flyingHighStatus[word].test_correct : false;
        const key = isCompleted ? `${word}completed` : word;
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
                source={require('../assets/flyingHighWordsView/flyingHighBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>
                
                    <TouchableOpacity style={styles.theOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'the', batch: 'Flying High Words' })}>

                        <Image source={getImageSource('the', flyingHighStatus['the'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'to', batch: 'Flying High Words'  })}>
                        <Image source={getImageSource('to', flyingHighStatus['to'])} style={styles.Image} />
                    </TouchableOpacity>

                    <View style={styles.PlaneSun}>
                        <Image source={require('../assets/flyingHighWordsView/planeSun.png')} style={styles.Image} />
                    </View>

                    <TouchableOpacity style={styles.ofOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'of', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('of', flyingHighStatus['of'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.isOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'is', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('is', flyingHighStatus['is'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'in', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('in', flyingHighStatus['in'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.youOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'you', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('you', flyingHighStatus['you'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.andOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'and', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('and', flyingHighStatus['and'])} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thatOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'that', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('that', flyingHighStatus['that'])} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>

                <TouchableOpacity style={styles.itOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'it', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('it', flyingHighStatus['it'])} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'he', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('he', flyingHighStatus['he'])} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wasOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'was', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('was', flyingHighStatus['was'])} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.aOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'a', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('a', flyingHighStatus['a'])} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.forOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'for', batch: 'Flying High Words'})}>
                        <Image source={getImageSource('to', flyingHighStatus['to'])} style={styles.Image} />
                </TouchableOpacity>
                
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
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    top: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    middle: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    theOpacity: {
        height: '55%',
        width: '15%',
        resizeMode: 'contain',
        marginTop: '6%',
        marginLeft: '15%',
    },
    toOpacity: {
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '8%',
        marginTop: '1%'
    },
    PlaneSun: {
        height: '90%',
        width: '30%',
        resizeMode: 'contain',
        marginLeft: '4%',
        marginTop: '1%',
    },
    ofOpacity: {
        height: '50%',
        width: '12%',
        resizeMode: 'contain',
        marginLeft: '1%',
        marginTop: '10%',
    },
    isOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '2%',
        marginTop: '1%',
    },

    youOpacity: {
        height: '70%',
        width: '17%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },

    inOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '5%',
    },
    andOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '4%',
    },
    thatOpacity: { 
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '3%',
        marginTop: '8%',
    },
    itOpacity: {
        height: '50%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },
    heOpacity: {
        height: '40%',
        width: '13%',
        resizeMode: 'contain',
        marginLeft: '10%',
        marginTop: '3%',
    },
    wasOpacity: {
        height: '50%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },
    aOpacity: {
        height: '50%',
        width: '13%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '3%',
    },
    forOpacity: {
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '3%',
        marginTop: '6%',
    },

    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default FlyingHighWordsView;
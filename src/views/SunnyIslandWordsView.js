import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';


const SunnyIslandWordsView = ({ navigation }) => {

    const { sunnyIslandStatus, isLoading } = useProgress();
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = sunnyIslandStatus[word] ? sunnyIslandStatus[word].test_correct : false; // Check if word exists.
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
            flexDirection: 'column',
        },
        top: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 2,
        },
        middle: {
            flex: 1,
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 2,
        },
        middleLeft: {
            flex: 1,
            borderColor: 'red',
            borderWidth: 2,
        },
        middleMiddle: {
            flex: 1,
            borderColor: 'green',
            borderWidth: 2,
            
        },
        middleRight: {
            flex: 1,
            borderColor: 'green',
            borderWidth: 2,
        },
        middleBottomSection: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
   
        },
        middleTopSection: {
            flex: 3,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexDirection: 'row',
        },
        bottom: {
            flex: 1.1,
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 2,
        },
        bottomLeft: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderColor: 'black',
            borderWidth: 2,
        },
        bottomMiddle: {
            flex: 1,
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 2,
        },
        bottomRight: {
            flex: 1,
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 2,
        },
        isOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '50%' : '25%', 
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '35%' : '30%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '5%',
            marginBottom: '5%',
        },
        myOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '75%' : '50%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '35%' : '30%',
            marginBottom: '5%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '10%' : '20%',
        },
        meOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '90%' : '60%', 
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '30%',
            marginLeft: '5%',
        },
        asOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '35%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '5%',
            marginBottom: '5%',
        },
        sayOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '35%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '10%' : '15%',
        },
        comeOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '75%' : '100%' : '60%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '10%' : '1%'
      
        },
        hasOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '75%' : '100%' : '60%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%',
            marginLeft: aspectRatio > 1.7 ? '10%' : '5%',
        },
        theyOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '40%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '1%',
            marginBottom: '5%'
        },
        whereOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '45%' : '25%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '40%' : '35%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '10%' : '10%',
            marginBottom: '5%'
        },
        haveOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '75%' : '100%' : '80%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '40%',

        },
        awayOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '75%' : '100%' : '80%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '40%',
            marginLeft: '5%',
            
        },
        funnyOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '25%' : '15%', // If landscape and aspect ratio is greater than 1.7, set height to 30%, else set height to 23%. If portrait, set height to 15%.
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%', 
            marginTop: '10%',
        },
        
        byOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%',
            marginTop: '10%',
        },
        findOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%',
            marginTop: '5%',
            marginLeft: '5%',
        },
        whatOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%',
            marginTop: '2%',
            marginLeft: '5%',
        },
        fromOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '30%' : '25%' : '15%',
            width: isLandscape ? aspectRatio > 1.7 ? '30%' : '30%' : '35%',
            marginTop: '8%',
            marginLeft: aspectRatio > 1.7 ? '10%' : '5%',
    
        },
        cloudSunImage: {
            width: '30%',
            height: '50%',
        },
        Image: {
            width: '100%',
            height: '100%',
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
                source={require('../assets/sunnyIslandView/sunnyIslandLandscapeBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <Image source={require('../assets/sunnyIslandView/cloudSun.png')} resizeMode="contain" style={styles.cloudSunImage} />

                </View>

                <View style={styles.middle}>


                    <View style={styles.middleLeft}>
                        <View style={styles.middleTopSection}>
                            <TouchableOpacity style={styles.isOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'or', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('is', sunnyIslandStatus['is'])} style={styles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.myOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'be', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('my', sunnyIslandStatus['my'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleBottomSection}>
                            
                            <TouchableOpacity style={styles.meOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'had', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('me', sunnyIslandStatus['me'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.middleMiddle}>

                        <View style={styles.middleTopSection}>
                            <TouchableOpacity style={styles.asOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'on', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('as', sunnyIslandStatus['as'])} style={styles.Image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sayOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'have', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('say', sunnyIslandStatus['say'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleBottomSection}>

                            <TouchableOpacity style={styles.comeOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'one', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('come', sunnyIslandStatus['come'])} style={styles.Image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hasOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'are', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('has', sunnyIslandStatus['has'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.middleRight}>

                    <View style={styles.middleTopSection}>
                            <TouchableOpacity style={styles.theyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'with', batch: 'Sunny Island' })}>
                                <Image source={getImageSource('they', sunnyIslandStatus['they'])} style={styles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.whereOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'as', batch: 'Sunny Island' })}>
                                <Image source={getImageSource('where', sunnyIslandStatus['where'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleBottomSection}>
                            <TouchableOpacity style={styles.haveOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'this', batch: 'Sunny Island'  })}>
                                <Image source={getImageSource('have', sunnyIslandStatus['have'])} style={styles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.awayOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'they', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('away', sunnyIslandStatus['away'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                </View>

                <View style={styles.bottom}>

                    <View style={styles.bottomLeft}>

                        <TouchableOpacity style={styles.whatOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'his', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('what', sunnyIslandStatus['what'])} style={styles.Image} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.fromOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'I', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('from', sunnyIslandStatus['from'])} style={styles.Image} />
                        </TouchableOpacity>

                        
                    </View>

                    <View style={styles.bottomMiddle}>

                        <TouchableOpacity style={styles.byOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'I', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('by', sunnyIslandStatus['by'])} style={styles.Image} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.findOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'from', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('find', sunnyIslandStatus['find'])} style={styles.Image} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.bottomRight}>
                        <TouchableOpacity style={styles.funnyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'at', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('funny', sunnyIslandStatus['funny'])} style={styles.Image} />
                        </TouchableOpacity>


                    </View>
                    
                </View>
            
                
            </ImageBackground>

    );
};



export default SunnyIslandWordsView;
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


                    <View style={styles.middleLeft}>
                        <View style={styles.middleTopSection}>
                            <TouchableOpacity style={styles.orOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'or', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('or', sunnyIslandStatus['or'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleBottomSection}>
                            <TouchableOpacity style={styles.beOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'be', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('be', sunnyIslandStatus['be'])} style={styles.Image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hadOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'had', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('had', sunnyIslandStatus['had'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.middleMiddle}>

                        <View style={styles.middleTopSection}>
                            <TouchableOpacity style={styles.onOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'on', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('on', sunnyIslandStatus['on'])} style={styles.Image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.haveOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'have', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('have', sunnyIslandStatus['have'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleBottomSection}>

                            <TouchableOpacity style={styles.oneOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'one', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('one', sunnyIslandStatus['one'])} style={styles.Image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.areOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'are', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('are', sunnyIslandStatus['are'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.middleRight}>

                    <View style={styles.middleTopSection}>
                            <TouchableOpacity style={styles.withOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'with', batch: 'Sunny Island' })}>
                                <Image source={getImageSource('with', sunnyIslandStatus['with'])} style={styles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.asOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'as', batch: 'Sunny Island' })}>
                                <Image source={getImageSource('as', sunnyIslandStatus['as'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleBottomSection}>
                            <TouchableOpacity style={styles.thisOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'this', batch: 'Sunny Island'  })}>
                                <Image source={getImageSource('this', sunnyIslandStatus['this'])} style={styles.Image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.theyOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'they', batch: 'Sunny Island'})}>
                                <Image source={getImageSource('they', sunnyIslandStatus['they'])} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                </View>

                <View style={styles.bottom}>

                    <View style={styles.bottomLeft}>
                        <Image source={require('../assets/sunnyIslandView/surferDude.gif')} style={styles.Image} resizeMode='contain' />
                    </View>

                    <View style={styles.bottomMiddle}>

                        <TouchableOpacity style={styles.iOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'I', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('I', sunnyIslandStatus['I'])} style={styles.Image} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.fromOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'from', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('from', sunnyIslandStatus['from'])} style={styles.Image} />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.bottomRight}>
                        <TouchableOpacity style={styles.atOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'at', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('at', sunnyIslandStatus['at'])} style={styles.Image} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.hisOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'his', batch: 'Sunny Island'})}>
                            <Image source={getImageSource('his', sunnyIslandStatus['his'])} style={styles.Image} />
                        </TouchableOpacity>
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
        flexDirection: 'row',
    },
    middleLeft: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
    },
    middleMiddle: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
    },
    middleRight: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
    },
    middleBottomSection: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
    },
    middleTopSection: {
        flex: 3,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row'
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
    bottomRight: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
    },
    iOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '10%',
    },
    fromOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '8%',
        marginLeft: '5%',

    },
    atOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '10%',
    },
    hisOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '5%',
        marginLeft: '5%',
    },
    thisOpacity: {
        height: '60%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '4%',
        marginLeft: '10%',
    },
    theyOpacity: {
        height: '60%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '2%',
        marginLeft: '5%',
    },
    withOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '10%',
    },
    asOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '8%',
        marginLeft: '10%',
    },
    onOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '10%',
        marginTop: '2%',

    },
    haveOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: '3%',
        marginLeft: '5%',
    },
    oneOpacity: {
        height: '60%',
        width: '40%',
        borderColor: 'black',
        marginTop: '4%',
        borderWidth: 2,
    },
    areOpacity: {
        height: '60%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '6%',
        marginLeft: '5%',
    },
    orOpacity: {
        height: '23%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '10%',
    },
    beOpacity: {
        height: '60%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '8%',
        marginLeft: '5%',
    },
    hadOpacity: {
        height: '60%',
        width: '40%',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: '5%',
        marginLeft: '5%',
    },
    Image: {
        width: '100%',
        height: '100%',
    },
});

export default SunnyIslandWordsView;
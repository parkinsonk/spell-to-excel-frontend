import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FlyingHighWordsView = ({ navigation, route}) => {
    
    const { selectedWord, batch } = route.params;


    return (
        
            <ImageBackground
                source={require('../assets/activitiesView/activitiesBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >

                <View style={styles.top}>

                    <View style={styles.activities}>
                        <Image source={require('../assets/activitiesView/activities.png')} style={styles.Image} />
                    </View>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/story.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/boxes.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Trace', {batch: batch, activity: 'trace', selectedWord: selectedWord})}>
                        <Image source={require('../assets/activitiesView/trace.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/flashcards.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/baskets.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/soundSpelling.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/test.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/activitiesView/wordsIKnow.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    middle: {
        flex: 2,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bottom: {
        flex: 2,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activities: {
        height: '90%',
        width: '100%',
        resizeMode: 'contain',
    },
    opacity: {
        height: '80%',
        width: '20%',
        resizeMode: 'contain',
    },

    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default FlyingHighWordsView;
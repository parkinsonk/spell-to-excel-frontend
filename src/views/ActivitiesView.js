import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FlyingHighWordsView = ({ navigation, route, batch }) => {
    
    const { selectedWord } = route.params;
    const batchActivity = activitiesMapping[batch] || {};
    const traceActivity = batchActivity['trace'];
    const traceActivityView = traceActivity[selectedWord];

    return (
        
            <ImageBackground
                source={require('../assets/ActivitiesView/ActivitiesBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >

                <View style={styles.top}>

                    <View style={styles.activities}>
                        <Image source={require('../assets/ActivitiesView/activities.png')} style={styles.Image} />
                    </View>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/story.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/boxes.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/trace.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/flashcards.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/baskets.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/SoundSpelling.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/test.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/ActivitiesView/WordsIKnow.png')} style={styles.Image} />
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
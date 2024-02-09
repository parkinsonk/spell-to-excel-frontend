import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SelectWordBatchesView = ({ navigation }) => {
    return (
        
            <ImageBackground
                source={require('../assets/selectWordBatchesView/batchesBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                    <View style={styles.leftSide}>
                        <View style={styles.upperHalfLeft}>
                            {/* Flying High Batch */}
                            <TouchableOpacity style={styles.FlyingHighOpacity} onPress={() => navigation.navigate('Flying High Words')}>
                                <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')} style={styles.Image} />
                            </TouchableOpacity>
                            {/* Sunny Island */}
                            <TouchableOpacity style={styles.SunnyIslandOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomHalfLeft}>
                            {/* Springtime Fun */}
                            <TouchableOpacity style={styles.SpringtimeFunOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')} style={styles.Image} />
                            </TouchableOpacity>
                            {/* Alien Adventures */}
                            <TouchableOpacity style={styles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')} style={styles.Image} />
                            </TouchableOpacity>
                            {/* Outer Space */}
                            <TouchableOpacity style={styles.OuterSpaceOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/outerSpace.png')} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.rightSide}>

                        <View style={styles.upperHalfRight}>
                            {/* Planets and Beyond */}
                            <TouchableOpacity style={styles.PlanetsAndBeyondOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')} style={styles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomHalfRight}>
                            {/* Diving Deep */}
                            <TouchableOpacity style={styles.DivingDeepOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/divingDeep.png')} style={styles.Image} />
                            </TouchableOpacity>
                        </View>
                        
                    
                    </View>
            
                
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
    leftSide: {
        flex: 2.5,
        flexDirection: 'column',
    },
    rightSide: {
        flex: 1,
        flexDirection: 'column',
    },
    upperHalfLeft: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomHalfLeft: {
        flex: 1.5,
        flexDirection: 'row',
    },
    upperHalfRight: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomHalfRight: {
        flex: 1,
        flexDirection: 'row',
    },

    FlyingHighOpacity: {
        marginTop: '5%',
        marginLeft: '15%',
        height: '80%',
        width: '30%',
    },
    SunnyIslandOpacity: {
        marginTop: '5%',
        marginLeft: '10%',
        height: '80%',
        width: '30%',
    },
    SpringtimeFunOpacity: {
        marginLeft: '-2.5%',
        height: '80%',
        width: '40%',
    },
    AlienAdventuresOpacity: {
        marginTop: '15%',
        height: '70%',
        width: '25%',
    },
    OuterSpaceOpacity: {
        marginTop: '5%',
        marginLeft: '10%',
        height: '70%',
        width: '25%',
    },

    PlanetsAndBeyondOpacity: {
        marginTop: '20%',
        marginLeft: '12%',
        height: '100%',
        width: '70%',
    },

    DivingDeepOpacity: {
        marginTop: '12%',
        marginLeft: '12%',
        height: '100%',
        width: '70%',
    },

    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default SelectWordBatchesView;
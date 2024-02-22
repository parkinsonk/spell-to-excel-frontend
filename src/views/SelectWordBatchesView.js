import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SelectWordBatchesView = ({ navigation }) => {

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);

    useEffect(() => {
        // Function to update styles based on current orientation
        const updateOrientationStyles = async () => {
          const orientation = await ScreenOrientation.getOrientationAsync();
          if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            setOrientationStyles(styles.landscape);
          } else {
            setOrientationStyles(styles.portrait);
          }
        };
    
        // Initial update when component mounts
        updateOrientationStyles();
    
        // Subscribe to orientation changes
        const subscription = ScreenOrientation.addOrientationChangeListener(() => {
          updateOrientationStyles();
        });
    
        // Cleanup subscription on unmount
        return () => {
          ScreenOrientation.removeOrientationChangeListener(subscription);
        };
      }, []);
    return (
        
            <ImageBackground
                source={require('../assets/selectWordBatchesView/batchesBackground.png')}
                resizeMode="cover"
                style={orientationStyles.background}
            >
                    <View style={orientationStyles.leftSide}>
                        <View style={orientationStyles.upperHalfLeft}>
                            {/* Flying High Batch */}
                            <TouchableOpacity style={orientationStyles.FlyingHighOpacity} onPress={() => navigation.navigate('Flying High Words')}>
                                <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                            {/* Sunny Island */}
                            <TouchableOpacity style={orientationStyles.SunnyIslandOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>
                        <View style={orientationStyles.bottomHalfLeft}>
                            {/* Springtime Fun */}
                            <TouchableOpacity style={orientationStyles.SpringtimeFunOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                            {/* Alien Adventures */}
                            <TouchableOpacity style={orientationStyles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                            {/* Outer Space */}
                            <TouchableOpacity style={orientationStyles.OuterSpaceOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/outerSpace.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={orientationStyles.rightSide}>

                        <View style={orientationStyles.upperHalfRight}>
                            {/* Planets and Beyond */}
                            <TouchableOpacity style={orientationStyles.PlanetsAndBeyondOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={orientationStyles.bottomHalfRight}>
                            {/* Diving Deep */}
                            <TouchableOpacity style={orientationStyles.DivingDeepOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/divingDeep.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>
                        
                    
                    </View>
            
                
            </ImageBackground>

    );
};

const styles = {
    
    landscape: StyleSheet.create({
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
            marginTop: '6%',
            marginLeft: '12%',
            height: '100%',
            width: '70%',
        },

        Image: {
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
        },
    }),

    portrait: StyleSheet.create({
        background: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        },
        leftSide: {
            flex: 1,
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
            flex: 1,
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
            marginTop: '6%',
            marginLeft: '12%',
            height: '100%',
            width: '70%',
        },

        Image: {
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
        },
    }),



};

export default SelectWordBatchesView;
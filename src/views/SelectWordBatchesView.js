import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';


const SelectWordBatchesView = ({ navigation }) => {

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;

    const [orientationStyles, setOrientationStyles] = useState(styles.portrait);
    const [backgroundImage, setBackgroundImage] = useState(require('../assets/selectWordBatchesView/batchesBackgroundLandscape.png'));

    useEffect(() => {
        // Function to update styles based on current orientation
        const updateOrientationStyles = async () => {
          const orientation = await ScreenOrientation.getOrientationAsync();
          if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            setOrientationStyles(styles.landscape);
            setBackgroundImage(require('../assets/selectWordBatchesView/batchesBackgroundLandscape.png'));
          } else {
            setOrientationStyles(styles.portrait);
            setBackgroundImage(require('../assets/selectWordBatchesView/batchesBackgroundPortrait.png'));
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
                source={backgroundImage}
                resizeMode="cover"
                style={orientationStyles.background}>

            {isLandscape ? (
                <>
                    <View style={screenWidth > screenHeight ? orientationStyles.leftSide: orientationStyles.upperHalfPortrait}>
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
                    </>) : (
                        <>
                        <View style={orientationStyles.leftSidePortrait}>


                            {/* Springtime Fun */}
                            <TouchableOpacity style={orientationStyles.SpringtimeFunOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>

                            {/* Alien Adventures */}
                            <TouchableOpacity style={orientationStyles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={orientationStyles.middlePortrait}>
                        {/* Flying High Batch */}
                        <TouchableOpacity style={orientationStyles.FlyingHighOpacity} onPress={() => navigation.navigate('Flying High Words')}>
                            <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')} style={orientationStyles.Image} />
                        </TouchableOpacity>

                        {/* Alien Adventures */}
                        <TouchableOpacity style={orientationStyles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                            <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')} style={orientationStyles.Image} />
                        </TouchableOpacity>
                        </View>

                        <View style={orientationStyles.rightSidePortrait}>

                        {/* Sunny Island */}
                        <TouchableOpacity style={orientationStyles.SunnyIslandOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')} style={orientationStyles.Image} />
                        </TouchableOpacity>
                    

                        {/* Alien Adventures */}
                        <TouchableOpacity style={orientationStyles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                            <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')} style={orientationStyles.Image} />
                        </TouchableOpacity>
                        </View>

                        </>
                        
                        
                        )}

                        
            
                
            </ImageBackground>

    );
};

const styles = {
    
// Landscape styles
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

// Portrait styles
    portrait: StyleSheet.create({
        background: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            borderColor: 'red',
            borderWidth: 2,
        },
        leftSidePortrait: {
            flex: 1,
            borderColer: 'green',
            borderWidth: 2,
        },
        middlePortrait: {
            flex: 1,
            borderColer: 'green',
            borderWidth: 2,
        },
        rightSidePortrait: {
            flex: 1,
            borderColer: 'blue',
            borderWidth: 2,
        },

        FlyingHighOpacity: {

            height: '25%',
            width: '100%',
            borderColor: 'black',
            borderWidth: 2,
        },
        SunnyIslandOpacity: {
        
            marginTop: '20%',
            height: '25%',
            width: '100%',
            borderColor: 'black',
            borderWidth: 2,
        },
        SpringtimeFunOpacity: {
            marginLeft: '-10%',
            marginTop: '100%',
            height: '20%',
            width: '110%',
            b0rderColor: 'black',  
            borderWidth: 2,
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
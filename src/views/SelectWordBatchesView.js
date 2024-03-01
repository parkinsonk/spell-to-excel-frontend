import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Svg, { Path } from 'react-native-svg';



const SelectWordBatchesView = ({ navigation }) => {

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

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
                marginLeft: aspectRatio > 1.5 ? '30%' : '15%',
                height: aspectRatio > 1.5 ? '72%' : '60%',
                width: aspectRatio > 1.5 ? '25%' : '32%',
            },
            SunnyIslandOpacity: {
                marginTop: aspectRatio > 1.5 ? '1%': '5%',
                marginLeft: '15%',
                height: aspectRatio > 1.5 ? '95%': '90%',
                width: aspectRatio > 1.5 ? '18%': '25%',
            },
            SpringtimeFunOpacity: {
                marginLeft: '-2.5%',
                height: aspectRatio > 1.5 ? '65%': '50%',
                width: aspectRatio > 1.5 ? '40%' : '50%',
            },
            AlienAdventuresOpacity: {
                marginTop: aspectRatio > 1.5 ? '17%' : '25%',
                height: '40%',
                width: '30%',
            },
            OuterSpaceOpacity: {
                marginTop: '2%',
                marginLeft: aspectRatio > 1.5 ? '9%' : '1%',
                height: aspectRatio > 1.5 ? '90%' : '70%',
                width: aspectRatio > 1.5 ? '20%': '25%',

            },

            PlanetsAndBeyondOpacity: {
                marginTop: aspectRatio > 1.5 ? '25%' : '40%',
                marginLeft: '8%',
                height: aspectRatio > 1.5 ? '80%' : '75%',
                width: aspectRatio > 1.5 ? '65%' : '90%',
            },

            DivingDeepOpacity: {
                marginTop: aspectRatio > 1.5 ? '12%' : '25%',
                marginLeft: aspectRatio > 1.5 ? '30%' : '13%',
                height: aspectRatio > 1.5 ? '80%' : '80%',
                width: aspectRatio > 1.5 ? '55%' : '85%',
            },

            Image: {
                height: '100%',
                width: '100%',
            },
        }),

    // Portrait styles
        portrait: StyleSheet.create({
            background: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
            },
            leftSidePortrait: {
                flex: 1,
            },
            middlePortrait: {
                flex: 1,
            },
            rightSidePortrait: {
                flex: 1,
            },

            FlyingHighOpacity: {
                marginTop: '10%',
                marginLeft: '-40%',
                height: '16%',
                width: '100%',
            },
            SunnyIslandOpacity: {
            
                marginTop: '20%',
                height: '25%',
                width: '85%',
            },
            SpringtimeFunOpacity: {
                marginLeft: '-10%',
                marginTop: '100%',
                height: '20%',
                width: '110%',
            },
            AlienAdventuresOpacity: {
                marginLeft: '2%',
                marginTop: '75%',
                height: '20%',
                width: '104%',
            },
            OuterSpaceOpacity: {
                marginTop: '99%',
                height: '35%',
                width: '100%',
            },

            PlanetsAndBeyondOpacity: {
                marginTop: '20%',
                height: '25%',
                width: '100%',
                marginLeft: '-10%',
            },

            DivingDeepOpacity: {
                marginTop: '60%',
                height: '25%',
                width: '100%',
                marginLeft: '-30%',
            },

            Image: {
                height: '100%',
                width: '100%',
            },
        })
};

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
                                <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                            {/* Sunny Island */}
                            <TouchableOpacity style={orientationStyles.SunnyIslandOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>
                        <View style={orientationStyles.bottomHalfLeft}>
                            {/* Springtime Fun */}
                            <TouchableOpacity style={orientationStyles.SpringtimeFunOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                            {/* Alien Adventures */}
                            <TouchableOpacity style={orientationStyles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                            {/* Outer Space */}
                            <TouchableOpacity style={orientationStyles.OuterSpaceOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={orientationStyles.rightSide}>

                        <View style={orientationStyles.upperHalfRight}>
                            {/* Planets and Beyond */}
                            <TouchableOpacity style={orientationStyles.PlanetsAndBeyondOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={orientationStyles.bottomHalfRight}>
                            {/* Diving Deep */}
                            <TouchableOpacity style={orientationStyles.DivingDeepOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>
                        
                    
                    </View>
                    </>) : (
                        <>

                        {/* Start of Portrait Views */}
                        <View style={orientationStyles.leftSidePortrait}>


                            {/* Springtime Fun */}
                            <TouchableOpacity style={orientationStyles.SpringtimeFunOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>

                            {/* Alien Adventures */}
                            <TouchableOpacity style={orientationStyles.AlienAdventuresOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/alienAdventuresPortrait.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={orientationStyles.middlePortrait}>
                            {/* Flying High Batch */}
                            <TouchableOpacity style={orientationStyles.FlyingHighOpacity} onPress={() => navigation.navigate('Flying High Words')}>
                                <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')} style={orientationStyles.Image} />
                            </TouchableOpacity>

                            {/* Outer Space */}
                            <TouchableOpacity style={orientationStyles.OuterSpaceOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>

                        <View style={orientationStyles.rightSidePortrait}>

                        {/* Sunny Island */}
                            <TouchableOpacity style={orientationStyles.SunnyIslandOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                    

                            {/* Planets and Beyond */}
                            <TouchableOpacity style={orientationStyles.PlanetsAndBeyondOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>

                            {/* Diving Deep */}
                            <TouchableOpacity style={orientationStyles.DivingDeepOpacity} onPress={() => console.log('Button 1 pressed')}>
                                <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  style={orientationStyles.Image} />
                            </TouchableOpacity>
                        </View>

                        </>
                        
                        
                        )}

                        
            
                
            </ImageBackground>

    );
};




export default SelectWordBatchesView;
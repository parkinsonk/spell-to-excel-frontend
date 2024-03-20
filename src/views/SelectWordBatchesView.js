import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, Image, useWindowDimensions, Pressable} from 'react-native';
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
                alignContent: 'flex-end',

            },
            bottomHalfLeft: {
                flex: 1.5,
                flexDirection: 'row',
            },
            upperHalfRight: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                
            },
            bottomHalfRight: {
                flex: 1.2,
                flexDirection: 'column',
                justifyContent: 'flex-end',

            },

            FlyingHighOpacity: {
                marginTop: '5%',
                marginLeft: aspectRatio > 1.5 ? '20%' : '20%',
                height: aspectRatio > 1.5 ? 120 : 165,
                width: aspectRatio > 1.5 ? 150 : 250,
            },
            SunnyIslandOpacity: {
                marginLeft: '15%',
                height: aspectRatio > 1.5 ? 125: 265,
                width: aspectRatio > 1.5 ? 110: 200,
            },
            SpringtimeFunOpacity: {
                marginLeft: '-3%',
                height: aspectRatio > 1.5 ? 125: 200,
                width: aspectRatio > 1.5 ? 200 : 350,
            },
            AlienAdventuresOpacity: {
                marginTop: aspectRatio > 1.5 ? '15%' : '25%',
                marginLeft: aspectRatio > 1.5 ? '5%' : '-15%',
                height: aspectRatio > 1.5 ? 120:200,
                width: aspectRatio > 1.5 ? 150:250,
            },
            OuterSpaceOpacity: {
                marginTop: aspectRatio > 1.5 ? '5%' :'10%',
                marginLeft: aspectRatio > 1.5 ? '4%' : '6%',
                height: aspectRatio > 1.5 ? 175 : 300,
                width: aspectRatio > 1.5 ? 100: 200,
            },

            PlanetsAndBeyondOpacity: {
                marginLeft: '8%',
                height: 150,
                width: 150,
            },

            DivingDeepOpacity: {
                marginLeft: aspectRatio > 1.5 ? '30%' : '13%',
                height: aspectRatio > 1.5 ? 115 : 250,
                width: aspectRatio > 1.5 ? 115 : 250,
            },
            SunnyIslandImage: {
                height: aspectRatio > 1.5 ? 125 : 265,
                width: aspectRatio > 1.5 ? 110 :200,
            },
            FlyingHighImage: {
                height: aspectRatio > 1.5 ? 120 :165,
                width: aspectRatio > 1.5 ? 150 :250,
            },
            SpringTimeFunImage: {
                height: aspectRatio > 1.5 ? 125 :200,
                width: aspectRatio > 1.5 ? 200 :350,
            },
            OuterSpaceImage: {
                height: aspectRatio > 1.5 ? 175 :300,
                width: aspectRatio > 1.5 ? 100 :200,
            },
            AlienAdventuresImage: {
                height: aspectRatio > 1.5 ? 120 :200,
                width: aspectRatio > 1.5 ? 150 :250,
            },
            PlanetsAndBeyondImage: {
                height: aspectRatio > 1.5 ? 150 :250,
                width: aspectRatio > 1.5 ? 150 :250,
            },
            DivingDeepImage: {
                height: aspectRatio > 1.5 ? 115 :200,
                width: aspectRatio > 1.5 ? 115 :200,
            },

            Image: {
                width: '100%',
                height: '100%',
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
                justifyContent: 'space-between',
            },

            FlyingHighOpacity: {
                marginTop: '10%',
                marginLeft: '-40%',
                height: 165,
                width: 250,
                
            },
            SpringtimeFunOpacity: {
                marginLeft: '-10%',
                marginTop: '100%',
                width: 350,
                height: 200,
            },
            SunnyIslandOpacity: {
                height: 265,
                width: 200,
                width: 200,
                height: 265,
            },
            AlienAdventuresOpacity: {
                marginLeft: '2%',
                marginTop: '75%',
                width: 250,
                height: 200,
            },
            OuterSpaceOpacity: {
                marginTop: '120%',
                width: 200,
                height: 300,
            },
            PlanetsAndBeyondOpacity: {
                marginBottom: '0%',
                marginLeft: '-10%',
            },
            SunnyIslandImage: {
                height: 265,
                width: 200,
            },
            FlyingHighImage: {
                height: 165,
                width: 250,
            },
            SpringTimeFunImage: {
                height: 200,
                width: 350,
            },
            OuterSpaceImage: {
                height: 300,
                width: 200,
            },
            AlienAdventuresImage: {
                height: 200,
                width: 250,
            },
            PlanetsAndBeyondImage: {
                height: 250,
                width: 250,
            },
            DivingDeepImage: {
                height: 200,
                width: 200,
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

                            <Pressable
                                onPress={() => navigation.navigate('Flying High')}
                                style={({ pressed }) => [
                                    orientationStyles.FlyingHighOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')}  resizeMode='contain' style={orientationStyles.FlyingHighImage} />
                            </Pressable>

                            {/* Sunny Island */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.SunnyIslandOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')}  resizeMode='contain' style={orientationStyles.SunnyIslandImage} />
                            </Pressable>

                        </View>
                        <View style={orientationStyles.bottomHalfLeft}>
                            {/* Springtime Fun */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.SpringtimeFunOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  resizeMode='contain' style={orientationStyles.SpringTimeFunImage} />
                            </Pressable>
                            {/* Alien Adventures */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.AlienAdventuresOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')}  resizeMode='contain' style={orientationStyles.AlienAdventuresImage} />
                            </Pressable>

                            {/* Outer Space */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.OuterSpaceOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  resizeMode='contain' style={orientationStyles.OuterSpaceImage} />
                            </Pressable>

                        </View>
                    </View>

                    <View style={orientationStyles.rightSide}>

                        <View style={orientationStyles.upperHalfRight}>

                            {/* Planets and Beyond */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.PlanetsAndBeyondOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  resizeMode='contain' style={orientationStyles.PlanetsAndBeyondImage} />
                            </Pressable>

                        </View>

                        <View style={orientationStyles.bottomHalfRight}>
                            {/* Diving Deep */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.DivingDeepOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  resizeMode='contain' style={orientationStyles.DivingDeepImage} />
                            </Pressable>
                        </View>
                        
                    
                    </View>
                    </>) : (
                        <>

                        {/* Start of Portrait Views */}
                        <View style={orientationStyles.leftSidePortrait}>


                            {/* Springtime Fun */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.SpringtimeFunOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  resizeMode='contain' style={orientationStyles.SpringTimeFunImage} />
                            </Pressable>

                            {/* Alien Adventures */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.AlienAdventuresOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/alienAdventuresPortrait.png')}  resizeMode='contain' style={orientationStyles.AlienAdventuresImage} />
                            </Pressable>
                        </View>

                        <View style={orientationStyles.middlePortrait}>
                            {/* Flying High Batch */}
                            <Pressable
                                onPress={() => navigation.navigate('Flying High')}
                                style={({ pressed }) => [
                                    orientationStyles.FlyingHighOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')} resizeMode='contain' style={orientationStyles.FlyingHighImage} />
                            </Pressable>

                            {/* Outer Space */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.OuterSpaceOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  resizeMode='contain' style={orientationStyles.OuterSpaceImage} />
                            </Pressable>
                        </View>

                        <View style={orientationStyles.rightSidePortrait}>

                        {/* Sunny Island */}
                        <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.SunnyIslandOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')}  resizeMode='contain' style={orientationStyles.SunnyIslandImage} />
                            </Pressable>
                    

                            {/* Planets and Beyond */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.PlanetsAndBeyondOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  resizeMode='contain' style={orientationStyles.PlanetsAndBeyondImage} />
                            </Pressable>

                            {/* Diving Deep */}
                            <Pressable
                                onPress={() => console.log('Button 1 pressed')}
                                style={({ pressed }) => [
                                    orientationStyles.DivingDeepOpacity, // Your existing styles
                                    {
                                    opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                    },
                            
                                ]}
                            >
                                <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  resizeMode='contain' style={orientationStyles.DivingDeepImage} />
                            </Pressable>
                        </View>

                        </>
                        
                        
                        )}

            </ImageBackground>

    );
};




export default SelectWordBatchesView;
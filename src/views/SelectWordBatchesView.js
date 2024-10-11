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
            background: {
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
            },
            top: {
                flex: 1,
                flexDirection: 'row',
                borderColor: 'red',
                borderWidth: 2,
            },
            topLeft: {
                flex: 1,
                flexDirection: 'row',
                borderColor: 'red',
                borderWidth: 2,
            },
            topRight: {
                flex: 1,
                flexDirection: 'row',
                borderColor: 'red',
                borderWidth: 2,
            },
            bottom: {
                flex: 10,
                flexDirection: 'column',
                borderColor: 'green',
                borderWidth: 4,
            },
            bottomTop: {
                flex: 1,
                flexDirection: 'row',
                borderColor: 'blue',
                borderWidth: 2,
            },
            bottomMiddle: {
                flex: 1,
                flexDirection: 'row',
                borderColor: 'orange',
                borderWidth: 2,
            },
            bottomBottom: {
                flex: 1,
                flexDirection: 'row',
                borderColor: 'purple',
                borderWidth: 2,
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
        };       
 
    return (
        
            <ImageBackground
                source={require('../assets/selectWordBatchesView/batchesBackgroundLandscape.png')}
                resizeMode="cover"
                style={styles.background}>

                    <View style={styles.top}>
                        <View style={styles.topLeft}>

                        </View>

                        <View style={styles.topRight}>
                        
                        </View>
                    
                    </View>

                    <View style={styles.bottom}>
                                {/* Flying High Batch */}
                            <View style={styles.bottomTop}>

                                <Pressable
                                    onPress={() => navigation.navigate('Flying High')}
                                    style={({ pressed }) => [
                                        styles.FlyingHighOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')}  resizeMode='contain' style={styles.FlyingHighImage} />
                                </Pressable>

                                {/* Sunny Island */}
                                <Pressable
                                    onPress={() => navigation.navigate('Sunny Island')}
                                    style={({ pressed }) => [
                                        styles.SunnyIslandOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')}  resizeMode='contain' style={styles.SunnyIslandImage} />
                                </Pressable>
                            </View>

                            <View style={styles.bottomMiddle}>


                                {/* Springtime Fun */}
                                <Pressable
                                    onPress={() => navigation.navigate('Springtime Fun')}
                                    style={({ pressed }) => [
                                        styles.SpringtimeFunOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >

                                <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  resizeMode='contain' style={styles.SpringTimeFunImage} />
                                </Pressable>

                                {/* Outer Space */}
                                <Pressable
                                    onPress={() => navigation.navigate('Outer Space')}
                                    style={({ pressed }) => [
                                        styles.OuterSpaceOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  resizeMode='contain' style={styles.OuterSpaceImage} />
                                </Pressable>

                                {/* Planets and Beyond */}
                                <Pressable
                                    onPress={() => navigation.navigate('Planets and Beyond')}
                                    style={({ pressed }) => [
                                        styles.PlanetsAndBeyondOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  resizeMode='contain' style={styles.PlanetsAndBeyondImage} />
                                </Pressable>

                            </View>

                            <View style={styles.bottomTop}>
                                    
                                    {/* Alien Adventures */}
                                    <Pressable
                                        onPress={() => navigation.navigate('Alien Adventures')}
                                        style={({ pressed }) => [
                                            styles.AlienAdventuresOpacity, // Your existing styles
                                            {
                                            opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                            },
                                    
                                        ]}
                                    >
                                        <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')}  resizeMode='contain' style={styles.AlienAdventuresImage} />
                                    </Pressable>

                                    


                                    {/* Diving Deep */}
                                    <Pressable
                                        onPress={() => navigation.navigate('Diving Deep')}
                                        style={({ pressed }) => [
                                            styles.DivingDeepOpacity, // Your existing styles
                                            {
                                            opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                            },
                                    
                                        ]}
                                    >
                                        <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  resizeMode='contain' style={styles.DivingDeepImage} />
                                    </Pressable>

                                </View>
                            
                        </View>

            </ImageBackground>

    );
};




export default SelectWordBatchesView;
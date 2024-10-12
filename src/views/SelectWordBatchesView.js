import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TouchableOpacity, Image, useWindowDimensions, Pressable} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';



const SelectWordBatchesView = ({ navigation }) => {

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const logout = async () => {
        // Remove tokens or any authentication information
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        
        // Navigate back to the login screen
        navigation.navigate('Login');
    };

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) {
            return iPhoneValue;
        } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
            return iPadMiniValue;
        } else {
            return iPadValue;
        }
    };

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
            },
            topLeft: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                
            },
            topRight: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            },
            topMiddle: {
                flex: 1,
                flexDirection: 'row',
            },
            bottom: {
                flex: 10,
                flexDirection: 'row',
            },
            bottomLeft: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
            },
            bottomMiddle: {
                flex: 1,
                flexDirection: 'column',
                borderColor: 'orange',
                justifyContent: 'space-around',
            },
            bottomRight: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            FlyingHighOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '25%', '25%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
            },
            SunnyIslandOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '25%', '35%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
            },
            SpringtimeFunOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '35%', '30%', '30%') : calculateImageDimensions(aspectRatio, '20%', '20%', '18%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '100%', '100%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
                marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '45%', '25%', '25%') : calculateImageDimensions(aspectRatio, '100%', '100%', '20%'),
            },
            AlienAdventuresOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '25%', '25%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
                marginTop: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '25%', '25%', '25%'),
            },
            OuterSpaceOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '30%', '35%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
            },

            PlanetsAndBeyondOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '25%', '30%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
                marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '25%', '25%', '25%'),
            },

            DivingDeepOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '35%', '25%', '35%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
            },
            image: {
                height: '100%',
                width: '100%',
            },
            wordsIKnowopacity: {
                width: isLandscape ? calculateImageDimensions(aspectRatio, '40%', '40%', '40%') : calculateImageDimensions(aspectRatio, '60%', '60%', '65%'),
                height: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '80%', '80%') : calculateImageDimensions(aspectRatio, '65%', '65%', '65%'),
            },
        };       
 
    return (
        
            <ImageBackground
                source={require('../assets/selectWordBatchesView/batchesBlueBackground.png')}
                resizeMode="cover"
                style={styles.background}>

                    <SafeAreaView style={styles.top}>
                        <View style={styles.topLeft}>

                            <TouchableOpacity style={styles.wordsIKnowopacity} onPress={logout}>

                                <Image source={require('../assets/selectWordBatchesView/logout.png')}  resizeMode='contain' style={styles.image} />
                            </TouchableOpacity>

                        </View>



                        <View style={styles.topRight}>

                            <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => navigation.navigate('Words I Know')}>
                                <Image source={require('../assets/selectWordBatchesView/wordsIKnow.png')}  resizeMode='contain' style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    
                    </SafeAreaView>

                    <SafeAreaView style={styles.bottom}>
                                {/* Flying High Batch */}
                            <ImageBackground
                            source={require('../assets/selectWordBatchesView/batchesBlueBackground.png')}
                            resizeMode="cover"
                            style={styles.bottomLeft}>

                                <Pressable
                                    onPress={() => navigation.navigate('Flying High')}
                                    style={({ pressed }) => [
                                        styles.FlyingHighOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/flyingHigh.png')}  resizeMode='contain' style={styles.image} />
                                </Pressable>

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

                                    <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  resizeMode='contain' style={styles.image} />
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
                                    <Image source={require('../assets/selectWordBatchesView/sunnyIsland.gif')}  resizeMode='contain' style={styles.image} />
                                </Pressable>
                            </ImageBackground>

                            <ImageBackground
                            source={require('../assets/selectWordBatchesView/spaceBackground.png')}
                            resizeMode="cover"
                            style={styles.bottomMiddle}>

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
                                        <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')}  resizeMode='contain' style={styles.image} />
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
                                    <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  resizeMode='contain' style={styles.image} />
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
                                    <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  resizeMode='contain' style={styles.image} />
                                </Pressable>

                            </ImageBackground>

                            <ImageBackground
                            source={require('../assets/selectWordBatchesView/batchesBlueBackground.png')}
                            resizeMode="cover"
                            style={styles.bottomRight}>
                                    

                                    


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
                                        <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  resizeMode='contain' style={styles.image} />
                                    </Pressable>

                                </ImageBackground>
                            
                        </SafeAreaView>

            </ImageBackground>

    );
};




export default SelectWordBatchesView;
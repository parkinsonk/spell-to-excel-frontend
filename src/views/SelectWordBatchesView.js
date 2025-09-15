import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TouchableOpacity, Image, useWindowDimensions, Pressable} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';



const SelectWordBatchesView = ({ navigation, route }) => {

    const { email } = route.params;
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;
    const { flyingHighStatus, sunnyIslandStatus, springtimeFunStatus, alienAdventureStatus, 
        outerSpaceStatus, planetsAndBeyondStatus, divingDeepStatus, isLoading } = useProgress();

    let flyingHighCompleted;
    let sunnyIslandCompleted;
    let springtimeFunCompleted;
    let alienAdventureCompleted;
    let outerSpaceCompleted;
    let planetsAndBeyondCompleted;
    let divingDeepCompleted;

    const logout = async () => {
        // Remove tokens or any authentication information
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        
        // Reset navigation to the Login screen so it remounts and clears inputs
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
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

    for (let word in flyingHighStatus) {
        if (!flyingHighStatus[word].test_correct) {
            flyingHighCompleted = false;
            break;
        }
        flyingHighCompleted = true;
    }

    for (let word in sunnyIslandStatus) {
        if (!sunnyIslandStatus[word].test_correct) {
            sunnyIslandCompleted = false;
            break;
        }
        sunnyIslandCompleted = true;
    }

    for (let word in springtimeFunStatus) {
        if (!springtimeFunStatus[word].test_correct) {
            springtimeFunCompleted = false;
            break;
        }
        springtimeFunCompleted = true;
    }

    for (let word in alienAdventureStatus) {
        if (!alienAdventureStatus[word].test_correct) {
            alienAdventureCompleted = false;
            break;
        }
        alienAdventureCompleted = true;
    }

    for (let word in outerSpaceStatus) {
        if (!outerSpaceStatus[word].test_correct) {
            outerSpaceCompleted = false;
            break;
        }
        outerSpaceCompleted = true;
    }

    for (let word in planetsAndBeyondStatus) {
        if (!planetsAndBeyondStatus[word].test_correct) {
            planetsAndBeyondCompleted = false;
            break;
        }
        planetsAndBeyondCompleted = true;
    }

    for (let word in divingDeepStatus) {
        if (!divingDeepStatus[word].test_correct) {
            divingDeepCompleted = false;
            break;
        }
        divingDeepCompleted = true;
    }


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
                justifyContent: 'space-evenly',

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
                borderTopWidth: 5, // Add top border
                borderTopColor: 'black', // Choose your color
                borderLeftWidth: 5, // Add top border
                borderLeftColor: 'black', // Choose your color
                borderBottomWidth: 5, // Add top border
                borderBottomColor: 'black', // Choose your color
            },
            bottomMiddle: {
                flex: 1,
                flexDirection: 'column',
                borderColor: 'orange',
                justifyContent: 'space-around',
                topBorderWidth: 5, // Add top border
                topBorderColor: 'black', // Choose your color
                borderTopWidth: 5, // Add top border
                borderTopColor: 'black', // Choose your color
                borderBottomWidth: 5, // Add top border
                borderBottomColor: 'black', // Choose your color
            },
            bottomRight: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: 5, // Add top border
                borderTopColor: 'black', // Choose your color
                borderBottomWidth: 5, // Add top border
                borderBottomColor: 'black', // Choose your color
                borderRightWidth: 5, // Add top border
                borderRightColor: 'black', // Choose your color
            },
            FlyingHighOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '25%', '35%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '80%', '80%', '80%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
            },
            SunnyIslandOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '30%', '25%', '30%') : calculateImageDimensions(aspectRatio, '20%', '20%', '20%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '70%', '70%', '70%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
                marginLeft: isLandscape ? calculateImageDimensions(aspectRatio, '35%', '25%', '25%') : calculateImageDimensions(aspectRatio, '100%', '100%', '20%'),
            },
            SpringtimeFunOpacity: {
                height: isLandscape ? calculateImageDimensions(aspectRatio, '35%', '30%', '30%') : calculateImageDimensions(aspectRatio, '20%', '20%', '18%'),
                width: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '100%', '100%') : calculateImageDimensions(aspectRatio, '100%', '100%', '100%'),
                marginRight: isLandscape ? calculateImageDimensions(aspectRatio, '35%', '25%', '25%') : calculateImageDimensions(aspectRatio, '100%', '100%', '20%'),
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
                width: isLandscape ? calculateImageDimensions(aspectRatio, '50%', '50%', '50%') : calculateImageDimensions(aspectRatio, '60%', '60%', '65%'),
                height: isLandscape ? calculateImageDimensions(aspectRatio, '100%', '100%', '100%') : calculateImageDimensions(aspectRatio, '65%', '65%', '65%'),
            },
        };       
 
    return (
        
            <ImageBackground
                source={require('../assets/selectWordBatchesView/batchesBlueBackground.png')}
                resizeMode="cover"
                style={styles.background}>

                    <SafeAreaView style={styles.top}>

                            <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => navigation.navigate('Account Settings', { email: email })}>
                                <Image source={require('../assets/selectWordBatchesView/accountSettings.png')}  resizeMode='contain' style={styles.image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.wordsIKnowopacity} onPress={() => navigation.navigate('Words I Know')}>
                                <Image source={require('../assets/selectWordBatchesView/wordsIKnow.png')}  resizeMode='contain' style={styles.image} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.wordsIKnowopacity} onPress={logout}>
                                <Image source={require('../assets/selectWordBatchesView/logout.png')}  resizeMode='contain' style={styles.image} />
                            </TouchableOpacity>
                    
                    </SafeAreaView>

                    <SafeAreaView style={styles.bottom}>
                            {/* Flying High Batch */}
                            <ImageBackground
                            source={require('../assets/selectWordBatchesView/skyBackground.png')}
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

                                    {/* Sunny Island */}
                                    <Pressable
                                        onPress={() => {
                                            if (flyingHighCompleted) {
                                                navigation.navigate('Sunny Island'); // Only navigate if flyingHighCompleted is true
                                            }
                                        }}
                                        style={({ pressed }) => [
                                            styles.SunnyIslandOpacity, // Your existing styles
                                            {
                                            opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                            },
                                    
                                        ]}
                                    >
                                        <Image source={require('../assets/selectWordBatchesView/sunnyIsland.png')}  resizeMode='contain' style={{ height: '100%', width: '100%', opacity: flyingHighCompleted ? 1 : .5}} flying />
                                    </Pressable>

                                    {/* Springtime Fun */}
                                    <Pressable
                                        onPress={() => {
                                            if (sunnyIslandCompleted) {
                                                navigation.navigate('SpringTime Fun'); // Only navigate if flyingHighCompleted is true
                                            }
                                        }}
                                        style={({ pressed }) => [
                                            styles.SpringtimeFunOpacity, // Your existing styles
                                            {
                                            opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                            },
                                    
                                        ]}
                                    >

                                        <Image source={require('../assets/selectWordBatchesView/springtimeFun.png')}  resizeMode='contain' style={{ height: '100%', width: '100%', opacity: sunnyIslandCompleted ? 1 : .5}} />
                                    </Pressable>

                              
                            </ImageBackground>

                            <ImageBackground
                            source={require('../assets/selectWordBatchesView/spaceBackground.png')}
                            resizeMode="cover"
                            style={styles.bottomMiddle}>


                                

                                    {/* Alien Adventures */}
                                    <Pressable
                                        onPress={() => {
                                            if (springtimeFunCompleted) {
                                                navigation.navigate('Alien Adventures'); // Only navigate if sunnyIslandCompleted is true
                                            }
                                        }}
                                        style={({ pressed }) => [
                                            styles.AlienAdventuresOpacity, // Your existing styles
                                            {
                                            opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                            },
                                    
                                        ]}
                                    >
                                        <Image source={require('../assets/selectWordBatchesView/alienAdventures.png')}  resizeMode='contain' style={{ height: '100%', width: '100%', opacity: springtimeFunCompleted ? 1 : .5}} />
                                    </Pressable>

                                {/* Outer Space */}
                                <Pressable
                                    onPress={() => {
                                        if (alienAdventureCompleted) {
                                            navigation.navigate('Outer Space');  // Only navigate if alienAdventureCompleted is true
                                        }
                                    }}
                                    style={({ pressed }) => [
                                        styles.OuterSpaceOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/outerSpace.png')}  resizeMode='contain' style={{ height: '100%', width: '100%', opacity: alienAdventureCompleted ? 1 : .5}} />
                                </Pressable>

                                {/* Planets and Beyond */}
                                <Pressable
                                    onPress={() => {
                                            if (outerSpaceCompleted) {
                                                navigation.navigate('Planets and Beyond'); // Only navigate if outerSpaceCompleted is true
                                            }
                                        }}
                                    style={({ pressed }) => [
                                        styles.PlanetsAndBeyondOpacity, // Your existing styles
                                        {
                                        opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                        },
                                
                                    ]}
                                >
                                    <Image source={require('../assets/selectWordBatchesView/planetsAndBeyond.png')}  resizeMode='contain' style={{ height: '100%', width: '100%', opacity: outerSpaceCompleted ? 1 : .5}} />
                                </Pressable>

                            </ImageBackground>

                            <ImageBackground
                            source={require('../assets/selectWordBatchesView/beachBackground.png')}
                            resizeMode="cover"
                            style={styles.bottomRight}>
                                    

                                    {/* Diving Deep */}
                                    <Pressable
                                        onPress={() => {
                                            if (planetsAndBeyondCompleted) {
                                                navigation.navigate('Diving Deep'); // Only navigate if planetsAndBeyond is true
                                            }
                                        }}
                                        style={({ pressed }) => [
                                            styles.DivingDeepOpacity, // Your existing styles
                                            {
                                            opacity: pressed ? 0.5 : 1, // Dynamically adjust opacity
                                            },
                                    
                                        ]}
                                    >
                                        <Image source={require('../assets/selectWordBatchesView/divingDeep.png')}  resizeMode='contain' style={{ height: '100%', width: '100%', opacity: planetsAndBeyondCompleted ? 1 : .5}} />
                                    </Pressable>

                                </ImageBackground>
                            
                        </SafeAreaView>

            </ImageBackground>

    );
};




export default SelectWordBatchesView;
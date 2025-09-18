import React, { useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderWordPressable } from '../components/wordButtons';

const AlienAdventuresWordsView = ({ navigation }) => {

    const { alienAdventureStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    isLandscape ? aspectRatio = screenWidth / screenHeight : aspectRatio = screenHeight / screenWidth;

    const getImageSource = (word) => {
        // Check if the word is completed using the alienAdventureStatus.
        const isCompleted = alienAdventureStatus[word] ? alienAdventureStatus[word].test_correct : false; // Check if word exists.
        const key = isCompleted ? `${word}completed` : word; // If word is completed, append 'completed' to the word to get the image key.
        return wordImageMapping[key];
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

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
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
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
        allOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '50%', '40%', '35%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '15%', '15%') : calculateImageDimensions(aspectRatio, '17%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '0%', '0%', '0%'),
        },
        lookOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '60%', '45%') : calculateImageDimensions(aspectRatio, '35%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '15%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '5%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        littleOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '55%', '50%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        wereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '50%', '52%', '49%') : calculateImageDimensions(aspectRatio, '35%', '34%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '9%', '21%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '8%', '8%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        yourOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '40%', '40%', '37%') : calculateImageDimensions(aspectRatio, '35%', '22%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '2%', '3%') : calculateImageDimensions(aspectRatio, '5%', '10%', '10%'),
        },
        downOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '56%', '45%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '0%', '0%'),
        },
        thereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '60%', '57%') : calculateImageDimensions(aspectRatio, '35%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '17%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '5%', '8%') : calculateImageDimensions(aspectRatio, '5%', '15%', '15%'),
        },
        doOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '40%', '39%', '35%') : calculateImageDimensions(aspectRatio, '35%', '22%', '20%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '9%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '5%', '5%', '5%'),
        },
        theirOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '61%', '57%') : calculateImageDimensions(aspectRatio, '35%', '29%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '9%', '15%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '3%', '3%') : calculateImageDimensions(aspectRatio, '5%', '20%', '20%'),
        },
        hereOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '50%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '15%', '12%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '9%', '9%') : calculateImageDimensions(aspectRatio, '20%', '5%', '5%'),
        },
        otherOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '68%', '50%', '58%') : calculateImageDimensions(aspectRatio, '40%', '31%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '14%', '12%', '19%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '0%') : calculateImageDimensions(aspectRatio, '10%', '0%', '0%'),
        },
        aboutOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '65%', '65%') : calculateImageDimensions(aspectRatio, '40%', '35%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '25%', '17%', '15%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '5%', '5%') : calculateImageDimensions(aspectRatio, '20%', '15%', '15%'),
        },
        wantOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '45%', '45%', '45%') : calculateImageDimensions(aspectRatio, '40%', '25%', '30%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '15%', '15%') : calculateImageDimensions(aspectRatio, '25%', '20%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '0%', '0%', '2%') : calculateImageDimensions(aspectRatio, '8%', '5%', '5%'),
        },
        tooOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '50%', '45%') : calculateImageDimensions(aspectRatio, '40%', '35%', '37%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '10%', '12%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '25%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '4%', '10%', '10%') : calculateImageDimensions(aspectRatio, '8%', '15%', '15%'),
        },
        manyOpacity: {
            height: isLandscape ? calculateImageDimensions(aspectRatio, '60%', '52%', '49%') : calculateImageDimensions(aspectRatio, '40%', '36%', '35%'),
            width: isLandscape ? calculateImageDimensions(aspectRatio, '12%', '12%', '15%') : calculateImageDimensions(aspectRatio, '25%', '22%', '20%'),
            marginBottom: isLandscape ? calculateImageDimensions(aspectRatio, '1%', '1%', '1%') : calculateImageDimensions(aspectRatio, '15%', '0%', '0%'),
        },
        Image: {
            height: '100%',
            width: '100%',
        },
    });

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        
            <ImageBackground
                source={require('../assets/alienAdventureView/alienAdventuresBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.top}>


                    <TouchableOpacity style={styles.allOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'all', batch: 'Alien Adventures' })}>
                        <Image source={getImageSource('all', alienAdventureStatus['all'])} style={styles.Image} />
                    </TouchableOpacity>

                    {/* look */}
                    {renderWordPressable('all', 'look', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('look'))}
                    {/* little */}
                    {renderWordPressable('look', 'little', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('little'))}
                    {/* were */}
                    {renderWordPressable('little', 'were', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('were'))}
                    {/* your */}
                    {renderWordPressable('were', 'your', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('your'))}

                </SafeAreaView>

                <SafeAreaView style={styles.middle}>


                    {/* down */}
                    {renderWordPressable('your', 'down', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('down'))}
                    {/* there */}
                    {renderWordPressable('down', 'there', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('there'))}
                    {/* do */}
                    {renderWordPressable('there', 'do', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('do'))}
                    {/* their */}
                    {renderWordPressable('do', 'their', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('their'))}
                    {/* here */}
                    {renderWordPressable('their', 'here', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('here'))}

                </SafeAreaView>


                <SafeAreaView style={styles.bottom}>

                    {/* other */}
                    {renderWordPressable('here', 'other', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('other'))}
                    {/* about */}
                    {renderWordPressable('other', 'about', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('about'))}
                    {/* want */}
                    {renderWordPressable('about', 'want', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('want'))}
                    {/* too */}
                    {renderWordPressable('want', 'too', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('too'))}
                    {/* many */}
                    {renderWordPressable('too', 'many', 'Alien Adventures', alienAdventureStatus, navigation, styles, getImageSource('many'))}

                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default AlienAdventuresWordsView;
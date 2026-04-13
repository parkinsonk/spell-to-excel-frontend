import { ActivityIndicator } from 'react-native';
import { ImageBackground, View, Pressable, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions} from 'react-native';
import { useProgress } from '../components/ProgressContext';
import wordImageMapping from '../utils/wordImageMapping';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderWordPressable } from '../components/wordButtons';

const FlyingHighWordsView = ({ navigation }) => {

    const { flyingHighStatus, isLoading } = useProgress();
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const isLandscape = screenWidth > screenHeight;
    const aspectRatio = screenWidth / screenHeight;

    const getImageSource = (word) => {
        // Check if the word is completed using the flyingHighStatus
        const isCompleted = flyingHighStatus[word] ? flyingHighStatus[word].test_correct : false; // Check if word exists.
        const key = isCompleted ? `${word}completed` : word; // If word is completed, append 'completed' to the word to get the image key.
        return wordImageMapping[key];
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
        },
        middle: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        bottom: {
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        IOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '55%' : '55%' : '30%', // If landscape and aspect ratio is greater than 1.7, set height to 55%, else set height to 55%. If portrait, set height to 55%.
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '15%', 
            resizeMode: 'contain',
            marginTop: '6%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        theOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '55%' : '55%' : '30%', // If landscape and aspect ratio is greater than 1.7, set height to 55%, else set height to 55%. If portrait, set height to 55%.
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '15%', 
            resizeMode: 'contain',
            marginTop: '4%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        toOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '60%' : '60%' : '30%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '15%',
        },
        helicopter: {
            height: isLandscape ? aspectRatio > 1.7 ? '90%' : '90%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '20%' : '15%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '5%',
        },
        seeOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '35%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '15%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '3%' : '3%' : '6%',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '2%' : '1%' : '1%',
        },
        ofOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '40%',
            width: isLandscape ? aspectRatio > 1.7 ? '12%' : '12%' : '15%',
            resizeMode: 'contain',
            marginLeft: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '5%' : '5%' : '15%',
        },
        andOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '10%',
        },
        youOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '12%',
        },
        saidOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '8%',
        },
        weOpacity: { 
            height: isLandscape ? aspectRatio > 1.7 ? '70%' : '70%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '4%' : '4%' : '14%',
        },
        goOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        areOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '2%' : '2%' : '3%',
        },
        wasOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '1%' : '1%' : '1%',
        },
        aOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        heOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '0%' : '0%' : '0%',
        },
        forOpacity: {
            height: isLandscape ? aspectRatio > 1.7 ? '50%' : '50%' : '45%',
            width: isLandscape ? aspectRatio > 1.7 ? '15%' : '15%' : '18%',
            resizeMode: 'contain',
            marginTop: isLandscape ? aspectRatio > 1.7 ? '3%' : '3%' : '4%',
        },
        Image: {
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
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
                source={require('../assets/flyingHighWordsView/flyingHighBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <SafeAreaView style={styles.top}>

                    {/* The */}
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Activities', { selectedWord: 'the', batch: 'Flying High'});
                        }}
                        style={({ pressed }) => [
                            styles.IOpacity,
                            {
                                opacity: pressed ? 0.5 : 1,
                            },
                        ]}
                    >
                        <Image source={getImageSource('the', flyingHighStatus['the'])} style={styles.Image} />
                    </Pressable>

                    {/* see */}
                    {renderWordPressable('the', 'see', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('see'))}

                    {/* I */}
                    {renderWordPressable('see', 'I', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('I'))}

                    {/* to */}
                    {renderWordPressable('I', 'to', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('to'))}

                    <View style={styles.helicopter}>
                        <Image source={require('../assets/flyingHighWordsView/helicopter.png')} style={styles.Image} />
                    </View>

                    {/* of */}
                    {renderWordPressable('to', 'of', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('of'))}    


                </SafeAreaView>

                <SafeAreaView style={styles.middle}>

                    {/* and */}
                    {renderWordPressable('to', 'and', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('and'))}

                    {/* a */}
                    {renderWordPressable('and', 'a', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('a'))}

                    {/* you */}
                    {renderWordPressable('a', 'you', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('you'))}

                    {/* said */}
                    {renderWordPressable('you', 'said', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('said'))}

                    {/* for */}
                    {renderWordPressable('said', 'for', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('for'))}

                    
                    

                </SafeAreaView>

                <SafeAreaView style={styles.bottom}>

                    

                    {/* go */}
                    {renderWordPressable('for', 'go', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('go'))}

                    {/* he */}
                    {renderWordPressable('go', 'he', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('he'))}

                    {/* we */}
                    {renderWordPressable('he', 'we', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('we'))}

                    {/* was */}
                    {renderWordPressable('we', 'was', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('was'))}

                    {/* are */}
                    {renderWordPressable('was', 'are', 'Flying High', flyingHighStatus, navigation, styles, getImageSource('are'))}
                
                </SafeAreaView>
            
                
            </ImageBackground>

    );
};



export default FlyingHighWordsView;
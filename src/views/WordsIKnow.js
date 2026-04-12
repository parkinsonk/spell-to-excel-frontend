import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { Audio } from 'expo-av';
import flashcardMapping from '../utils/flashcardMapping';
import wordAudioMapping from '../utils/wordAudioMapping';
import { useProgress } from '../components/ProgressContext';


const WordsIKnow = ({ navigation }) => {

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const aspectRatio = screenWidth / screenHeight;
  const soundRef = useRef(null);
  let wordsIKnowList = [];

  const { flyingHighStatus, springtimeFunStatus, sunnyIslandStatus, alienAdventureStatus, outerSpaceStatus,
    planetsAndBeyondStatus, divingDeepStatus, isLoading } = useProgress();

    const allStatuses = [flyingHighStatus, springtimeFunStatus, sunnyIslandStatus, alienAdventureStatus, outerSpaceStatus, planetsAndBeyondStatus, divingDeepStatus];

    for (let i = 0; i < allStatuses.length; i++) {
        const status = allStatuses[i];
        const keys = Object.keys(status);
        for (let j = 0; j < keys.length; j++) {
            const word = status[keys[j]];
            if (word && word.test_correct) {
                wordsIKnowList.push(keys[j]);
            }
        }
    }

    wordsIKnowList.sort();

    // Unload any currently playing sound then play the new word
    const playWord = async (word) => {
        try {
            // Stop and unload previous sound
            if (soundRef.current) {
                await soundRef.current.stopAsync().catch(() => {});
                await soundRef.current.unloadAsync().catch(() => {});
                soundRef.current = null;
            }

            const audioFile = wordAudioMapping[word];
            if (!audioFile) return;

            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                allowsRecordingIOS: false,
                shouldDuckAndroid: true,
            });

            const { sound } = await Audio.Sound.createAsync(audioFile, { shouldPlay: true });
            soundRef.current = sound;

            // Auto-unload when finished so memory isn't held
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync().catch(() => {});
                    soundRef.current = null;
                }
            });
        } catch (e) {
            console.warn('WordsIKnow audio error:', e);
        }
    };

    // Clean up sound when leaving the screen
    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.stopAsync().catch(() => {});
                soundRef.current.unloadAsync().catch(() => {});
            }
        };
    }, []);

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          flexDirection: 'row',
      },
      flashcardContainer: {
          flex: 10,
          backgroundColor: '#F0F0F0',
          borderColor: 'black',
          borderWidth: 2,
      },
      flashcard: {
          padding: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#CCCCCC',
      },
      flashcardImage: {
          width: '100%',
          height: aspectRatio > 1.7 ? 150 : 300,
          resizeMode: 'contain',
      },
      headerStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          paddingVertical: 10,
          backgroundColor: '#E0E0E0',
          width: '100%',
          textAlign: 'center',
      },
    });

  const renderFlashcards = () => {
    let lastInitial = null;

    return wordsIKnowList.map((word, index) => {
        const currentInitial = word[0].toUpperCase();
        let header = null;

        if (currentInitial !== lastInitial) {
            header = (
                <Text key={`header-${currentInitial}`} style={styles.headerStyle}>
                    {currentInitial}
                </Text>
            );
            lastInitial = currentInitial;
        }

        return (
            <React.Fragment key={index}>
                {header}
                <TouchableOpacity style={styles.flashcard} onPress={() => playWord(word)} activeOpacity={0.7}>
                    <Image source={flashcardMapping[word].flashcard} style={styles.flashcardImage} />
                </TouchableOpacity>
            </React.Fragment>
        );
    });
  };

  return (
    <View style={styles.container}>
        <View style={styles.flashcardContainer}>
            <ScrollView>
                {renderFlashcards()}
            </ScrollView>
        </View>
    </View>
  );
};

export default WordsIKnow;
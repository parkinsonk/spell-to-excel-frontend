import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as ScreenOrientation from 'expo-screen-orientation';
import flashcardMapping from '../utils/flashcardMapping';
import { useProgress } from '../components/ProgressContext';


const WordsIKnow = ({ navigation }) => {

  // Sample flashcard data
  const flashcards = [
    { word: 'Apple', definition: 'A fruit' },
    { word: 'Banana', definition: 'Another fruit' },
    // Add more flashcard data as needed
  ];

  let wordsIKnowList = [];

  const { flyingHighStatus, springtimeFunStatus, sunnyIslandStatus, alienAdventureStatus, outerSpaceStatus,
    planetsAndBeyondStatus, divingDeepStatus, isLoading } = useProgress();

    // Add words from each batch that the student knows to the wordsIKnowList

    // Create an array of all the status objects
    const allStatuses = [flyingHighStatus, springtimeFunStatus, sunnyIslandStatus, alienAdventureStatus, outerSpaceStatus, planetsAndBeyondStatus, divingDeepStatus];

    
    // Iterate over each status object in the array
    // Iterate over each status object in the array
    for (let i = 0; i < allStatuses.length; i++) {
        const status = allStatuses[i];
        console.log('Status:', status);
        const keys = Object.keys(status); // Get all keys (property names) of the status object
        for (let j = 0; j < keys.length; j++) {
            const word = status[keys[j]]; // Use the key to access the correct property value
            if (word && word.test_correct) { // Added a check to ensure word is defined
                wordsIKnowList.push(keys[j]);
            }
        }
    }

    
  // Function to render flashcards
  const renderFlashcards = () => {
    console.log('Rendering flashcards for:', wordsIKnowList);
    return wordsIKnowList.map((word, index) => (
        console.log('Word:', word),
      <View key={index} style={styles.flashcard}>
        <Image source={flashcardMapping[word].flashcard} />
      </View>
    ));
  };

  // Function to render alphabetical list
  const renderAlphabeticalList = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.split('').map((letter, index) => (
      <TouchableOpacity key={index} style={styles.alphabetButton}>
        <Text style={styles.alphabetButtonText}>{letter}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>

        <View style={styles.flashcardContainer}>
            <ScrollView>
                {renderFlashcards()}
            </ScrollView>
        </View>

        <View style={styles.alphabetContainer}>
            <ScrollView>
                {renderAlphabeticalList()}
            </ScrollView>
        </View>

    </View>
  );
};

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
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
    flashcardText: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    alphabetContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderColor: 'black',
      borderWidth: 2,
    },
    alphabetButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 5,
      borderRadius: 5,
      backgroundColor: '#E0E0E0',
    },
    alphabetButtonText: {
      fontSize: 16,
    },
  });

export default WordsIKnow;
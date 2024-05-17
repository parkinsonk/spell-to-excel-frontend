import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as ScreenOrientation from 'expo-screen-orientation';
import flashcardMapping from '../utils/flashcardMapping';
import { useProgress } from '../components/ProgressContext';


const WordsIKnow = ({ navigation }) => {

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const aspectRatio = screenWidth / screenHeight;
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
        const keys = Object.keys(status); // Get all keys (property names) of the status object
        for (let j = 0; j < keys.length; j++) {
            const word = status[keys[j]]; // Use the key to access the correct property value
            if (word && word.test_correct) { // Added a check to ensure word is defined
                wordsIKnowList.push(keys[j]);
            }
        }
    }

    wordsIKnowList.sort(); // Sort the list of words alphabetically

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
          textAlign: 'center',  // Center the header text
      },
    });
    
  // Function to render flashcards
  const renderFlashcards = () => {
    let lastInitial = null;

    return wordsIKnowList.map((word, index) => {
        const currentInitial = word[0].toUpperCase(); // Get the first letter of the current word
        let header = null;

        // Check if this is a new group by comparing the current initial with the last initial
        if (currentInitial !== lastInitial) {
            header = (
                <Text key={`header-${currentInitial}`} style={styles.headerStyle}>
                    {currentInitial}
                </Text>
            );
            lastInitial = currentInitial; // Update lastInitial to the current one
        }

        return (
            <React.Fragment key={index}>
                {header}
                <View style={styles.flashcard}>
                    <Image source={flashcardMapping[word].flashcard} style={styles.flashcardImage} />
                </View>
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
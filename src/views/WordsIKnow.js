import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as ScreenOrientation from 'expo-screen-orientation';


const WordsIKnow = ({ navigation }) => {

  // Sample flashcard data
  const flashcards = [
    { word: 'Apple', definition: 'A fruit' },
    { word: 'Banana', definition: 'Another fruit' },
    // Add more flashcard data as needed
  ];

  // Function to render flashcards
  const renderFlashcards = () => {
    return flashcards.map((flashcard, index) => (
      <View key={index} style={styles.flashcard}>
        <Text style={styles.flashcardText}>{flashcard.word}</Text>
        <Text>{flashcard.definition}</Text>
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
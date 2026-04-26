import React from 'react';
import { Pressable, Image } from 'react-native';

// Render a word pressable. Accepts the navigation object and a precomputed imageSource.
// playWord is optional — pass it to play audio when the word is tapped.
export function renderWordPressable(previousWord, currentWord, batch, status, navigation, styles, imageSource, playWord, email) {
  return (
    <Pressable
      key={currentWord}
      onPress={() => {
        if (status[previousWord]?.test_correct === true) {
          playWord?.(currentWord);
          navigation.navigate('Activities', { selectedWord: currentWord, batch, email: email });
        }
      }}
      style={({ pressed }) => [
        styles[currentWord + "Opacity"],
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <Image
        source={imageSource}
        style={{
          height: '100%',
          width: '100%',
          resizeMode: 'contain',
          opacity: status[previousWord]?.test_correct ? 1 : 0.5,
        }}
      />
    </Pressable>
  );
}
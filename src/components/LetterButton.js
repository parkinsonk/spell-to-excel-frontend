import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const LetterButton = ({ letter, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.circle,
        style, // Allow custom style from props
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  letter: {
    fontSize: 45,
    fontFamily: 'Futura',
  },
});

export default LetterButton;
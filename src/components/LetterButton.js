import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const LetterButton = ({ letter, onPress, style, textStyle }) => {
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
      <Text style={[styles.letter, textStyle]}>{letter}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default LetterButton;
import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DrawableBox = ({ boxStyle }) => {
  const [paths, setPaths] = useState([]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Initialize a new path; M stands for 'move to'
        const newPath = `M ${gestureState.x0} ${gestureState.y0}`;
        setPaths([...paths, newPath]);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Ensure there is a current path to append to; otherwise, start a new path
        const currentPath = paths[paths.length - 1];
        if (!currentPath) {
          // If there's no current path, initialize it to start at the current position
          const initialPath = `M ${gestureState.moveX} ${gestureState.moveY}`;
          setPaths([...paths, initialPath]);
          return;
        }
      
        const newPath = `${currentPath} L ${gestureState.moveX} ${gestureState.moveY}`;
        // Update the last path with the new point
        setPaths([...paths.slice(0, -1), newPath]);
      },
      onPanResponderRelease: () => {
        // Handle the end of the drawing; currently, we don't need to do anything here
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} style={boxStyle}>
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((path, index) => (
          <Path key={index} d={path} stroke="black" strokeWidth={2} fill="none" />
        ))}
      </Svg>
    </View>
  );
};

export default DrawableBox;
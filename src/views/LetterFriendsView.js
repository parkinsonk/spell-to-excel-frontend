import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, Alert, PanResponder, useWindowDimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import traceWordMapping from '../utils/traceWordMapping';
import { useProgress } from '../components/ProgressContext';




const LetterFriendsView = ({ navigation, route }) => {

  const { batch, activity, selectedWord } = route.params;
  const { markActivityCompleted, checkFlyingHigh, isLoading } = useProgress();

  const handleCustomBackAction = async () => {
    // Call your function before navigating back
    Alert.alert("Congrats!", "You've completed the Letter Friends activity.");

    await markActivityCompleted(activity, selectedWord);
    await checkFlyingHigh('Flying High');
    
    // Then navigate back
    
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleCustomBackAction} style={{ marginLeft: 10 }}>
          {/* Custom back button icon */}
          <Image source={require('../assets/back.png')} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Letter Friends Page</Text>
    </View>
  );
}

export default LetterFriendsView;
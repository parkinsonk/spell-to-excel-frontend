import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Alert, useWindowDimensions} from 'react-native';
import { Video } from 'expo-av';
import { useProgress } from '../components/ProgressContext';
import readVideoMapping from '../utils/readVideoMapping';




const ReadView = ({ navigation, route }) => {

  const { batch, activity, selectedWord } = route.params;
  const { markActivityCompleted, checkFlyingHigh, checkSunnyIsland, checkSpringtimeFun, checkAlienAdventure, 
    checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep, isLoading } = useProgress();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = screenWidth / screenHeight;
  const videoRef = useRef(null); // Create a ref for the video
  console.log(batch);

  const readingVideo = readVideoMapping[selectedWord] || readVideoMapping.default;

  const handleCustomBackAction = async () => {
    // Call your function before navigating back
    Alert.alert("Congrats!", "You've completed the Read activity.");

    await markActivityCompleted(activity, selectedWord);
    

    if (batch == 'Flying High') {
      await checkFlyingHigh('Flying High');
  }
  else if (batch == 'Sunny Island') {
    await checkSunnyIsland('Sunny Island');
  }
  else if (batch == 'Springtime Fun') {
    await checkSpringtimeFun('SpringTime Fun');
  }
  else if (batch == 'Alien Adventure') {
    await checkAlienAdventure('Alien Adventures');
  }
  else if (batch == 'Outer Space') {
    await checkOuterSpace('Outer Space');
  }
  else if (batch == 'Planets and Beyond') {
    await checkPlanetsAndBeyond('Planets and Beyond');
  }
  else if (batch == 'Diving Deep') {
    await checkDivingDeep('Diving Deep');
  }
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

    // Use useEffect to start the video automatically on mount
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playAsync();
      }
    }, []); // Empty dependency array to run only once on mount

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    videoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
    },
  });

  return (
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={readingVideo}
          style={styles.video}
          resizeMode="contain"
          useNativeControls
          onError={(error) => {
            console.log("Error loading video:", error);
          }}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              console.log("Video finished");
              videoRef.current.setPositionAsync(0); // Reset video to the start
            }
          }}
        />
      </View>
  );
};

export default ReadView;
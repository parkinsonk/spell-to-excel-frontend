import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';

const ArtistCredits = ({ navigation }) => {
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const aspectRatio = screenWidth / screenHeight;

    const calculateImageDimensions = (aspectRatio, iPhoneValue, iPadMiniValue, iPadValue) => {
        if (aspectRatio > 1.7) {
            return iPhoneValue;
        } else if (aspectRatio > 1.4 && aspectRatio < 1.7) {
            return iPadMiniValue;
        } else {
            return iPadValue;
        }
    };

    const styles = StyleSheet.create({
        background: {
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        image: {
            width: '90%',
            height: '90%',
            },
      });

  return (
    <ImageBackground
  source={require('../assets/artistCreditsView/blueBackground.png')}
  resizeMode="cover"
  style={styles.background}
>

        <Image source={require('../assets/artistCreditsView/artistCreditsContent.png')} style={styles.image} resizeMode='contain' />

</ImageBackground>
  );
};


export default ArtistCredits;
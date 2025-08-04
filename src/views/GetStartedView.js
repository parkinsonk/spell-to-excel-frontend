import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';

const GetStartedView = ({ navigation }) => {
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
        },
        top: {
          flex: 2,
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: screenHeight * 0.02,
        },
        bottom: {
          flex: 1,
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

        },
        image: {
            width: '100%',
            height: '100%',
            },
        getStartedOpacity: {
            width: aspectRatio > 1.5 ? screenWidth * 0.4: screenWidth * 0.2, 
            height: aspectRatio > 1.5 ? screenHeight * 0.2: screenHeight * 0.15,
            justifyContent: 'center',
            alignItems: 'center',
        },
      });

  return (
    <ImageBackground
  source={require('../assets/getStartedView/getStartedBackground.png')}
  resizeMode="cover"
  style={styles.background}
>
    <View style={styles.top}>

        <Image source={require('../assets/getStartedView/getStartedInfo.png')} style={styles.image} resizeMode='contain' />

    </View>

    <View style={styles.bottom}>
        <TouchableOpacity style={styles.getStartedOpacity} onPress={() => navigation.navigate('Create Letter Friends Account')}>
            <Image source={require('../assets/getStartedView/createAccount.png')} style={styles.image} resizeMode='contain'/>
        </TouchableOpacity>
    </View>


</ImageBackground>
  );
};


export default GetStartedView;

import React, { useCallback } from 'react';

import {
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useProgress } from '../components/ProgressContext';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

// ------------------------------------------------
// BATCH COMPLETION HELPER
// ------------------------------------------------

const isBatchCompleted = (status, expectedWordCount) => {
  if (!status || typeof status !== 'object') {
    return false;
  }

  const words = Object.values(status);

  return (
    words.length === expectedWordCount &&
    words.every(
      (wordStatus) => wordStatus?.test_correct === true
    )
  );
};

// ------------------------------------------------
// SELECT WORD BATCHES VIEW
// ------------------------------------------------

const SelectWordBatchesView = ({ navigation, route }) => {
  const email = route.params?.email;

  const {
    height: screenHeight,
    width: screenWidth,
  } = useWindowDimensions();

  const isLandscape = screenWidth > screenHeight;
  const aspectRatio = screenWidth / screenHeight;

  // ------------------------------------------------
  // PROGRESS CONTEXT
  // ------------------------------------------------

  const {
    flyingHighStatus,
    sunnyIslandStatus,
    springtimeFunStatus,
    alienAdventureStatus,
    outerSpaceStatus,
    planetsAndBeyondStatus,
    divingDeepStatus,

    checkFlyingHigh,
    checkSunnyIsland,
    checkSpringtimeFun,
    checkAlienAdventure,
    checkOuterSpace,
    checkPlanetsAndBeyond,
    checkDivingDeep,
  } = useProgress();

  // ------------------------------------------------
  // REFRESH PROGRESS WHEN SCREEN IS OPENED
  // ------------------------------------------------

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const refreshAllBatches = async () => {
        try {
          await Promise.all([
            checkFlyingHigh('Flying High'),
            checkSunnyIsland('Sunny Island'),
            checkSpringtimeFun('SpringTime Fun'),
            checkAlienAdventure('Alien Adventures'),
            checkOuterSpace('Outer Space'),
            checkPlanetsAndBeyond('Planets and Beyond'),
            checkDivingDeep('Diving Deep'),
          ]);
        } catch (error) {
          if (isActive) {
            console.error(
              'Error refreshing batch progress:',
              error
            );
          }
        }
      };

      refreshAllBatches();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // ------------------------------------------------
  // CHECK BATCH COMPLETION
  // ------------------------------------------------

  const flyingHighCompleted = isBatchCompleted(
    flyingHighStatus,
    15
  );

  const sunnyIslandCompleted = isBatchCompleted(
    sunnyIslandStatus,
    16
  );

  const springtimeFunCompleted = isBatchCompleted(
    springtimeFunStatus,
    15
  );

  const alienAdventureCompleted = isBatchCompleted(
    alienAdventureStatus,
    15
  );

  const outerSpaceCompleted = isBatchCompleted(
    outerSpaceStatus,
    15
  );

  const planetsAndBeyondCompleted = isBatchCompleted(
    planetsAndBeyondStatus,
    15
  );

  const divingDeepCompleted = isBatchCompleted(
    divingDeepStatus,
    9
  );

  // ------------------------------------------------
  // LOGOUT
  // ------------------------------------------------

  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  // ------------------------------------------------
  // RESPONSIVE IMAGE DIMENSIONS
  // ------------------------------------------------

  const calculateImageDimensions = (
    aspectRatio,
    iPhoneValue,
    iPadMiniValue,
    iPadValue
  ) => {
    if (aspectRatio > 1.7) {
      return iPhoneValue;
    } else if (
      aspectRatio > 1.4 &&
      aspectRatio < 1.7
    ) {
      return iPadMiniValue;
    } else {
      return iPadValue;
    }
  };

  // ------------------------------------------------
  // STYLES
  // ------------------------------------------------

  const styles = {
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },

    top: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    bottom: {
      flex: 10,
      flexDirection: 'row',
    },

    bottomLeft: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopWidth: 5,
      borderTopColor: 'black',
      borderLeftWidth: 5,
      borderLeftColor: 'black',
      borderBottomWidth: 5,
      borderBottomColor: 'black',
    },

    bottomMiddle: {
      flex: 1,
      flexDirection: 'column',
      borderColor: 'orange',
      justifyContent: 'space-around',
      topBorderWidth: 5,
      topBorderColor: 'black',
      borderTopWidth: 5,
      borderTopColor: 'black',
      borderBottomWidth: 5,
      borderBottomColor: 'black',
    },

    bottomRight: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 5,
      borderTopColor: 'black',
      borderBottomWidth: 5,
      borderBottomColor: 'black',
      borderRightWidth: 5,
      borderRightColor: 'black',
    },

    FlyingHighOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '30%',
            '25%',
            '35%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '20%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '80%',
            '80%',
            '80%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),
    },

    SunnyIslandOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '30%',
            '25%',
            '30%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '20%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '70%',
            '70%',
            '70%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),

      marginLeft: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '35%',
            '25%',
            '25%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '20%'
          ),
    },

    SpringtimeFunOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '35%',
            '30%',
            '30%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '18%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),

      marginRight: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '35%',
            '25%',
            '25%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '20%'
          ),
    },

    AlienAdventuresOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '30%',
            '25%',
            '25%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '20%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '80%',
            '80%',
            '80%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),

      marginTop: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '0%',
            '0%',
            '0%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '25%',
            '25%',
            '25%'
          ),
    },

    OuterSpaceOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '30%',
            '30%',
            '35%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '20%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '80%',
            '80%',
            '80%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),
    },

    PlanetsAndBeyondOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '30%',
            '25%',
            '30%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '20%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '80%',
            '80%',
            '80%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),

      marginBottom: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '0%',
            '0%',
            '0%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '25%',
            '25%',
            '25%'
          ),
    },

    DivingDeepOpacity: {
      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '35%',
            '25%',
            '35%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '20%',
            '20%',
            '20%'
          ),

      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '80%',
            '80%',
            '80%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          ),
    },

    image: {
      height: '100%',
      width: '100%',
    },

    wordsIKnowopacity: {
      width: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '15%',
            '18%',
            '20%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '60%',
            '50%',
            '22%'
          ),

      height: isLandscape
        ? calculateImageDimensions(
            aspectRatio,
            '100%',
            '100%',
            '100%'
          )
        : calculateImageDimensions(
            aspectRatio,
            '65%',
            '60%',
            '70%'
          ),
    },
  };

  // ------------------------------------------------
  // SCREEN
  // ------------------------------------------------

  return (
    <ImageBackground
      source={require('../assets/selectWordBatchesView/batchesBlueBackground.png')}
      resizeMode="cover"
      style={styles.background}
    >

      {/* TOP BUTTONS */}

      <SafeAreaView style={styles.top}>

        <TouchableOpacity
          style={styles.wordsIKnowopacity}
          onPress={() =>
            navigation.navigate('Instructions', {
              email: email,
            })
          }
        >
          <Image
            source={require('../assets/instructionsVideo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wordsIKnowopacity}
          onPress={() =>
            navigation.navigate('Account Settings', {
              email: email,
            })
          }
        >
          <Image
            source={require('../assets/accountSettings.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wordsIKnowopacity}
          onPress={() =>
            navigation.navigate('Words I Know')
          }
        >
          <Image
            source={require('../assets/selectWordBatchesView/wordsIKnow.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wordsIKnowopacity}
          onPress={logout}
        >
          <Image
            source={require('../assets/selectWordBatchesView/logout.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </TouchableOpacity>

      </SafeAreaView>

      {/* BATCHES */}

      <SafeAreaView style={styles.bottom}>

        {/* LEFT COLUMN */}

        <ImageBackground
          source={require('../assets/selectWordBatchesView/skyBackground.png')}
          resizeMode="cover"
          style={styles.bottomLeft}
        >

          {/* FLYING HIGH */}

          <Pressable
            onPress={() =>
              navigation.navigate('Flying High', {
                email: email,
              })
            }
            style={({ pressed }) => [
              styles.FlyingHighOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                flyingHighCompleted
                  ? require('../assets/selectWordBatchesView/flyingHighCompleted.png')
                  : require('../assets/selectWordBatchesView/flyingHigh.png')
              }
              resizeMode="contain"
              style={styles.image}
            />
          </Pressable>

          {/* SUNNY ISLAND */}

          <Pressable
            onPress={() => {
              if (flyingHighCompleted) {
                navigation.navigate('Sunny Island', {
                  email: email,
                });
              }
            }}
            style={({ pressed }) => [
              styles.SunnyIslandOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                sunnyIslandCompleted
                  ? require('../assets/selectWordBatchesView/sunnyIslandCompleted.png')
                  : require('../assets/selectWordBatchesView/sunnyIsland.png')
              }
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
                opacity: flyingHighCompleted ? 1 : 0.5,
              }}
            />
          </Pressable>

          {/* SPRINGTIME FUN */}

          <Pressable
            onPress={() => {
              if (sunnyIslandCompleted) {
                navigation.navigate('SpringTime Fun', {
                  email: email,
                });
              }
            }}
            style={({ pressed }) => [
              styles.SpringtimeFunOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                springtimeFunCompleted
                  ? require('../assets/selectWordBatchesView/springtimeFunCompleted.png')
                  : require('../assets/selectWordBatchesView/springtimeFun.png')
              }
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
                opacity: sunnyIslandCompleted ? 1 : 0.5,
              }}
            />
          </Pressable>

        </ImageBackground>

        {/* MIDDLE COLUMN */}

        <ImageBackground
          source={require('../assets/selectWordBatchesView/spaceBackground.png')}
          resizeMode="cover"
          style={styles.bottomMiddle}
        >

          {/* ALIEN ADVENTURES */}

          <Pressable
            onPress={() => {
              if (springtimeFunCompleted) {
                navigation.navigate('Alien Adventures', {
                  email: email,
                });
              }
            }}
            style={({ pressed }) => [
              styles.AlienAdventuresOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                alienAdventureCompleted
                  ? require('../assets/selectWordBatchesView/alienAdventuresCompleted.png')
                  : require('../assets/selectWordBatchesView/alienAdventures.png')
              }
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
                opacity: springtimeFunCompleted ? 1 : 0.5,
              }}
            />
          </Pressable>

          {/* OUTER SPACE */}

          <Pressable
            onPress={() => {
              if (alienAdventureCompleted) {
                navigation.navigate('Outer Space', {
                  email: email,
                });
              }
            }}
            style={({ pressed }) => [
              styles.OuterSpaceOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                outerSpaceCompleted
                  ? require('../assets/selectWordBatchesView/outerSpaceCompleted.png')
                  : require('../assets/selectWordBatchesView/outerSpace.png')
              }
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
                opacity: alienAdventureCompleted ? 1 : 0.5,
              }}
            />
          </Pressable>

          {/* PLANETS AND BEYOND */}

          <Pressable
            onPress={() => {
              if (outerSpaceCompleted) {
                navigation.navigate(
                  'Planets and Beyond',
                  {
                    email: email,
                  }
                );
              }
            }}
            style={({ pressed }) => [
              styles.PlanetsAndBeyondOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                planetsAndBeyondCompleted
                  ? require('../assets/selectWordBatchesView/planetsAndBeyondCompleted.png')
                  : require('../assets/selectWordBatchesView/planetsAndBeyond.png')
              }
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
                opacity: outerSpaceCompleted ? 1 : 0.5,
              }}
            />
          </Pressable>

        </ImageBackground>

        {/* RIGHT COLUMN */}

        <ImageBackground
          source={require('../assets/selectWordBatchesView/beachBackground.png')}
          resizeMode="cover"
          style={styles.bottomRight}
        >

          {/* DIVING DEEP */}

          <Pressable
            onPress={() => {
              if (planetsAndBeyondCompleted) {
                navigation.navigate('Diving Deep', {
                  email: email,
                });
              }
            }}
            style={({ pressed }) => [
              styles.DivingDeepOpacity,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Image
              source={
                divingDeepCompleted
                  ? require('../assets/selectWordBatchesView/divingDeepCompleted.png')
                  : require('../assets/selectWordBatchesView/divingDeep.png')
              }
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
                opacity: planetsAndBeyondCompleted ? 1 : 0.5,
              }}
            />
          </Pressable>

        </ImageBackground>

      </SafeAreaView>

    </ImageBackground>
  );
};

export default SelectWordBatchesView;

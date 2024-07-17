import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from '../views/LoginView';
import SelectWordBatchesView from '../views/SelectWordBatchesView';
import WelcomeView from '../views/WelcomeView';
import FlyingHighWordsView from '../views/FlyingHighWordsView';
import ActivtiesView from '../views/ActivitiesView';
import TraceView from '../views/TraceView';
import BoxesView from '../views/BoxesView';
import TestView from '../views/TestView';
import LetterFriendsView from '../views/LetterFriendsView';
import ReadView from '../views/ReadView';
import WordsIKnow from '../views/WordsIKnow';
import SunnyIslandWordsView from '../views/SunnyIslandWordsView';
import SpringtimeFundWordsView from '../views/SpringtimeFunWordsView';
import AlienAdventuresWordsView from '../views/AlienAdventuresWordsView';
import OuterSpaceWordsView from '../views/OuterSpaceWordsView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Word Batches" component={SelectWordBatchesView} />
        <Stack.Screen name="Flying High" component={FlyingHighWordsView} />
        <Stack.Screen name="Sunny Island" component={SunnyIslandWordsView} />
        <Stack.Screen name="Springtime Fun" component={SpringtimeFundWordsView} />
        <Stack.Screen name="Alien Adventures" component={AlienAdventuresWordsView} />
        <Stack.Screen name="Outer Space" component={OuterSpaceWordsView} />
        <Stack.Screen name="Activities" component={ActivtiesView} />
        <Stack.Screen name="Trace" component={TraceView} />
        <Stack.Screen name="Boxes" component={BoxesView} />
        <Stack.Screen name="Test" component={TestView} />
        <Stack.Screen name="Letter Friends" component={LetterFriendsView} />
        <Stack.Screen name="Read" component={ReadView} />
        <Stack.Screen name="Words I Know" component={WordsIKnow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
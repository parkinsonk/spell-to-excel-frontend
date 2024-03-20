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

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Word Batches" component={SelectWordBatchesView} />
        <Stack.Screen name="Flying High" component={FlyingHighWordsView} />
        <Stack.Screen name="Activities" component={ActivtiesView} />
        <Stack.Screen name="Trace" component={TraceView} />
        <Stack.Screen name="Boxes" component={BoxesView} />
        <Stack.Screen name="Test" component={TestView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
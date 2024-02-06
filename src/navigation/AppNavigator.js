import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from '../views/LoginView';
import SelectWordBatchesView from '../views/SelectWordBatchesView';
import WelcomeView from '../views/WelcomeView';
import FlyingHighWordsView from '../views/FlyingHighWordsView';
import ActivtiesView from '../views/ActivitiesView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeView} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Word Batches" component={SelectWordBatchesView} />
        <Stack.Screen name="Flying High Words" component={FlyingHighWordsView} />
        <Stack.Screen name="Activites" component={ActivtiesView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
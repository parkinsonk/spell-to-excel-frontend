import React, { useEffect, useState } from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import AppNavigator from './src/navigation/AppNavigator';
import { ProgressProvider } from './src/components/ProgressContext';

const App = () => {

  useKeepAwake();
  
  return(
  <ProgressProvider>
    <AppNavigator/>
  </ProgressProvider>
  );
};

export default App;

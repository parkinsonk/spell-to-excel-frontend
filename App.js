import React, { useEffect, useState } from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { ProgressProvider } from './src/components/ProgressContext';

const App = () => {
  return(
  <ProgressProvider>
    <AppNavigator/>
  </ProgressProvider>
  );
};

export default App;

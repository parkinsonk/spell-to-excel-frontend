import { useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const useWordCompletion = () => {
  const [flyingHighStatus, setFlyingHighStatus] = useState({});

  const checkWordCompletion = async (batch) => {
    try {
      const accessToken = await SecureStore.getItemAsync('access_token');
      
      const response = await axios.get('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/check-word/', {
        params: {
          batch: batch,
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      setWordCompletionStatus(response.data);
    } catch (error) {
      console.error('Error fetching word completion status:', error);
      // Optionally, handle errors, e.g., with a state variable or an error handling hook
    }
  };

  return [wordCompletionStatus, checkWordCompletion];
};
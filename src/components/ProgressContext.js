import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [flyingHighStatus, setFlyingHighStatus] = useState({});
  const [sunnyIslandStatus, setSunnyIslandStatus] = useState({}); 
  const [springtimeFunStatus, setSpringtimeFunStatus] = useState({});
  const [alienAdventureStatus, setAlienAdventureStatus] = useState({});
  const [outerSpaceStatus, setOuterSpaceStatus] = useState({});
  const [planetsAndBeyondStatus, setPlanetsAndBeyondStatus] = useState({});
  const [divingDeepStatus, setDivingDeepStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

// Checking Flying High Words
  const checkFlyingHigh = async (batch) => {
    setIsLoading(true); // Start loading
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

      setFlyingHighStatus(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching word completion status:', error);
      // Handle errors appropriately
    } finally {
      setIsLoading(false); // End loading
    }
  };

// Checking Sunny Island Words
const checkSunnyIsland = async (batch) => {
    setIsLoading(true); // Start loading
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
    
        setSunnyIslandStatus(response.data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching word completion status:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    };

// Checking Springtime Fun Words
const checkSpringtimeFun = async (batch) => {
    setIsLoading(true); // Start loading
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
    
        setSpringtimeFunStatus(response.data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching word completion status:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    };

// Checking Alien Adventure Words
const checkAlienAdventure = async (batch) => {
    setIsLoading(true); // Start loading
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
    
        setAlienAdventureStatus(response.data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching word completion status:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    }

// Checking Outer Space Words
const checkOuterSpace = async (batch) => {
    setIsLoading(true); // Start loading
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
    
        setOuterSpaceStatus(response.data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching word completion status:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    }

// Checking Planets & Beyond Words
const checkPlanetsAndBeyond = async (batch) => {
    setIsLoading(true); // Start loading
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
    
        setPlanetsAndBeyondStatus(response.data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching word completion status:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    }

// Checking Diving Deep Words
const checkDivingDeep = async (batch) => {
    setIsLoading(true); // Start loading
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
    
        setDivingDeepStatus(response.data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching word completion status:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    }

const markActivityCompleted = async (activity, word) => {
    setIsLoading(true); // Start loading
    try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        
        const response = await axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/mark-activity-completed/', {
            activity: activity,
            word: word,
        },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error marking activity as complete:', error);
        // Handle errors appropriately
    } finally {
        setIsLoading(false); // End loading
    }
    }


  return (
    <ProgressContext.Provider value={{ flyingHighStatus, springtimeFunStatus, sunnyIslandStatus, alienAdventureStatus, outerSpaceStatus,
                                     planetsAndBeyondStatus, divingDeepStatus, isLoading, checkFlyingHigh, checkSpringtimeFun, checkSunnyIsland,
                                     checkAlienAdventure, checkOuterSpace, checkPlanetsAndBeyond, checkDivingDeep, markActivityCompleted }}>
        {children}
    </ProgressContext.Provider>
  );
};
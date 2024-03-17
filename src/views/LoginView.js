import React, { useState } from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from expo-secure-store
import { useProgress } from '../components/ProgressContext';


/* Start of Login Logic. Sends a message over to the backend to authenticate student */
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [studentName, setStudentName] = useState('');
    const [pin, setPin] = useState('');
    const { checkFlyingHigh } = useProgress();

    const handleLogin = () => {
        // Logic to handle login
    axios.post('https://spell-to-excel-7bacf3b9891e.herokuapp.com/api/student-login/', {
        email: email,
        student_name: studentName, 
        pin: pin 
    })
    .then(async response => {
        // Handle success
        console.log(response.data);
        const { refresh, access } = response.data;
        // You can store these tokens in AsyncStorage or your state management solution
        // Navigate to next screen or show success message

        await SecureStore.setItemAsync('access_token', access);
        await SecureStore.setItemAsync('refresh_token', refresh);
        await checkFlyingHigh('Flying High');
        
        navigation.navigate('Word Batches');

    })
    .catch(error => {
        // Handle error
        console.log(error);
        
        // Show error message
        Alert.alert("Login failed", "Invalid credentials")
    });
        
    };
    /* End of Login Logic. */

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Teacher or Parent Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student Name"
                    value={studentName}
                    onChangeText={setStudentName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Pin"
                    value={pin}
                    secureTextEntry
                    onChangeText={setPin}
                />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1, // Fill the entire screen
        width: '100%',
        height: '100%',

    },
    container: {
        position: 'absolute', // Position the container independently
        left: '5%', 
        right: '5%',
        bottom: 100, 
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignSelf: 'center', // Center the container
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});

export default LoginScreen;
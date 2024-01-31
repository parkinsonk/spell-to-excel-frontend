import React, { useState } from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const SelectWordBatchesView = ({ navigation }) => {
    const [associatedEmail, setAssociatedEmail] = useState('');
    const [studentName, setStudentName] = useState('');
    const [pin, setPin] = useState('');

    return (
        
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Teacher or Parent Email"
                    value={associatedEmail}
                    onChangeText={setAssociatedEmail}
                />
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

export default SelectWordBatchesView;
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
                <ImageBackground 
                    source={require('../assets/SelectWordBatchesView/BatchesBackground.png')} 
                    resizeMode="cover"
                    style={styles.background}
                >
                </ImageBackground>
        </View>
     
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    background: {
    flex: 1, // Take up all available space
    width: '100%', // Ensure full width
    height: '100%', // Ensure full height
}
});

export default SelectWordBatchesView;
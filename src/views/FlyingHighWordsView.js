import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FlyingHighWordsView = ({ navigation }) => {
    return (
        
            <ImageBackground
                source={require('../assets/FlyingHighWordsView/FlyingHighBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <TouchableOpacity style={styles.theOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/FlyingHighWordsView/the.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toOpacity} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/FlyingHighWordsView/to.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.PlaneSun} onPress={() => console.log('button pressed')}>
                        <Image source={require('../assets/FlyingHighWordsView/PlaneSun.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                </View>

                <View style={styles.bottom}>
                
                </View>
            
                
            </ImageBackground>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    top: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        borderColor: 'green',
        borderWidth: 2,
    },
    middle: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        borderColor: 'blue',
        borderWidth: 2,
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 2,
    },
    theOpacity: {
        height: '55%',
        width: '20%',
        resizeMode: 'contain',
        borderColor: 'yellow',
        borderWidth: 2,
        marginTop: '6%',
        marginLeft: '15%',
    },
    toOpacity: {
        height: '70%',
        width: '20%',
        resizeMode: 'contain',
        borderColor: 'yellow',
        borderWidth: 2,
        marginLeft: '10%',
        marginTop: '1%'
    },
    PlaneSun: {
        height: '90%',
        width: '30%',
        resizeMode: 'contain',
        borderColor: 'yellow',
        borderWidth: 2,
        marginLeft: '4%',
        marginTop: '1%',
    },
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default FlyingHighWordsView;
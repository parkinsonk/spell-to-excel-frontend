import React, { useState, useEffect} from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Alert, Dimensions, TouchableOpacity, Image} from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const FlyingHighWordsView = ({ navigation }) => {
    return (
        
            <ImageBackground
                source={require('../assets/flyingHighWordsView/flyingHighBackground.png')}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={styles.top}>

                    <TouchableOpacity style={styles.theOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'the', batch: 'FlyingHigh' })}>
                        <Image source={require('../assets/flyingHighWordsView/the.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'to' })}>
                        <Image source={require('../assets/flyingHighWordsView/to.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <View style={styles.PlaneSun}>
                        <Image source={require('../assets/flyingHighWordsView/planeSun.png')} style={styles.Image} />
                    </View>

                    <TouchableOpacity style={styles.ofOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'of' })}>
                        <Image source={require('../assets/flyingHighWordsView/of.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.isOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'is' })}>
                        <Image source={require('../assets/flyingHighWordsView/is.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'in' })}>
                        <Image source={require('../assets/flyingHighWordsView/in.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.youOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'you' })}>
                        <Image source={require('../assets/flyingHighWordsView/you.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.andOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'and' })}>
                        <Image source={require('../assets/flyingHighWordsView/and.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thatOpacity} onPress={() => navigation.navigate('v', { selectedWord: 'that' })}>
                        <Image source={require('../assets/flyingHighWordsView/that.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>

                <TouchableOpacity style={styles.itOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'it' })}>
                        <Image source={require('../assets/flyingHighWordsView/it.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'he' })}>
                        <Image source={require('../assets/flyingHighWordsView/he.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wasOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'was' })}>
                        <Image source={require('../assets/flyingHighWordsView/was.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.aOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'a' })}>
                        <Image source={require('../assets/flyingHighWordsView/a.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.forOpacity} onPress={() => navigation.navigate('Activities', { selectedWord: 'for' })}>
                        <Image source={require('../assets/flyingHighWordsView/for.png')} style={styles.Image} />
                </TouchableOpacity>
                
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
    },
    middle: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    bottom: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    theOpacity: {
        height: '55%',
        width: '15%',
        resizeMode: 'contain',
        marginTop: '6%',
        marginLeft: '15%',
    },
    toOpacity: {
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '8%',
        marginTop: '1%'
    },
    PlaneSun: {
        height: '90%',
        width: '30%',
        resizeMode: 'contain',
        marginLeft: '4%',
        marginTop: '1%',
    },
    ofOpacity: {
        height: '50%',
        width: '12%',
        resizeMode: 'contain',
        marginLeft: '1%',
        marginTop: '10%',
    },
    isOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '2%',
        marginTop: '1%',
    },

    youOpacity: {
        height: '70%',
        width: '17%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },

    inOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '5%',
    },
    andOpacity: {
        height: '70%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '4%',
    },
    thatOpacity: { 
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '3%',
        marginTop: '8%',
    },
    itOpacity: {
        height: '50%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },
    heOpacity: {
        height: '40%',
        width: '13%',
        resizeMode: 'contain',
        marginLeft: '10%',
        marginTop: '3%',
    },
    wasOpacity: {
        height: '50%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '1%',
    },
    aOpacity: {
        height: '50%',
        width: '13%',
        resizeMode: 'contain',
        marginLeft: '5%',
        marginTop: '3%',
    },
    forOpacity: {
        height: '60%',
        width: '15%',
        resizeMode: 'contain',
        marginLeft: '3%',
        marginTop: '6%',
    },

    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default FlyingHighWordsView;
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

                    <TouchableOpacity style={styles.theOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/the.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/to.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <View style={styles.PlaneSun}>
                        <Image source={require('../assets/FlyingHighWordsView/PlaneSun.png')} style={styles.Image} />
                    </View>

                    <TouchableOpacity style={styles.ofOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/of.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.middle}>

                    <TouchableOpacity style={styles.isOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/is.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/in.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.youOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/you.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.andOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/and.png')} style={styles.Image} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.thatOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/that.png')} style={styles.Image} />
                    </TouchableOpacity>

                </View>

                <View style={styles.bottom}>

                <TouchableOpacity style={styles.itOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/it.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/he.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wasOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/was.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.aOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/a.png')} style={styles.Image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.forOpacity} onPress={() => navigation.navigate('Activites')}>
                        <Image source={require('../assets/FlyingHighWordsView/for.png')} style={styles.Image} />
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
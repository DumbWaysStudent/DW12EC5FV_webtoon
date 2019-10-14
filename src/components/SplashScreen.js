import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SplashScreen extends Component{

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width
        }
    }

    render(){
            return (
                <View style={{height: this.state.height, width : this.state.width}}>
                    <View style={{flex : 1, justifyContent : "center", alignItems : "center", backgroundColor : '#D0D0D0'}}>
                        <Image source={require('../img/loginLogo.png')} />
                    </View>
                </View>
            )
    }
}

export default SplashScreen;
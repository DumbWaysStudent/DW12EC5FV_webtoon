import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';



class HomeScreen extends Component {
    render() {
        return (
            <View>
            <Text>
                Ini adalah laman HomeScreen
            </Text>
            <TouchableOpacity 
                style={{padding: 10, backgroundColor:'#D0D0D0'}} 
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text>
                Login
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
  }


export default HomeScreen
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';

export default class DetailScreen extends Component {
    render(){
      return (
        <View>
          <Text>
            Ini adalah laman detail
          </Text>
          <TouchableOpacity 
            style={{padding: 10, backgroundColor:'#D0D0D0'}} 
            onPress={() => this.props.navigation.goBack()}>
            <Text>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{padding: 10, backgroundColor:'#D0D0D0'}} 
            onPress={() => this.props.navigation.popToTop()}>
            <Text>
              HomeScreen
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
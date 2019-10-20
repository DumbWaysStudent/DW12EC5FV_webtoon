import React, { Component } from 'react'
import { Image, View, Button, FlatList, TextInput } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default class FatchDataL extends Component{

    constructor(){
        super()

        this.state = {
            token : '',
            userName : '',
            userId : ''
        }
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId')
        })
    }
    
    componentDidMount(){
        this.setItem()
    }

    getDataUser = () => {
        console.log(this.state.userName)
    }

    // componentDidMount(){
    //     try {
    //         //   const id = await AsyncStorage.getItem('userId')
    //           const name = await AsyncStorage.getItem('userToken')
    //           console.log(name)
    //           if(value !== null) {
                
    //           }
    //         } catch(e) {
    //           // error reading value
    //         }
    // }

    render(){
        return(
            <Button onPress={() => this.getDataUser()} title="getToken" />
        )
    }
}
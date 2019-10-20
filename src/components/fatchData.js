import React, { Component } from 'react'
import { Image, View, Button, FlatList, TextInput } from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'



export default class FatchData extends Component {

    constructor(){
        super()
        this.state = {
            banner : [],
            username : '',
            password : ''
        }
    }

    handleLoginBtn = async() => {

        try {
            const loginData = {
                name : this.state.username,
                password : this.state.password
            }
            const user = await axios.post('http://192.168.1.73:5000/api/v1/login' , loginData)
            if(user.data.username != null) {
                await AsyncStorage.setItem('userToken', user.data.token );
                await AsyncStorage.setItem('userName', JSON.stringify(user.data.username))
                await AsyncStorage.setItem('userId', JSON.stringify(user.data.userid))
                this.props.navigation.navigate('FatchDataL')
                } else {
                    alert(user.data.message)
                }
                console.log(user.data)
            }
            catch(error) {
                console.log(error)
            }
        
    }
    handleLogOutBtn = async() => {

        try {

            if(AsyncStorage.getItem('userName') != '') {
                await AsyncStorage.removeItem('userToken')
                await AsyncStorage.removeItem('userName')
                await AsyncStorage.removeItem('userId')
                }

            }
            catch(error) {
                console.log(error)
            }
        
    }

    getDataToken = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken')
          
          if(value !== null) {
            console.log(value)
          }
        } catch(e) {
          // error reading value
        }
      }

    getDataUser = async () => {
        try {
        //   const id = await AsyncStorage.getItem('userId')
          const name = await AsyncStorage.getItem('userName')
          console.log(name)
          if(value !== null) {
            
          }
        } catch(e) {
          // error reading value
        }
      }

    // componentDidMount(){
    //     axios.get('http:/192.168.1.73:5000/api/v1/wehtoons')
    //         .then(res => {
    //             const banner = res.data;
    //             this.setState({ banner });
    //         });
    //     setTimeout(() => {

    //     }, 1000);

    // }

    render(){
        return(
            <View>
                {/* <FlatList
                    data={this.state.banner}
                    renderItem={({item}) => (
                        <View>
                            <Image source={{uri : item.imgurl}} style={{height : 100, width : 100}} />
                        </View>
                    )}
                    /> */}

                <TextInput placeholder="username" value={this.state.username} style={{height : 50, borderColor : 'black', borderWidth : 2}} onChangeText={(t) => this.setState({username : t})} ></TextInput>
                <TextInput placeholder="username" value={this.state.password} style={{height : 50, borderColor : 'black', borderWidth : 2}} onChangeText={(t) => this.setState({password : t})} ></TextInput>

                <Button title="Login" onPress={() => this.handleLoginBtn()}></Button>
                <Button title="Logout" onPress={() => this.handleLogOutBtn()}></Button>
                <Button title="getData" onPress={() => this.getDataToken()}></Button>
                <Button title="getData User" onPress={() => this.getDataUser()}></Button>
            </View>
        )
    }
}
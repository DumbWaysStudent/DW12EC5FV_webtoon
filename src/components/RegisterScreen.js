import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

class Register extends Component{

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            passwordType : 'eye',
            passwordIcon : 'lock',
            passwordPlaceHolder : '',
            emailPlaceHolder : '',
            emailIcon : 'envelope',
            isSecure : true,
            isFormatCorrect : false,
            userEmail : "",
            password : '',
            username : '',
            isLogin : false,
            height,
            width,
        }
    }
        
    passwordIconPress = () => {
        this.state.passwordType == 'eye' ? this.setState({passwordType : 'eye-slash', isSecure : false}) : this.setState({passwordType : 'eye', isSecure : true})
    }

    testRegex = () =>{
        var reTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.emailPlaceHolder)
        return reTest
    }


    handleLoginBtn = async() => {

        try {
            const loginData = {
                email : this.state.emailPlaceHolder,
                password : this.state.passwordPlaceHolder
            }
            const user = await axios.post('http://192.168.1.12:5000/api/v1/login' , loginData)
            if(user.data.username != null) {
                await AsyncStorage.setItem('userToken', user.data.token.toString());
                await AsyncStorage.setItem('userName', user.data.username.toString())
                await AsyncStorage.setItem('userId', user.data.userid.toString())
                this.props.navigation.navigate('profileStack')
                } else {
                    alert(user.data.message)
                }
                console.log(user.data)
            }
            catch(error) {
                console.log(error)
            }
        toString
    }

    render(){
            return (
                <View style={{height: this.state.height, width : this.state.width}}>
                    <View style={{flex : 1}}>
                        <View style={{flex: 2}}>
                            <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                <Image source={require('../img/loginLogo.png')} style={{width: 150, height: 150}}></Image>
                                {/* input Email */}
                                <View style={{flexDirection : 'row', paddingHorizontal : 15, borderWidth : 2, borderColor: '#e0dada', borderStyle: 'solid', width:'90%', marginVertical : 5}}>
                                    <View style={{justifyContent : 'center'}} >
                                        <FontAwesome5 name={this.state.emailIcon} size={24} style={{color: '#e0dada'}} ></FontAwesome5>
                                    </View>
                                    <TextInput placeholder="Email" onChangeText={(text) => this.setState({emailPlaceHolder : text})} style={{fontSize : 24, flex : 1}}></TextInput>
                                </View>

                                {/* Input Passwrod */}
                                <View style={{flexDirection : 'row', alignContent : 'center', paddingHorizontal : 15, borderWidth : 2, borderColor: '#e0dada', borderStyle: 'solid', width:'90%', marginVertical : 5}}>
                                    <View style={{justifyContent : 'center'}} >
                                        <FontAwesome5 name={this.state.passwordIcon} size={24} style={{color: '#e0dada'}}></FontAwesome5>
                                    </View>
                                    <TextInput  style={{flex: 1, fontSize : 24}} secureTextEntry={this.state.isSecure} onChangeText={(text) => this.setState({passwordPlaceHolder : text})} placeholder="Password" value={this.state.placeHolder}></TextInput>
                                    <TouchableOpacity style={{justifyContent : 'center'}} onPress={() => this.passwordIconPress()}>
                                        <FontAwesome5 name={this.state.passwordType} size={24} style={{color: '#e0dada'}} ></FontAwesome5>
                                    </TouchableOpacity>
                                </View>
                                
                                {/* Login Button */}
                                {this.testRegex() == true && this.state.passwordPlaceHolder != '' ?
                                    <TouchableOpacity onPress={() => this.handleLoginBtn()} style={{backgroundColor: '#42f542', padding:15, width:'90%', alignItems : 'center', marginHorizontal : 15}}>
                                        <Text style={{fontSize : 24}}>Login</Text> 
                                    </TouchableOpacity>
                                    : 
                                    <View style={{backgroundColor: '#cdd1cd', padding:15, width:'90%', alignItems : 'center', marginHorizontal : 15}}>
                                        <Text style={{fontSize : 24}}>Login</Text> 
                                    </View>
                                    }
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            {/* skip Button */}
                            <View style={{flex: 4, flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-end', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('appStack', {isLogin : false, userName : ''})} >
                                <Text style={{fontSize : 22, fontWeight : 'bold', color : '#969696'}}>Skip ></Text>
                            </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', alignItems : 'flex-end',  marginBottom : 35}}>
                                <TouchableOpacity>
                                    <Text>Syarat Penggunaan</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>@NAVER WEHTOON</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>Privasi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
    }
}

export default Login;
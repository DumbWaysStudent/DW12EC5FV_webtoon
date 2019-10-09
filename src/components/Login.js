import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class Login extends Component{

    constructor(){
        super()
        
        this.state = {
            passwordType : 'eye',
            passwordIcon : 'lock',
            passwordPlaceHolder : '',
            emailPlaceHolder : '',
            emailIcon : 'envelope',
            isSecure : true,
            isFormatCorrect : false,
            userEmail : "yuhu@gmail.com",
            userPass : '1'
        }
    }
        
    passwordIconPress = () => {
        this.state.passwordType == 'eye' ? this.setState({passwordType : 'eye-slash', isSecure : false}) : this.setState({passwordType : 'eye', isSecure : true})
    }

    testRegex = () =>{
        var reTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.emailPlaceHolder)
        return reTest
    }


    render(){
            return (
                <View style={{flex : 1}}>
                    <View style={{flex: 2}}>
                        <View style={{alignItems : 'center', justifyContent : 'center'}}>
                            <Image source={require('../img/loginLogo.png')} style={{width: 150, height: 150}}></Image>
                            {/* input Email */}
                            <View style={{flexDirection : 'row', paddingHorizontal : 15, borderWidth : 2, borderColor: '#e0dada', borderStyle: 'solid', width:'90%', marginVertical : 5}}>
                                <View style={{justifyContent : 'center'}} >
                                    <FontAwesome5 name={this.state.emailIcon} size={24}></FontAwesome5>
                                </View>
                                <TextInput placeholder="Email" onChangeText={(text) => this.setState({emailPlaceHolder : text})} style={{fontSize : 24, flex : 1}}></TextInput>
                            </View>

                            {/* Input Passwrod */}
                            <View style={{flexDirection : 'row', alignContent : 'center', paddingHorizontal : 15, borderWidth : 2, borderColor: '#e0dada', borderStyle: 'solid', width:'90%', marginVertical : 5}}>
                                <View style={{justifyContent : 'center'}} >
                                    <FontAwesome5 name={this.state.passwordIcon} size={24}></FontAwesome5>
                                </View>
                                <TextInput  style={{flex: 1, fontSize : 24}} secureTextEntry={this.state.isSecure} onChangeText={(text) => this.setState({passwordPlaceHolder : text})} placeholder="Password" value={this.state.placeHolder}></TextInput>
                                <TouchableOpacity style={{justifyContent : 'center'}} onPress={() => this.passwordIconPress()}>
                                    <FontAwesome5 name={this.state.passwordType} size={24} ></FontAwesome5>
                                </TouchableOpacity>
                            </View>
                            
                            {/* Login Button */}
                            {this.testRegex() == true && this.state.passwordPlaceHolder != '' ?
                                <TouchableOpacity onPress={() => this.props.nav('Details')} style={{backgroundColor: '#42f542', padding:15, width:'90%', alignItems : 'center', marginHorizontal : 15}}>
                                    <Text style={{fontSize : 24}}>Login</Text> 
                                </TouchableOpacity>
                                : 
                                <View style={{backgroundColor: '#cdd1cd', padding:15, width:'90%', alignItems : 'center', marginHorizontal : 15}}>
                                    <Text style={{fontSize : 24}}>Login</Text> 
                                </View>
                                }
                        </View>
                    </View>
                    <View style={{flex: 1,}}>
                        {/* skip Button */}
                        <TouchableOpacity onPress={() => this.props.nav('Details')} style={{flex: 4, flexDirection : 'row', justifyContent : 'center', alignItems : 'flex-end'}}>
                            <Text style={{fontSize : 22, fontWeight : 'bold', color : '#969696'}}>Skip ></Text>
                        </TouchableOpacity>
                        <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', alignItems : 'flex-end',  marginBottom : 5}}>
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
            )
    }
}

export default Login;
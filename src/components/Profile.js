import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default class Profile extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            token : '',
            userId : '',
            userName : '',
            imgurl : '',
        }
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId')
        })

        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/" + this.state.userId)
        this.setState({
            imgurl : profilePic.data.imgurl
        })
        await console.log("test: " + profilePic.data.imgurl)
    }
    

    getPic = async () => {
        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/" + this.state.userId)
        this.setState({
            imgurl : profilePic.data.imgurl,
            countMount : 10
        })
        await console.log("test: " + profilePic.data.imgurl)
    }

    componentDidMount(){
        this.setItem()
    }

    handleLogOutBtn = async() => {

        try {

            if(AsyncStorage.getItem('userName') != '') {
                await AsyncStorage.removeItem('userToken')
                await AsyncStorage.removeItem('userName')
                // await AsyncStorage.removeItem('userId')
                }
            }
            catch(error) {
                console.log(error)
            }
        this.props.navigation.navigate('authStack')
    }

    render(){
      return (
        <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View style={{flex: 1, marginBottom : 24, borderWidth : 2, borderColor : '#D0D0D0', height : 60 }}>
                        <View style={{flexDirection : "row", alignItems : "center", justifyContent : 'space-between', marginHorizontal : 20 }}  >
                            <Text style={{fontSize : 24}}>Profile</Text>
                            {
                                this.state.token != undefined ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('profileEditStack')}>
                                    <FontAwesome5 name="pen" size={24} style={{color : '#D0D0D0', marginHorizontal : 10}} />
                                </TouchableOpacity> :
                                null
                            }
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <View style={{ marginVertical : 15, alignItems : 'center'}}>
                            <View style={{width: 150, height: 150,borderRadius: 150 / 2, overflow: "hidden", borderWidth: 3, }}>
                            <Image source={{uri : this.state.imgurl}} style={{height : 150, width : 150}} resizeMode='cover' />
                            </View>
                            <View style={{ alignItems : "center", marginVertical : 5}}>
                                {   
                                    this.state.isLogin == true && this.props.navigation.getParam('isEdited') == true ?
                                    <Text style={{fontSize: 25}}> { this.props.navigation.getParam('userNameEdited') } </Text> :
                                    <Text style={{fontSize: 25}}> {this.state.userName} </Text>
                                }
                            </View>
                        </View>
                        <View>
                            {this.state.token != undefined ?
                            <View>
                            <TouchableOpacity style={{backgroundColor:'#e0dcdc', padding : 10, marginVertical : 5, marginHorizontal : 5}} onPress={() => this.props.navigation.navigate('CreationScreen')}>
                                <Text style={{fontSize : 24, fontWeight : '600'}}>My WeHToon Creation</Text>
                            </TouchableOpacity>
                            {/* Login */}
                            <TouchableOpacity style={{backgroundColor:'#e0dcdc', padding : 10, marginVertical : 5,  marginHorizontal : 5}} onPress={() => this.handleLogOutBtn()}>
                                <Text style={{fontSize : 24, fontWeight : '600'}}>Log Out</Text>
                            </TouchableOpacity>
                            </View> :
                            <View>
                            <TouchableOpacity style={{backgroundColor:'#e0dcdc', padding : 10, marginVertical : 5,  marginHorizontal : 5}} onPress={() => this.props.navigation.navigate('authStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList')})}>
                                <Text style={{fontSize : 24, fontWeight : '600'}}>Login</Text>
                            </TouchableOpacity>
                            </View>
                        }
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 31}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList'), isLogin : this.state.isLogin, userName : this.state.userName, userNameEdited : this.props.navigation.getParam('userNameEdited'), isEdited : this.props.navigation.getParam('isEdited'), url : this.state.url})}>
                            <FontAwesome5 name="heart" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList'), isLogin : this.state.isLogin, userName : this.state.userName, userNameEdited : this.state.userNameEdited, isEdited : this.props.navigation.getParam('isEdited'), url : this.state.url})} >
                            <FontAwesome5 name="star" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack')}>
                            <FontAwesome5 name="user" size={22} color='lime' />
                            <Text style={{fontSize : 12, color : 'lime'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      )
    }
  }
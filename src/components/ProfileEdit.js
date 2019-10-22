import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

export default class ProfileEdit extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            imgurl : '',
            token : '',
            userName : '',
            userId : ''
        }
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            // userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId')
        })

        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/" + this.state.userId)
        this.setState({
            imgurl : profilePic.data.imgurl
        })
        await console.log("test: " + profilePic.data.imgurl)
    }

    componentDidMount(){
        this.getProPic()
        this.setItem()
    }

    uploadHandler = () => {
        var options = {
            title: 'Select Image',
            noData : true,
            storageOptions: {
             skipBackup: true,
             path: 'images',
             waitUntilSaved : true,
             cameraRoll :true,
            }
         }

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response)
            if(response.didCancel){
                console.log('User Cancelled image piceker');
            } else if (response.error){
                console.log('Imagepicker Error : ', response.error)
            } else if (response.customButton){
                console.log("User tapped custom button : ", response.customButton)
            } else {
                // console.log('User Selected a file from camera or gallery', response)
                const imgFile = new FormData()
                // data.append('name', 'avatar')
                imgFile.append('fileData', {
                    uri : response.uri,
                    type : response.type,
                    name : response.fileName
                })
                const config = {
                    method : 'POST',
                    header : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'multipart/form-data'
                    }, 
                    data : imgFile
                }
                this.setData(config)
            }
        })
    }

    setData = async (configFile) => {
        const test = await Axios("http://192.168.1.12:5000/upload", configFile)
        const data = await {}
        data['imgurl'] = await "http://192.168.1.12:5000/file/images/" + test.data.name
        this.updateFoto(data)
        this.getProPic()
    }

    updateFoto = async (fileData) => {
        var data = await fileData
        var config = {
            method : 'put',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                // "Authorization": "Bearer " + sessionStorage.getItem('jwt')
            },
            data
        }
        await Axios("http://192.168.1.12:5000/api/v1/update/foto/" + this.state.userId, config)

        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/" + this.state.userId)
        this.setState({
            imgurl : profilePic.data.imgurl
        })
    }

    getProPic = async () => {
        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/"+ this.state.userId)
        this.setState({
            imgurl : profilePic.data.imgurl
        })
        await console.log("test: " + this.state.userId)
    }

    handleTextInput = async () =>{
        if(this.state.userName == ''){
            this.props.navigation.navigate('profileStack')
        } else {
            var data = {name : this.state.userName}
        }
        var config = {
            method : 'put',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                // "Authorization": "Bearer " + sessionStorage.getItem('jwt')
            },
            data
        }
        const user = await Axios("http://192.168.1.12:5000/api/v1/update/name/" + this.state.userId, config)
        console.log(user.data.name)
        await AsyncStorage.setItem('userName', user.data.name.toString())
        console.log(user.data.name.toString())
        await this.props.navigation.navigate('profileStack')
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View style={{flex: 1, marginBottom : 24, borderWidth : 2, borderColor : '#D0D0D0', height : 60}}>
                        <View style={{flexDirection : "row", alignItems : "center", justifyContent : 'space-between', marginHorizontal : 20}}  >
                            <Text style={{fontSize : 24}}>Edit Profile</Text>
                            
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <View style={{ marginVertical : 15, alignItems : 'center'}}>
                            <View >
                                <View style={{width: 150, height: 150,borderRadius: 150 / 2, overflow: "hidden", borderWidth: 3, }}>
                                    <Image source={{uri : this.state.imgurl}} style={{height : 150}} resizeMode='cover' />
                                </View>
                                <TouchableOpacity onPress={() => this.uploadHandler()} style={{alignItems : 'center', position : 'absolute', bottom : 10, borderRadius: 30 / 2, overflow: "hidden", width : 30, height : 30, backgroundColor : 'white', borderWidth : 0.5, borderColor:"black"}}>
                                    <FontAwesome5 name='camera' size={24} ></FontAwesome5>
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems : "center", marginVertical : 15, padding : 5, flexDirection : 'row', borderColor : 'black', borderWidth : 1, borderStyle : 'solid', marginHorizontal : 20}}>
                                <TextInput placeholder="Change Your Name" style={{flex : 1, fontSize : 24}} onChangeText={(text) => {this.setState({userName : text})}}></TextInput>
                                <TouchableOpacity onPress={() => this.handleTextInput()} >
                                    <FontAwesome5 name="check" size={44} style={{color : 'lime', marginHorizontal : 10}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 31}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack')}>
                            <FontAwesome5 name="heart" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack')} >
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
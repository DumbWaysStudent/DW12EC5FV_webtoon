import React, { Component } from 'react';
import { Text, View, TextInput, Image, Dimensions, TouchableOpacity, Button, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'

export default class CreationScreen extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isAddVisible : false,
            isEditVisible : false,
            myWebToon : [],
            imgurl :'',
            token : '',
            userId : '',
            userName : '',
            genre : '',
            title : '',
            data : {}
        }
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
                this.setState({
                    imgurl : response.uri
                })
                this.setData(config)
            }
        })
    }

    setData = async (configFile) => {
        const comic = await Axios("http://192.168.1.12:5000/upload", configFile)
        const fileData = await {}
        fileData['imgurl'] = await "http://192.168.1.12:5000/file/images/" + comic.data.name
        fileData['title'] = await this.state.title
        fileData['genre'] = await this.state.genre
        fileData['createdBy'] = await this.state.userId
        this.setState({
            data : fileData
        })
    }

    addComicHandler = async () => {
        var data = await this.state.data
        var config = {
            method : 'POST',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            },
            data
        }

        await Axios('http://192.168.1.12:5000/api/v1/user/2/wehtoon', config)
        this.props.navigation.navigate('CreationScreen')
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId'),
            // userToken : await "Bearer " + this.state.token
        } )
    }

    titleHandler = text => {
        this.setState({
            title : text
        })
    }

    genreHandler = text => {
        this.setState({
            genre : text
        })
        console.log(this.state.genre)
    }

    addComicBtnHandler = async () => {
        await this.addComicHandler()
    }

    componentDidMount(){
        this.setItem()
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View >
                        <View style={{ borderBottomWidth : 4, borderBottomColor : '#D0D0D0', flexDirection : "row", alignItems : "center", paddingHorizontal: 15, justifyContent : 'space-between'}}  >
                            <TouchableOpacity style={{marginLeft : 20}} onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome5 name='arrow-left' size={24} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 28}}> Create WeHToon </Text>
                            <TouchableOpacity >
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={{marginVertical : 20, height : 50, borderColor : 'black', borderWidth : 1, width : '80%', alignSelf : "center", alignItems : "center", justifyContent : 'center'}}>
                        <TextInput placeholder='Title' style={{width : '100%', height : 70, fontSize : 24}} onChangeText={(text) => this.titleHandler(text)} />
                    </View>
                    <View style={{height : 50, borderColor : 'black', borderWidth : 1, width : '80%', alignSelf : "center", alignItems : "center", justifyContent : 'center'}} >
                        <TextInput placeholder='Genre' style={{width : '100%', height : 70, fontSize : 24}} onChangeText={(text) => this.genreHandler(text)} />
                    </View>
                    <View style={{flex: 1, marginBottom : 80, alignItems : "center"}}>
                        <Image source={{uri : this.state.imgurl}} style={{height : 150, width : 150, marginVertical : 20}} ></Image>
                        <View style={{width : 200}}>
                            <Button title="Add Image" onPress={() => this.uploadHandler()} ></Button>
                        </View>
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 30, width : '80%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.addComicBtnHandler()}>
                    <Text>Add WeHToon + </Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
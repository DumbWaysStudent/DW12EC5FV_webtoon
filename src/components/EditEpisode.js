import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList, Button, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'

export default class EditEpisode extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isEditVisible : false,
            isRemoveVisable : true,
            imageAdd : [],
            token : '',
            userName : '',
            userId : '',
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
                this.setData(config)
            }
        })
    }

    setData = async (configFile) => {
        const page = await Axios("http://192.168.1.12:5000/upload", configFile)
        const data = await {}
        data['imgurl'] = await "http://192.168.1.12:5000/file/images/" + page.data.name
        data['pages'] = await this.state.imageAdd.length + 1
        this.addPageHandler(data)
    }

    addPageHandler = async (fileData) => {
        var data = await fileData
        var config = {
            method : 'POST',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            },
            data
        }
        await Axios("http://192.168.1.12:5000/api/v1/user/2/wehtoon/" + this.props.navigation.getParam('chapterId') + "/episode/" + this.props.navigation.getParam('comicId') + "/image", config)
        this.getMyPages() 
    }

    handleRemove = (index) => {
        this.state.imageAdd.splice(index, 1)
        this.setState({
            imageAdd : this.state.imageAdd
        })
    }

    handleEdit = () => {
        if(this.state.isRemoveVisable == true){
            this.setState({
                isRemoveVisable : false,
                isEditVisible : true
            })
        } else {
            this.setState({
                isRemoveVisable : true,
                isEditVisible : false
            })
        }
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId'),
        } )
    }
    
    getMyPages = async () => {
        await this.setItem()
        const config = {
            method : 'get',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        }
        
        const getPages = await Axios('http://192.168.1.12:5000/api/v1/user/1/wehtoon/' + this.props.navigation.getParam('comicId') + '/episode/' + this.props.navigation.getParam('title') + '/images', config)
        await this.setState({
            imageAdd : getPages.data
        })
    }

    handleRemove = async (title, page) => {
        const config = {
            method : 'DELETE',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        }
        await Axios('http://192.168.1.12:5000/api/v1/user/1/wehtoon/1/episode/' + title + '/image/' + page , config)
        this.getMyPages()
    }

    componentDidMount(){
        this.getMyPages()
    }

    render(){
        return (
            <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                    <View >
                        <View style={{borderBottomWidth : 4, borderBottomColor : '#D0D0D0', flexDirection : "row", alignItems : "center", paddingHorizontal: 15, justifyContent : 'space-between'}}  >
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <FontAwesome5 name='arrow-left' size={24} />
                            </TouchableOpacity>
                            <Text style={{fontSize: 28}}> Edit Episode </Text>
                            <TouchableOpacity >
                                <FontAwesome5 name='check' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontSize : 24, marginTop : 5, marginHorizontal : 10}}>Title</Text>
                    <View style={{height : 50, borderColor : 'black', borderWidth : 1, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center'}}>
                        <TextInput placeholder='Title' style={{width : '100%', height : 70, fontSize : 24}} />
                    </View>
                    <View style={{flex: 1, marginBottom : 80}}>
                        <FlatList 
                            data={this.state.imageAdd}
                            renderItem={({item, index}) =>
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}}>
                                <Image source={{uri : item.imgurl}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
                                <View style={{marginHorizontal : 15}} >
                                    <Text style={{fontSize : 18}}>{item.title}</Text>
                                    <Text style={{color : '#717171'}}>Image {item.pages} </Text>
                                    {
                                        this.state.isRemoveVisable == true ? 
                                        <TouchableOpacity style={{backgroundColor : '#eb302d', padding : 5, borderRadius :5, width : 100}} onPress={() => this.handleRemove(item.titleId, item.pages)} >
                                            <Text>Remove</Text>
                                        </TouchableOpacity> : null
                                    }
                                </View>
                            </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 30, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.uploadHandler()}>
                    <Text>Add Page + </Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
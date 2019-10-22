import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';

export default class FatchDataL extends Component {


    constructor(){
        super()
        this.state = {
            imgurl : 'test'
        }
    }

    componentDidMount(){
        this.getProPic()
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
        await Axios("http://192.168.1.12:5000/api/v1/update/foto/1", config)

        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/1")
        this.setState({
            imgurl : profilePic.data.imgurl
        })
        await console.log("test: " + profilePic.data.imgurl)
    }

    getProPic = async () => {
        const profilePic = await Axios("http://192.168.1.12:5000/api/v1/user/foto/1")
        this.setState({
            imgurl : profilePic.data.imgurl
        })
        await console.log("test: " + profilePic.data.imgurl)
    }

    render(){
        return(
            <View>
                <Image source={{uri : this.state.imgurl}} style={{height : 100, width : 100}} ></Image>
                <Button title="Upload image" onPress={() => this.uploadHandler()}></Button>
            </View>
        )
    }

}
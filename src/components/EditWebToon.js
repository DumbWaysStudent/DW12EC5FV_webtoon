import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'

export default class EditWebToon extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            isEditVisible : false,
            isRemoveVisable : true,
            chapter : [],
            token : '',
            userId : '',
            userName : '',
        }
    }

    handleRemove = async (chapterId) => {
        const comicId = this.props.navigation.getParam('comicId')
        const config = {
            method : 'delete',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        }
        await Axios('http://192.168.1.12:5000/api/v1/user/1/wehtoon/' + comicId + '/episode/' + chapterId, config)
        this.getMyEpisode()
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

    handleComicClick = (chapter, titleId) => {
        this.props.navigation.navigate('EditEpisode', {comicId : this.props.navigation.getParam('comicId'), chapterId : chapter, title : titleId })
    }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userName : await AsyncStorage.getItem('userName'),
            userId : await AsyncStorage.getItem('userId'),
            // userToken : await "Bearer " + this.state.token
        } )
    }
    
    getMyEpisode = async () => {
        await this.setItem()
        await console.log(this.state.userName)
        const config = {
            method : 'get',
            headers: {
                // "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.state.token
            }
        }
        const getChapter = await Axios('http://192.168.1.12:5000/api/v1/user/1/wehtoon/'+ this.props.navigation.getParam('comicId') +'/episode', config)
        await this.setState({
            chapter : getChapter.data
        })
        console.log(getChapter.data)
    }

    addEpisode = () => {
        this.props.navigation.navigate('AddComicScreen', {comicId : this.props.navigation.getParam('comicId')})
    }

    componentDidMount(){
        this.getMyEpisode()
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
                            <Text style={{fontSize: 28}}> Edit WeHToon </Text>
                            <TouchableOpacity >
                                <FontAwesome5 name='check' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontSize : 24, marginTop : 5, marginHorizontal : 10}}>Title</Text>
                    
                    <View style={{flex: 1, marginBottom : 80}}>
                        <FlatList 
                            data={this.state.chapter}
                            renderItem={({item, index}) =>
                            <TouchableOpacity style={{flexDirection : 'row', marginVertical : 10, marginHorizontal : 10, alignItems : 'center', borderWidth : 0.5, borderColor : 'black'}} onPress={() => this.handleComicClick(item.id, item.chapterId)} >
                                <Image source={{uri : item.imgurl}} style={{width : 100, height : 100, borderWidth : 1, borderColor : 'black'}}></Image>
                                <View style={{marginLeft : 25, flexDirection : 'column', justifyContent : 'space-between'}} >
                                    
                                    <Text style={{color : '#717171'}}>{item.titleEpisodes}</Text>
                                    <TouchableOpacity style={{backgroundColor : 'lime', padding : 5, borderRadius :2, width : 100, marginVertical : 2}} onPress={() => this.handleRemove(index)} >
                                            <Text>Edit Chapter</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{backgroundColor : '#eb302d', padding : 5, borderRadius :2, width : 100}} onPress={() => this.handleRemove(item.chapterId)} >
                                            <Text>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                            }
                        />
                    </View>
                </View>

                {/* Tombol Tambah */}
                <TouchableOpacity style={{height : 50, borderColor : 'black', borderWidth : 1, position : 'absolute', bottom : 30, width : '90%', alignSelf : "center", alignItems : "center", justifyContent : 'center', backgroundColor : 'white'}} onPress={() => this.addEpisode()}>
                    <Text>Add Episode + </Text>
                </TouchableOpacity>
            </View>
        )
    }
  }
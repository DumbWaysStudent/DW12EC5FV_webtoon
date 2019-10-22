import React, { Component } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity, FlatList, Image, Button } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage'

export default class Favorite extends Component {

    constructor(){
        super()
        var {height, width} = Dimensions.get('window');
        this.state = {
            height,
            width,
            favorite : [],
            userId : '',
            searchQuery : '',
            }
        }

    async setItem(){
        this.setState({
            token : await AsyncStorage.getItem('userToken'),
            userId : await AsyncStorage.getItem('userId')
        })
    }

    async fatchData(){
        await this.setItem()
        const responData = await axios.get('http://192.168.1.12:5000/api/v1/wehtoons/favorite?userid=' + Number(this.state.userId), { 'headers': { 'Authorization': "Bearer " + this.state.token } })
                                .catch(err => console.log(err))
        this.setState({favorite : responData.data})
    }

    componentDidMount(){
        this.fatchData()
    }

    handleDetailComic(id, comicTitle){
        this.props.navigation.navigate('Details', {comicId : id, title : comicTitle})
        console.log(this.state.userId)
    }

    handleInputSearch(text){
        this.setState({
            searchQuery : text
        })
    }

    handleSearch(){
        this.props.navigation.navigate('Search', {query : this.state.searchQuery})
        this.setState({
            searchQuery : ''
        })
    }

    render(){
      return (
        <View style={{width : this.state.width, height : this.state.height}}>
                <View style={{flex : 1}}>
                <View style={{flex: 1,  marginBottom : 5, justifyContent : "center",}}>
                        <View style={{borderWidth : 2, borderColor : '#2a2b2b', borderRadius : 15, flexDirection : "row", alignItems : "center", height : 40, marginHorizontal : 20, marginTop : 5}}>
                            <View style={{flex : 1, fontSize : 16, marginLeft : 15, height : 40}} >
                                <TextInput onChangeText={(text) => this.handleInputSearch(text)} value={this.state.searchQuery} ></TextInput>
                            </View>
                            <TouchableOpacity onPress={() => this.handleSearch()}>
                                <FontAwesome5 name="search" size={24} style={{color : 'lime', marginRight : 15}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 13}}>
                        <FlatList
                            data={this.state.favorite}
                            renderItem={({ item }) => {
                                return(
                                    <View>
                                        <TouchableOpacity onPress={() => this.handleDetailComic(item.id, item.title)} style={{flexDirection : 'row', borderWidth : 0.5, borderStyle : 'solid', borderColor : '#ebebeb'}} >
                                            <Image source={{ uri : item.imgurl}} style={{width : 100, height : 100, borderRadius : 5}} />
                                            <View style={{justifyContent : 'center', paddingLeft : 15}}>
                                                <Text style={{fontSize : 24, fontWeight : 'bold'}}> {item.title} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    
                                )
                            }}
                        />
                    </View>
                    <View style={{flex: 1, flexDirection : 'row', justifyContent : 'space-around', paddingHorizontal : 10, paddingTop : 5, borderTopColor : '#D0D0D0', borderTopWidth : 1, marginBottom : 30}}>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('appStack', {isLogin : this.props.navigation.dangerouslyGetParent().getParam('isLogin'), userName : this.props.navigation.dangerouslyGetParent().getParam('userName')})}>
                            <FontAwesome5 name="heart" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>For You</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('favStack')}>
                            <FontAwesome5 name="star" size={22} color='lime' />
                            <Text style={{fontSize : 12, color : 'lime'}}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems : 'center'}} onPress={() => this.props.navigation.navigate('profileStack', {favorite : this.props.navigation.dangerouslyGetParent().getParam('favorite'), comicList : this.props.navigation.dangerouslyGetParent().getParam('comicList'), isLogin : this.props.navigation.dangerouslyGetParent().getParam('isLogin'), userName : this.props.navigation.dangerouslyGetParent().getParam('userName'), userNameEdit : this.props.navigation.dangerouslyGetParent().getParam('userNameEdited'), isEdited : this.props.navigation.dangerouslyGetParent().getParam('isEdited'), url : this.props.navigation.dangerouslyGetParent().getParam('url')})}>
                            <FontAwesome5 name="user" size={22} color='#676767' />
                            <Text style={{fontSize : 12, color : '#676767'}}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      )
    }
  }